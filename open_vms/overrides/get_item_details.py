import frappe
import json
from frappe.utils import flt, add_days, cint
from erpnext.stock.get_item_details import (
	get_basic_details,
	get_party_item_code,
	get_price_list_rate,
	get_item_tax_template,
	get_item_tax_map,
	update_bin_details,
	update_party_blanket_order,
	set_valuation_rate,
	get_pricing_rule_for_item,
	update_stock,
	remove_standard_fields,
)

from erpnext.stock.get_item_details import process_args, process_string_args, validate_item_details, get_default_bom, get_gross_profit

@frappe.whitelist()
def get_item_details(args, doc=None, for_validate=False, overwrite_warehouse=True):
    args = process_args(args)
    for_validate = process_string_args(for_validate)
    overwrite_warehouse = process_string_args(overwrite_warehouse)
    item = frappe.get_cached_doc("Item", args.item_code)
    validate_item_details(args, item)

    if isinstance(doc, str):
        doc = json.loads(doc)

    if doc:
        args["transaction_date"] = doc.get("transaction_date") or doc.get("posting_date")
        if doc.get("doctype") == "Purchase Invoice":
            args["bill_date"] = doc.get("bill_date")

    out = get_basic_details(args, item, overwrite_warehouse)
    get_item_tax_template(args, item, out)

    out["item_tax_rate"] = get_item_tax_map(
        args.company,
        args.get("item_tax_template") if out.get("item_tax_template") is None else out.get("item_tax_template"),
        as_json=True,
    )

    get_party_item_code(args, item, out)

    if args.get("doctype") in ["Sales Order", "Quotation"]:
        set_valuation_rate(out, args)

    update_party_blanket_order(args, out)

    current_customer = args.customer
    if args.get("doctype") in ["Purchase Order", "Purchase Receipt", "Purchase Invoice"]:
        args.customer = None

    out.update(get_price_list_rate(args, item))

    args.customer = current_customer

    if args.customer and cint(args.is_pos):
        out.update(get_pos_profile_item_details(args.company, args, update_data=True))

    if item.is_stock_item:
        update_bin_details(args, out, doc)

    for key, value in out.items():
        if args.get(key) is None:
            args[key] = value

    data = get_pricing_rule_for_item(args, doc=doc, for_validate=for_validate)
    out.update(data)

    if (
        frappe.db.get_single_value("Stock Settings", "auto_create_serial_and_batch_bundle_for_outward")
        and not args.get("serial_and_batch_bundle")
        and (args.get("use_serial_batch_fields") or args.get("doctype") == "POS Invoice")
    ):
        update_stock(args, out, doc)

    if args.transaction_date and item.lead_time_days:
        out.schedule_date = out.lead_time_date = add_days(args.transaction_date, item.lead_time_days)

    if args.get("is_subcontracted"):
        out.bom = args.get("bom") or get_default_bom(args.item_code)

    get_gross_profit(out)
    if args.doctype == "Material Request":
        out.rate = args.rate or out.price_list_rate
        out.amount = flt(args.qty) * flt(out.rate)

    # Custom Additions
    out["custom_current_stock_qty"] = get_total_stock_qty(args.item_code, args.get("warehouse"))
    rate, supplier = get_last_purchase_details(args.item_code)
    out["custom_last_purchase_rate"] = rate
    out["custom_supplier"] = supplier

    out = remove_standard_fields(out)
    return out

# Helper Functions
def get_total_stock_qty(item_code, warehouse=None):
    if not warehouse:
        warehouse = frappe.db.get_single_value("Stock Settings", "default_warehouse")

    # print("Set warehouse--",str(warehouse))
    qty = frappe.db.sql("""
        SELECT SUM(actual_qty)
        FROM `tabBin`
        WHERE item_code = %s AND warehouse = %s
    """, (item_code, warehouse))[0][0]

    return qty or 0

def get_last_purchase_details(item_code):
    result = frappe.db.sql("""
        SELECT
            pr.supplier,
            pri.rate
        FROM `tabPurchase Receipt Item` pri
        JOIN `tabPurchase Receipt` pr ON pri.parent = pr.name
        WHERE pri.item_code = %s AND pr.docstatus = 1
        ORDER BY pr.posting_date DESC
        LIMIT 1
    """, (item_code,), as_dict=True)

    if result:
        return result[0].rate, result[0].supplier

    return 0, ""