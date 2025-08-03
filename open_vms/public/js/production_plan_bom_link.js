
frappe.ui.form.on('Production Plan', {
    get_items(frm) {
        if (frm.doc.get_items_from !== 'Sales Order') return;

        if (!frm.doc.sales_orders || frm.doc.sales_orders.length === 0) {
            frappe.msgprint(__("Please select Sales Orders first using 'Get Sales Orders'"));
            return;
        }

        const sales_orders = frm.doc.sales_orders.map(row => row.sales_order);

        frappe.call({
            method: 'open_vms.public.py.production_plan_bom_link.get_items_with_custom_bom',
            args: {
                production_plan: frm.doc.name,
                sales_orders: sales_orders
            },
            callback: function (r) {
                if (!r.message) {
                    frappe.msgprint(__('No BOMs matched the selected Sales Orders.'));
                    return;
                }

                const bom_map = {};

                // Group BOMs by Sales Order + Item Code
                r.message.forEach(item => {
                    const key = `${item.sales_order}__${item.item_code}`;
                    if (!bom_map[key]) {
                        bom_map[key] = [];
                    }
                    if (item.bom_no) {
                        bom_map[key].push(item.bom_no);
                    }
                });

                // Wait until PO Items are loaded
                setTimeout(() => {
                    const po_items = [...frm.doc.po_items]; // Copy to avoid direct mutation

                    po_items.forEach(row => {
                        const key = `${row.sales_order}__${row.item_code}`;
                        const boms = bom_map[key] || [];

                        if (boms.length > 0) {
                            // Set first BOM on current row
                            frappe.model.set_value(row.doctype, row.name, 'bom_no', boms[0]);

                            // Add additional rows for other BOMs
                            for (let i = 1; i < boms.length; i++) {
                                const new_row = frappe.model.add_child(frm.doc, 'Production Plan Item', 'po_items');
                                new_row.item_code = row.item_code;
                                new_row.item_name = row.item_name;
                                new_row.sales_order = row.sales_order;
                                new_row.bom_no = boms[i];
                                new_row.planned_qty = row.planned_qty;
                                new_row.stock_uom = row.stock_uom;
                                new_row.warehouse = row.warehouse;
                                new_row.planned_start_date = row.planned_start_date;
                                // Add any other fields you want copied here
                            }
                        } else {
                            // Clear BOM if none found
                            frappe.model.set_value(row.doctype, row.name, 'bom_no', '');
                        }
                    });

                    frm.refresh_field('po_items');
                }, 800);
            }
        });
    }
});


