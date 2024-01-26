# Copyright (c) 2024, faruk and contributors
# For license information, please see license.txt

# import frappe
import frappe
import pyodbc
import json
import datetime
from frappe.model.document import Document

class get_odbc_data(Document):
    # try:
    #     result = handle_show_msg()
    #     print(result)
    # except Exception as e:
    #     frappe.msgprint(f"An exception occurred: {e}")
   
    pass
@frappe.whitelist()
def handle_show_msg(emp_id):
    
    #frappe.msgprint ("Rows Affected: 1")
    def serialize(obj):
        """JSON serializer for objects not serializable by default json code"""

        if isinstance(obj, (datetime.datetime, datetime.date)):
            return obj.isoformat()
        return str(obj)  # Fallback to convert other types to string

    
    try:
        
        
        server = '172.16.16.17'
        database = 'fairshopdb'
        username = 'sa'
        password = 'Sqlkormee'
        port = 1433     # must mention port number to work pyodbc

        # Establish a connection to the SQL Server
        conn_str = f'DRIVER=/usr/lib/x86_64-linux-gnu/odbc/libtdsodbc.so;SERVER={server};PORT={port};DATABASE={database};UID={username};PWD={password}'
        conn = pyodbc.connect(conn_str)

        SQL_QUERY = """
            SELECT 
            top 1
            DisplayEmployeeCode
            ,EmployeeName
            ,EmpImage
            
            from EmployeePIMSInfoNew
            where DisplayEmployeeCode=?
            ;
                       """
       
         # Create a cursor from the connection
        cursor = conn.cursor()
           # Execute the query
        parameter=emp_id
        result = cursor.execute(SQL_QUERY,parameter).fetchall(),
         
        #return result
        # frappe.msgprint(f"Rows Affected: {len(result)}")
        # frappe.msgprint(f"Rows Affected: {result}")
        
         # Extract column names
        column_names = [column[0] for column in cursor.description]
        #frappe.msgprint(str(column_names))
        
        # Convert result to list of dictionaries
         # Ensure result is unpacked correctly
        rows = result[0] if result else []

        # Convert rows to list of dictionaries
        data_list = []
        for row in rows:
            row_dict = {column_names[i]: serialize(row[i]) for i in range(len(column_names))}
            data_list.append(row_dict)

        # Convert list of dictionaries to JSON string
        json_data = json.dumps(data_list, indent=4)

        #frappe.msgprint(str(json_data))

        
        # Close the cursor and connection
        cursor.close()
        conn.close()
        
        #return {"message": "Success", "data": json_data}
        return json_data

        
    
#frappe.msgprint(f"Rows Affected: {len(result)}")

#return {"message": "Success", "data": result}
        #frappe.msgprint ("Rows Affected:3")
        
    except Exception as e:
    
        frappe.msgprint(f'Error: {str(e)}')
        
        #return {"message": "Error", "data": None}