frappe.ui.form.on('Production Plan', {
    get_items: function(frm) {
        if (frm.doc.get_items_from !== 'Sales Order') return;

        if (!frm.doc.sales_orders || frm.doc.sales_orders.length === 0) {
            frappe.msgprint(__("Please select Sales Orders first using 'Get Sales Orders'"));
            return false;
        }

        frappe.call({
            method: 'open_vms.public.py.production_plan_bom_link.get_items_with_custom_bom',
            args: {
                production_plan: frm.doc.name,
                sales_orders: frm.doc.sales_orders.map(row => row.sales_order)
            },
            callback: function(r) {
                if (r.message) {
                    const bom_map = {};
                    r.message.forEach(item => {
                        const key = `${item.sales_order}__${item.item_code}`;
                        bom_map[key] = item.bom_no;
                    });

                    // Delay the update so it runs after all other refreshes
                    setTimeout(() => {
                        frm.doc.po_items.forEach(row => {
                            const key = `${row.sales_order}__${row.item_code}`;
                            const new_bom = bom_map[key];

                            if (new_bom && row.bom_no !== new_bom) {
                                frappe.model.set_value(row.doctype, row.name, 'bom_no', new_bom);
                            }
                        });
                        frm.refresh_field('po_items');
                    }, 100); // 100ms delay
                } else {
                    frappe.msgprint(__('No BOMs matched the selected Sales Orders.'));
                }
            }
        });

        return false;
    }
});
