frappe.query_reports["Sales Order Monthly Summary"] = {

	//frappe.query_reports["Sales Order Analysis"] = {
		"filters": [
			
			{
				fieldname:"from_date",
				label: __("From Date"),
				fieldtype: "Date",
				width: "80",
				reqd: 1,
				default: frappe.datetime.month_start()
			},
			{
				"fieldname":"to_date",
				"label": __("To Date"),
				"fieldtype": "Date",
				"width": "80",
				"reqd": 1,
				"default": frappe.datetime.month_end()
			 }
        ]
}