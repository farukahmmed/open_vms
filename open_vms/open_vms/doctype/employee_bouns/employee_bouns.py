
import frappe 
from frappe.model.document import Document

@frappe.whitelist()

def handle_religion(id):
	select_query='''SELECT
  				GROUP_CONCAT(DISTINCT `tabEmployee Religion Assign`.religion SEPARATOR ',') AS Religions
				FROM `tabEmployee Religion Assign`
				WHERE `tabEmployee Religion Assign`.parent = %(id)s
				GROUP BY `tabEmployee Religion Assign`.parent'''
	
	params={"id":id}
	religion_list=frappe.db.sql(select_query,params,as_dict=False)
	
	return religion_list

@frappe.whitelist()
def handle_button_click(bonus_id,eff_date,eff_days,eff_days_end,percent,religions):	
	
	insert_query = '''INSERT INTO `tabEmployee Bonus Detail` 
			(name, parent, parentfield, parenttype, creation, employee_id, full_name, 
			designation, department, religion, date_of_joining, relieving_date, gross_salary, 
			salary_eff_date, bonus_eff_date, in_service_days, 
			bonus_percentage, bonus_amount) 

	SELECT
 	CONCAT(%(bonus_id)s,'-',tabEmployee.employee) AS name,
    %(bonus_id)s AS parent ,
    'bonus_detail' AS parentfield,
    'Employee Bouns' AS parenttype,
     NOW() AS creation,
    tabEmployee.employee,
    tabEmployee.employee_name,
    tabEmployee.designation,
    tabEmployee.department,
    tabEmployee.religion,
    tabEmployee.date_of_joining,
    tabEmployee.relieving_date,
    SubQuery.base AS gross_salary,
    MAX(SubQuery.from_date) AS salary_eff_date,
    %(eff_date)s AS bonus_eff_Date,
    DATEDIFF(%(eff_date)s, tabEmployee.date_of_joining) + 1 AS in_service_days,
    CASE WHEN DATEDIFF(%(eff_date)s, tabEmployee.date_of_joining) + 1 
	BETWEEN %(eff_days)s AND %(eff_days_end)s THEN %(percent)s  END AS bonus_percentage,
    CASE WHEN DATEDIFF(%(eff_date)s, tabEmployee.date_of_joining) + 1 
	BETWEEN %(eff_days)s AND %(eff_days_end)s THEN SubQuery.base / 100 * %(percent)s END AS bonus_amount
  	FROM tabEmployee
    INNER JOIN (SELECT
        `tabSalary Structure Assignment`.employee,
        `tabSalary Structure Assignment`.docstatus,
        `tabSalary Structure Assignment`.from_date AS from_date,
        `tabSalary Structure Assignment`.base
      FROM `tabSalary Structure Assignment`
      WHERE `tabSalary Structure Assignment`.docstatus = 1
      GROUP BY `tabSalary Structure Assignment`.employee,
               `tabSalary Structure Assignment`.from_date
      HAVING MAX(`tabSalary Structure Assignment`.from_date) <= %(eff_date)s) SubQuery
      ON tabEmployee.employee = SubQuery.employee
  	WHERE( tabEmployee.relieving_date IS NULL
  	OR tabEmployee.relieving_date > %(eff_date)s) AND  
    ((DATEDIFF(%(eff_date)s, tabEmployee.date_of_joining) + 1) BETWEEN %(eff_days)s AND %(eff_days_end)s )
    AND  tabEmployee.religion IN %(religions)s
  	GROUP BY tabEmployee.employee'''

	params = {
	"bonus_id": bonus_id,
	"eff_date": eff_date,
	"eff_days": eff_days, 
	"eff_days_end": eff_days_end,
	"percent":percent,
	"religions": religions.split(",")
	}
	
	#frappe.msgprint (f"value : {params }")
	#Execute sql
	frappe.db.sql(insert_query, params, as_dict=True)
	
	#Count affected rows
	row_count=frappe.db.count('Employee Bonus Detail', {'parent':bonus_id} )

	# Show the message
	frappe.msgprint (f"Rows Affected: {row_count}")
	
# @frappe.whitelist()
# def handle_test_click(religions):
	
# 	select_query='''SELECT
#   	tabEmployee.name,
#   	tabEmployee.religion
# 	FROM tabEmployee
# 	WHERE tabEmployee.religion IN %(religions)s'''
	
# 	params = {"religions": religions.split(",")}
# 	employee_list=frappe.db.sql(select_query,params,as_dict=False)
	
# 	return employee_list
	
class EmployeeBouns(Document):
	 pass
 