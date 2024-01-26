// Copyright (c) 2024, faruk and contributors
// For license information, please see license.txt

frappe.ui.form.on('get_odbc_data', {

	get_data: function(frm) {

        try{  

        var emp_id=frm.doc.emp_id;
        //frappe.msgprint(str(emp_id));

        frappe.call({
            method: 'open_vms.open_vms.doctype.get_odbc_data.get_odbc_data.handle_show_msg',
            args: {
            emp_id:emp_id   
           },
           callback: function (r) {
            
            let json_string=r.message;
           // Parse the JSON string to a JavaScript object (array in this case)
            let json_data = JSON.parse(json_string);

            // Access the 'EmployeeName' value from the first object in the array
            let employee_name = json_data[0].EmployeeName;
            var data_text=JSON.stringify(employee_name);
            // Remove quotation marks
            let employeeNameWithoutQuotes = employee_name.replace(/"/g, '');

            // Access the 'Employee Image' value from the first object in the array
            let emp_image = json_data[0].EmpImage;
            var data_text=JSON.stringify(emp_image);
            // Remove quotation marks
            let emp_image_WithoutQuotes = emp_image.replace(/"/g, '');

            console.log(emp_image_WithoutQuotes);
            frappe.msgprint("Name: "+ emp_image_WithoutQuotes);

            // Set the 'EmployeeName' to the 'name1' field
            frm.set_value('name1',employeeNameWithoutQuotes);

            // Set the 'emp image' to the 'image' field
            frm.set_value('image',emp_image_WithoutQuotes);
            
                        }
			});

        
    } catch (error) {
        // Log the error details to the console
        console.error("An error occurred: " + error.message);
    }

}});