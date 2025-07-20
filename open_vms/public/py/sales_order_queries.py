

import frappe

@frappe.whitelist()
def get_sales_orders_with_item(doctype, txt, searchfield, start, page_len, filters):
    item_code = filters.get("item_code")

    return frappe.db.sql("""
        SELECT DISTINCT soi.parent
        FROM `tabSales Order Item` soi
        JOIN `tabSales Order` so ON soi.parent = so.name
        WHERE soi.item_code = %s
        AND so.status NOT IN ('Completed', 'To Bill')
        AND so.docstatus < 2
        ORDER BY so.modified DESC
        LIMIT %s OFFSET %s
    """, (item_code, page_len, start))

