import frappe
no_cache = True


@frappe.whitelist()
def get_items_with_custom_bom(production_plan, sales_orders):
    """Return BOMs filtered by custom_sales_order field"""
    if isinstance(sales_orders, str):
        import json
        sales_orders = json.loads(sales_orders)

    matched_boms = []

    for so in sales_orders:
        # Find BOMs where custom_sales_order matches current SO
        boms = frappe.get_all(
            "BOM",
            filters={
                "custom_sales_order": so,
                "is_active": 1,
                "docstatus": 1
            },
            fields=["name", "item", "item_name", "custom_sales_order"]
        )

        for bom in boms:
            matched_boms.append({
                "sales_order": so,
                "bom_no": bom["name"],
                "item_code": bom["item"],
                "item_name": bom["item_name"]
            })
        

    return matched_boms


