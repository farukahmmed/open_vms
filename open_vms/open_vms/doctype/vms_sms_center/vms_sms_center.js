// Copyright (c) 2022, faruk and contributors
// For license information, please see license.txt

// frappe.ui.form.on('vms_SMS_Center', {
// 	refresh: function(frm) {
// 		var value=frappe.db.get_value(”Driver", “Driver-2”, “cellphone_number”)
	
// 	 frappe.msgprint("value")
// 	}
// });

extend_cscript(cur_frm.cscript, {
	message: function () {
		var total_characters = this.frm.doc.message.length;
		var total_msg = 1;

		if (total_characters > 160) {
			total_msg = cint(total_characters / 160);
			total_msg = (total_characters % 160 == 0 ? total_msg : total_msg + 1);
		}

		this.frm.set_value("total_characters", total_characters);
		this.frm.set_value("total_messages", this.frm.doc.message ? total_msg : 0);
	},

	after_save: function(){
		
			var total_characters = this.frm.doc.message.length;
			var total_msg = 1;
	
			if (total_characters > 160) {
				total_msg = cint(total_characters / 160);
				total_msg = (total_characters % 160 == 0 ? total_msg : total_msg + 1);
			}
	
			this.frm.set_value("total_characters", total_characters);
			this.frm.set_value("total_messages", this.frm.doc.message ? total_msg : 0);
		
	}
});