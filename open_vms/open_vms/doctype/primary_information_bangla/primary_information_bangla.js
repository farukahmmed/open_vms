// Copyright (c) 2023, faruk and contributors
// For license information, please see license.txt

frappe.ui.form.on('Primary Information Bangla', {
	refresh: function(frm) {
		window.open("http://report.panamgroupbd.com:8081/rsvd/Pages/ReportViewer.aspx?%2fREPORTS%2fPANAM+CYCLE%2ferp%2fPCIL+Primary+Information+Bangla&rs:Command=Render",
		 "_blank", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=1200,height=550"); 
		history.back()
}
});
