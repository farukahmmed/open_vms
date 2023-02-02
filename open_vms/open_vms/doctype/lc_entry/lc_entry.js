// Copyright (c) 2023, faruk and contributors
// For license information, please see license.txt

frappe.ui.form.on('LC Entry', {
	// refresh: function(frm) {

	// }

	lc_value:function(frm){
		//frappe.msgprint(__( "value is '{0}'", [frm.doc.lc_value]))
		//frm.toggle_reqd('currency', true)
		//frm.set_df_property('currency','reqd',1)
		//MAKE CURRENCY MANDATORY IF LC VALUE >0
		if (frm.doc.lc_value>0){
			frm.toggle_reqd('currency', true)
		} else{
			frm.toggle_reqd('currency',false)
		}
	}
});
