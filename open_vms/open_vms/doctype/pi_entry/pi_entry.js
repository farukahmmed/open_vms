// Copyright (c) 2023, faruk and contributors
// For license information, please see license.txt

frappe.ui.form.on('PI Entry', {
	// refresh: function(frm) {

	// }

	pi_value:function(frm){
		//frappe.msgprint(__( "value is '{0}'", [frm.doc.pi_value]))
		//frm.toggle_reqd('currency', true)
		if (frm.doc.pi_value>0){
			frm.toggle_reqd('currency', true)
		} else{
			frm.toggle_reqd('currency',false)
		}
		
	}
});
