// Copyright (c) 2023, faruk and contributors
// For license information, please see license.txt

frappe.ui.form.on('vms_Mileage_Entry', {
	// refresh: function(frm) {

	// }


	current_meter_reading: function(frm) {

		// calculate meter reading difference
				var meter_diff= frm.doc.current_meter_reading-frm.doc.previous_meter_reading// get the value of the id field
				frm.set_value('mileage', meter_diff); // set the value of the unique id field

				if (meter_diff <= 0) {
					frappe.msgprint('Mileage must be greater than  0');
					validated = false; // Cancel form submission if needed
				}
	},
	
	previous_meter_reading: function(frm) {

		// calculate meter reading difference
				var meter_diff= frm.doc.current_meter_reading-frm.doc.previous_meter_reading// get the value of the id field
				frm.set_value('mileage', meter_diff); // set the value of the unique id field

				if (meter_diff <= 0) {
					frappe.msgprint('Mileage must be greater than 0');
					validated = false; // Cancel form submission if needed
				}
	},
	
	// featch previous meter reading when button clicked
	get_previous_reading: function(frm){

		try {
			var dDate=new Date(frm.doc.entry_date)
			var dMonth=dDate.getMonth()+1
			var dYear=dDate.getFullYear()
			
			if (dMonth==1){
	
				var uniqueID = 12 + "-" + (dYear-1) + ":" +frm.doc.license_number 
			}else{
			  var uniqueID = (dMonth-1) + "-" + dYear + ":" +frm.doc.license_number 
			}
	
			// frappe.msgprint('Month: ' + dMonth);
			// frappe.msgprint(id_field);
			
			frappe.db.get_value('vms_Mileage_Entry', {'unique_id': uniqueID}, 'name', function(data) {
				var docname = data.name;
				//frappe.msgprint('Document Name1: ' + docname);
				
				if (typeof docname  !=='undefined'){
				frappe.db.get_value('vms_Mileage_Entry', docname, 'current_meter_reading', function(data) {
					
					var cReading= data.current_meter_reading;
	
					//frappe.msgprint('Privious Reading : ' + cReading);
					function generateAndCloseMessage(title, message) {
						alert(title + "\n\n" + message);
						closeDialog();
					}
					
					function closeDialog() {
						// Add your custom code here to close the dialog or perform any other desired actions
						frm.set_value('previous_meter_reading', cReading); 
					}
					
					// Example usage
					generateAndCloseMessage("Message", 'Privious Reading : ' + cReading);
					
				});

			}else{ 

				frappe.msgprint('Previous Reading Not available.')
			}
				

			});
	
	
		} catch (error) {
			console.error('An error occurred:', error);
			// Display error message to the user
			alert('An error occurred: ' + error.message);
		  }

	},
	
	validate: function(frm) {

		// validate meter reading difference
	try {
		if (frm.doc.mileage<= 0) {
			apert('Mileage must be greater than 0');
			validated = false; // Cancel form submission if needed
		}
		
		var dDate=new Date(frm.doc.entry_date)
		var dMonth=dDate.getMonth()+1
		var dYear=dDate.getFullYear()
		
		var id_field = dMonth + "-" + dYear + ":" +frm.doc.license_number // get the value of the id field
		frm.set_value('unique_id', id_field); 
		  
				
	} catch (error) {
		console.error('An error occurred:', error);
		// Display error message to the user
		alert('An error occurred: ' + error.message);
		validated = false;

	  }
		
	}

});
