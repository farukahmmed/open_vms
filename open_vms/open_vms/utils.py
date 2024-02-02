# your_app_name/utils.py
import frappe

@frappe.whitelist()
def custom_item_query(doctype, txt, searchfield, start, page_len, filters):
    
    sales_order = filters.get('sales_order')
    items = frappe.db.sql("""
        SELECT
            name, item_code, delivery_date, qty,rate
        FROM
            `tabSales Order Item`
        WHERE
            parent = %s AND
            item_code LIKE %s
        ORDER BY
            item_code
        LIMIT
            %s, %s
    """, (sales_order, f'%{txt}%', start, page_len))
    
    return items

