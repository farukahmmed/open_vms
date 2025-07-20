// programmer: Tanvir
// Date: 20-07-2025

frappe.ui.form.on('BOM', {
	
	setup: function(frm) {
		frm.set_query('custom_sales_order', () => {
			const item_code = frm.doc.item;

			if (!item_code) {
				frappe.msgprint(__('Select the Item First'));
				return {};
			}

			return {
				query: "open_vms.public.py.sales_order_queries.get_sales_orders_with_item",
				filters: {
					item_code: item_code
				}
			};
		});
	},

	// This triggers whenever the 'item' field is changed.
	item: function(frm) {
		
		if (frm.doc.custom_sales_order) {
			frm.set_value('custom_sales_order', ''); 
		}
	}
});