// Copyright (c) 2023, faruk and contributors
// For license information, please see license.txt

frappe.ui.form.on('Salary Month Setting', {
	start_date: function(frm) {
	try{

	
		var sDate = new Date (frm.doc.start_date)
		var sYear=sDate.getFullYear()
		var sMonth=sDate.getMonth()+1
		var sDay=sDate.getDate()

		var eDate= new Date (frm.doc.end_date)
		var eDay= eDate.getDate()

		var id=sYear + "-"+ sMonth +"_"+sDay +"-"+eDay
		 frm.set_value('month_id', id)

	}catch (error) {
			console.error('An error occurred:', error);
			// Display error message to the user
			alert('An error occurred: ' + error.message);
		  }
	 },

	 end_date: function(frm) {
		try{
	
		
		var sDate = new Date (frm.doc.start_date)
		var sYear=sDate.getFullYear()
		var sMonth=sDate.getMonth()+1
		var sDay=sDate.getDate()

		var eDate= new Date (frm.doc.end_date)
		var eDay= eDate.getDate()

		var id=sYear + "-"+ sMonth +"_"+sDay +"-"+eDay
		 frm.set_value('month_id', id)

	
		}catch (error) {
				console.error('An error occurred:', error);
				// Display error message to the user
				alert('An error occurred: ' + error.message);
			  }
		 }
});
