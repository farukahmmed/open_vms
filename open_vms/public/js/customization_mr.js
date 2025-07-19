//  MATERIAL REQUEST CHHIELD FORM CUSTOMIZATION
//  programmer: tanvir
//  date: 19-07-2025
//  Instructions: open_vms/public/js/customization_mr.text

frappe.ui.form.on('Material Request Item', {
    item_code: function(frm, cdt, cdn) {
        const row = locals[cdt][cdn];
        if (!row.item_code) return;

        frappe.call({
            method: "open_vms.public.py.customization_mr.get_last_purchase_supplier",
            args: {
                item_code: row.item_code,
                company: frm.doc.company
            },
            callback: function(r) {
                if (r.message) {
                    // Set supplier if available
                    frappe.model.set_value(cdt, cdn, "custom_supplier", r.message.supplier || "");
                    
                    // Set total quantity from all warehouses
                    frappe.model.set_value(cdt, cdn, "custom_current_stock_qty", r.message.total_qty || 0);
                } else {
                    frappe.model.set_value(cdt, cdn, "custom_supplier", "");
                    frappe.model.set_value(cdt, cdn, "custom_current_stock_qty", 0);
                }
            }
        });
    }
});