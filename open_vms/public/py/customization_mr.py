# //  MATERIAL REQUEST CHHIELD FORM CUSTOMIZATION
# //  programmer: tanvir
# //  date: 19-07-2025
# Instructions: open_vms/public/js/customization_mr.text

import frappe

@frappe.whitelist(allow_guest=False)
def get_last_purchase_supplier(item_code, company):
    try:
        # Get last supplier
        supplier_data = frappe.db.sql("""
            SELECT pr.supplier
            FROM `tabPurchase Receipt Item` pri
            INNER JOIN `tabPurchase Receipt` pr ON pr.name = pri.parent
            WHERE pri.item_code = %s AND pr.company = %s AND pr.docstatus = 1
            ORDER BY pr.posting_date DESC, pr.creation DESC
            LIMIT 1
        """, (item_code, company), as_dict=True)

        # Get total quantity across all warehouses
        total_qty = frappe.db.sql("""
            SELECT SUM(actual_qty) as total_qty
            FROM `tabBin`
            WHERE item_code = %s
        """, (item_code,), as_dict=True)

        response = {
            "supplier": supplier_data[0].supplier if supplier_data else None,
            "total_qty": total_qty[0].total_qty if total_qty and total_qty[0].total_qty else 0
        }

        frappe.response["message"] = response

    except Exception as e:
        frappe.log_error(f"Error getting item data for {item_code}: {str(e)}", "get_last_purchase_supplier")
        frappe.response["message"] = {
            "supplier": None,
            "total_qty": 0
        }
