// Copyright (c) 2023, faruk and contributors
// For license information, please see license.txt

frappe.ui.form.on('vms_Mileage_Entry', {
	// refresh: function(frm) {

	// }


	current_meter_reading: function(frm) {

		// calculate meter reading difference
				var meter_diff= frm.doc.current_meter_reading-frm.doc.previous_meter_reading// get the value of the id field
				frm.set_value('mileage', meter_diff); // set the value of the unique id field

				if (meter_diff < 0) {
					frappe.msgprint('Mileage must be greater than or equal to 0');
					validated = false; // Cancel form submission if needed
				}
	},
	
	previous_meter_reading: function(frm) {

		// calculate meter reading difference
				var meter_diff= frm.doc.current_meter_reading-frm.doc.previous_meter_reading// get the value of the id field
				frm.set_value('mileage', meter_diff); // set the value of the unique id field

				if (meter_diff < 0) {
					frappe.msgprint('Mileage must be greater than or equal to 0');
					validated = false; // Cancel form submission if needed
				}
	},
	
	
	validate: function(frm) {

// validate meter reading difference
		
		if (frm.doc.mileage< 0) {
			frappe.msgprint('Mileage must be greater than or equal to 0');
			validated = false; // Cancel form submission if needed
		}

		try {
		var dDate=new Date(frm.doc.entry_date)
		var dMonth=dDate.getMonth()+1
		var dYear=dDate.getFullYear()
		
		var id_field = dMonth + "-" + dYear + ":" +frm.doc.license_number // get the value of the id field
		frm.set_value('unique_id', id_field); 
		  } catch (error) {
			console.error('An error occurred:', error);
			// Display error message to the user
			alert('An error occurred: ' + error.message);
		  }
				
	}

});
