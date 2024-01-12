// Copyright (c) 2023, faruk and contributors
// For license information, please see license.txt

frappe.ui.form.on('Employee Bouns', {
	
	generate_bonus: function(frm) {
		
		try {
			var bonus_id=frm.doc.bonus_id;
			var eff_date=frm.doc.effective_date;
			var eff_days = frm.doc.effective_days;
			var eff_days_end = frm.doc.effective_days_end;
			var percent = frm.doc.percentage;
			var religions=frm.doc.religion;

		frappe.call({
		method: 'open_vms.open_vms.doctype.employee_bouns.employee_bouns.handle_button_click',
		args: {

			bonus_id:bonus_id,
			eff_date:eff_date,
			eff_days: eff_days,
            eff_days_end: eff_days_end,
			percent:percent,
			religions:religions

			},
			callback: function(response) {
			
				}
			});

		//alert('Re: '+religions)

		// Refresh the browser
		setTimeout(function() {
			location.reload();
		  }, 2000);

		  
	} catch (error) {
		// Display error message to the user
		alert('An error occurred: ' + error.message);
	  }
	},

	refresh: function(frm) {
        // Check if the document is being saved or updated
        if (cur_frm.doc.__unsaved) {
            // Hide the button field by setting the hidden property to true
            cur_frm.set_df_property('generate_bonus', 'hidden', true);
        } else {
            // Show the button field by setting the hidden property to false
            cur_frm.set_df_property('generate_bonus', 'hidden', false);
        }
			
    },

	bonus_id:function(frm){
		try{
		var id=frm.doc.bonus_id;
				
		frappe.call({
		method: 'open_vms.open_vms.doctype.employee_bouns.employee_bouns.handle_religion',
		args: {

			id:id
				
			},
			callback: function(response) {
				var data = response.message;
				//Convert Json to text
				var data_text=JSON.stringify(data);
				//Trim bracket from data_text
				//frappe.msgprint("Religion: "+ data_text);
				var trimmed = data_text.substring(3, data_text.length - 3);
				frm.set_value('religion',trimmed);
				//frappe.msgprint("Religion: "+ trimmed);
				}
			});

		} catch (error) {
			// Display error message to the user
			alert('An error occurred: ' + error.message);
		  }
	},

	// test:function(frm){
	// 	try{
	// 	var religions=frm.doc.religion
				
	// 	frappe.call({
	// 	method: 'open_vms.open_vms.doctype.employee_bouns.employee_bouns.handle_test_click',
	// 	args: {

	// 		religions:religions
				
	// 		},
	// 		callback: function(response) {
	// 			var data = response.message;
				
	// 			frappe.msgprint("Data Retrived: "+ data);
	// 			}
	// 		});

	// 	} catch (error) {
	// 		// Display error message to the user
	// 		alert('An error occurred: ' + error.message);
	// 	  }
	// }


});

