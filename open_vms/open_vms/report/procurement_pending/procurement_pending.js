// Copyright (c) 2022, faruk and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Procurement Pending"] = {
	"filters": [
		{
			fieldname: "company",
			label: __("Company"),
			fieldtype: "Link",
			options: "Company",
			default: frappe.defaults.get_user_default("Company"),
		},
			
		{
			fieldname: "from_date",
			label: __("From Date"),
			fieldtype: "Date",
			default: frappe.defaults.get_user_default("year_start_date"),
		},
		{
			fieldname:"to_date",
			label: __("To Date"),
			fieldtype: "Date",
			default: frappe.defaults.get_user_default("year_end_date"),
		},
		{
			fieldname: "status",
            fieldtype: "Select",
            label: "Status",
            mandatory: 1,
            options: "Pending\nPartially Ordered\nOrdered\nPartially Received\nReceived\nCancelled",
            wildcard_filter: 0,
			default:"Pending"
		},
	]
}
