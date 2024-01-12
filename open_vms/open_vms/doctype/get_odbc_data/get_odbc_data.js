// Copyright (c) 2024, faruk and contributors
// For license information, please see license.txt

frappe.ui.form.on('get_odbc_data', {

	xget_data: function (frm) {
        // Add a button to fetch data
        //frm.add_custom_button(__('Fetch Data'), function () {

			try{
                console.log ("---hi----");

            frappe.call({
                method: 'open_vms.open_vms.doctype.get_odbc_data.get_odbc_data.get_data_from_sql_server',
                args: {},
                
                callback: function(response) {
                    /// Update the custom fields with the SQL result
                    console.log("---hi----2");

                    // Display the message directly in the browser using frappe.msgprint
                    frappe.msgprint(response.message);

                    // If you have data to process, you can access it using response.data
                    if (response.data && response.data.length > 0) {
                        console.log("Data:", response.data);
                    }
                }
            });
            console.log("---hi----4");

        } catch (error) {
            // Log the error details to the console
            console.error("An error occurred: " + error.message);
        }
    },

    get_data: function(frm) {

        //try{
        console.log ("---hi----");

        frappe.call({
            method: 'open_vms.open_vms.doctype.get_odbc_data.get_odbc_data.handle_show_msg',
            args: {

           },
			callback: function(response) {

                var data=response.message
                console.log("Server Response:", response);
                //Convert Json to text
				var data_text=JSON.stringify(data);
                frappe.msgprint("data: "+data_text);
				// Check if the operation was successful
                //if (response.message === "Success") {
                    if (data_text==="Success"){
                    // Display a success message
                    frappe.msgprint("Operation successful!");
        
                    // If there is any data, process it
                    if (data_text && data_text.length > 0) {
                        console.log("Data:", data_text);
                        // Do something with the data
                    }
                } else {
                    // Display an error message if the operation failed
                    frappe.msgprint("Operation failed: " + data_text);
                }
            }
			});

        
    }

});