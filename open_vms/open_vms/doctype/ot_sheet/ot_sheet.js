// Copyright (c) 2022, faruk and contributors
// For license information, please see license.txt

frappe.ui.form.on('OT Sheet', {
	refresh: function(frm) {
		window.open("http://172.16.16.14:8081/rsvd/Pages/ReportViewer.aspx?%2fREPORTS%2fExport+Status+Details&rs:Command=Render", "_blank", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=1200,height=550"); 
		

	}
});
