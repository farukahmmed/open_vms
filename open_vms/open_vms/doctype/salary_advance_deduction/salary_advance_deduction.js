// Copyright (c) 2023, faruk and contributors
// For license information, please see license.txt

frappe.ui.form.on('Salary Advance Deduction', {
	validate: function(frm) {

		var dDate=new Date(frm.doc.date)
		var dMonth=dDate.getMonth()+1
		var dYear=dDate.getFullYear()
		//frappe.msgprint(__("value is '{0}'", [dDate]))
		//frappe.msgprint(__("value is '{0}'", [dMonth]))
		//frappe.msgprint(__("value is '{0}'", [dYear]))

		var id_field = frm.doc.employee + "-" + dMonth + "-" + dYear// get the value of the id field
		frm.set_value('unique_id', id_field); // set the value of the unique id field
		
	}
});
