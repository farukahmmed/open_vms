// Copyright (c) 2023, faruk and contributors
// For license information, please see license.txt

frappe.ui.form.on('Job_Card_Actual', {
	refresh: function(frm) {
		window.open("http://172.16.16.14:8081/rsvd/Pages/ReportViewer.aspx?%2fREPORTS%2fPANAM+CYCLE%2ferp%2fPCIL+Job+Card+Actual&rs:Command=Render",
		 "_blank", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=1200,height=550"); 
		history.back()
	}
});
