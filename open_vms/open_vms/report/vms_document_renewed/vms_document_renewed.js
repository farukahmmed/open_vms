frappe.query_reports["vms_Document_Renewed"] = {
    "filters": [
    
        {
            fieldname:"from_date",
            label: __("From Date"),
            fieldtype: "Date",
            width: "80",
            default: frappe.datetime.month_start(),
            reqd: 1
                    },

                    
    {
            fieldname:"to_date",
            label: __("To Date"),
            fieldtype: "Date",
            width: "80",
            default: frappe.datetime.month_end(),
            reqd: 1
                                }
       
    ]
    
    }