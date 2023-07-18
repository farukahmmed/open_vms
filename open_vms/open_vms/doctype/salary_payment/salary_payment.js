// Copyright (c) 2023, faruk and contributors
// For license information, please see license.txt

frappe.ui.form.on('Salary Payment', {
	 refresh: function(frm) {

		 // Check if the document is being saved or updated
		 if (cur_frm.doc.__unsaved) {
            // Hide the button field by setting the hidden property to true
            cur_frm.set_df_property('generate_salary', 'hidden', true);
        } else {
            // Show the button field by setting the hidden property to false
            cur_frm.set_df_property('generate_salary', 'hidden', false);
        }
	 },

	generate_salary: function(frm) {
		try {
			var start_date=frm.doc.start_date;
			var end_date=frm.doc.end_date;
			var month_id=frm.doc.month_id;
			
		frappe.call({
		method: 'open_vms.open_vms.doctype.salary_payment.salary_payment.handle_button_click',
		args: {

			month_id:month_id,
			start_date:start_date,
			end_date:end_date
			},
			callback: function(response) {
			
				}
			});

		//alert('Re: '+religions)

		// Refresh the browser
		setTimeout(function() {
			location.reload();
		  }, 5000);

		  
	} catch (error) {
		// Display error message to the user
		alert('An error occurred: ' + error.message);
	  }
	},

});
