
import frappe
import json
from frappe.utils import now_datetime

no_cache = True

@frappe.whitelist()
def get_items_with_custom_bom(production_plan, sales_orders):
    """
    Return list of BOMs matched per Sales Order and Item.
    For multiple BOMs, return each as a separate row.
    If no BOM found, still return a row with bom_no = "".
    """
    if isinstance(sales_orders, str):
        sales_orders = json.loads(sales_orders)

    matched_boms = []

    for so in sales_orders:
        # Get items from Sales Order
        so_items = frappe.get_all(
            "Sales Order Item",
            filters={"parent": so},
            fields=["*"]
        )
        print(so_items, "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
        for item in so_items:
            bom_list = []

            # Step 1: Get all active BOMs for Sales Order + Item
            boms = frappe.get_all(
                "BOM",
                filters={
                    "custom_sales_order": so,
                    "item": item.item_code,
                    "is_active": 1,
                    "docstatus": 1
                },
                fields=["name"],
                order_by="creation desc"
            )

            if boms:
                bom_list = [b["name"] for b in boms]
            else:
                # Step 2: Get cancelled BOM (original)
                original_bom = frappe.db.get_value(
                    "BOM",
                    {
                        "custom_sales_order": so,
                        "item": item.item_code,
                        "docstatus": 2
                    },
                    "name"
                )

                if original_bom:
                    # Step 3: Get all active amended BOMs from that
                    amended_boms = frappe.get_all(
                        "BOM",
                        filters={
                            "amended_from": original_bom,
                            "sales_order": so,
                            "item": item.item_code,
                            "is_active": 1,
                            "docstatus": 1
                        },
                        fields=["name"],
                        order_by="creation desc"
                    )

                    if amended_boms:
                        bom_list = [b["name"] for b in amended_boms]

            # Append one row per BOM
            if bom_list:
                for bom in bom_list:
                    matched_boms.append({
                        "sales_order": so,
                        "item_code": item.item_code,
                        "item_name": item.item_name,
                        "bom_no": bom,
                        "warehouse": item.get("warehouse"),
                        "planned_qty": item.get("qty"),
                        "stock_uom": item.get("uom"),
                        "planned_start_date": now_datetime()
                    })
            else:
                # Even if no BOM found, still return one row with empty bom_no
                matched_boms.append({
                    "sales_order": so,
                    "item_code": item.item_code,
                    "item_name": item.item_name,
                    "bom_no": "",
                    "warehouse": item.get("warehouse"),
                    "planned_qty": item.get("qty"),
                    "stock_uom": item.get("uom"),
                    "planned_start_date": now_datetime()
                })

    print(matched_boms, "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    return matched_boms


# import frappe
# no_cache = True


# @frappe.whitelist()
# def get_items_with_custom_bom(production_plan, sales_orders):
#     """Return BOMs filtered by custom_sales_order field"""
#     if isinstance(sales_orders, str):
#         import json
#         sales_orders = json.loads(sales_orders)

#     matched_boms = []

#     for so in sales_orders:
#         # Find BOMs where custom_sales_order matches current SO
#         boms = frappe.get_all(
#             "BOM",
#             filters={
#                 "custom_sales_order": so,
#                 "is_active": 1,
#                 "docstatus": 1
#             },
#             fields=["name", "item", "item_name", "custom_sales_order"]
#         )

#         for bom in boms:
#             matched_boms.append({
#                 "sales_order": so,
#                 "bom_no": bom["name"],
#                 "item_code": bom["item"],
#                 "item_name": bom["item_name"]
#             })
        

#     return matched_boms


