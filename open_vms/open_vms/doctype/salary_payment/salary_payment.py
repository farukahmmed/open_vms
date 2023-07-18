# Copyright (c) 2023, faruk and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

@frappe.whitelist()
def handle_button_click(start_date, end_date, month_id):	
	
	insert_query = "call sp_salary_with_2hr_ot_insert (%(start_date)s,%(end_date)s,%(month_id)s)"

	params = {
	"start_date": start_date,
	"end_date" : end_date,
	"month_id": month_id
	
	}
	
		#frappe.msgprint (f"value : {params }")
	
	#Execute sql
	frappe.db.sql(insert_query, params, as_dict=True)

	
	#frappe.db.sql("CALL insert_Salary_Detail(%s)", (month_id), as_dict=True)
    
           
    # Perform further actions based on the result

	#Count affected rows
	row_count=frappe.db.count('Salary Payment Detail', {'parent':month_id} )

	# Show the message
	frappe.msgprint (f"Rows Affected: {row_count}")

class SalaryPayment(Document):
	pass
