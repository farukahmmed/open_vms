# Copyright (c) 2024, faruk and contributors
# For license information, please see license.txt

# import frappe
import frappe
import pyodbc
from frappe.model.document import Document

class get_odbc_data(Document):
    # try:
    #     result = handle_show_msg()
    #     print(result)
    # except Exception as e:
    #     frappe.msgprint(f"An exception occurred: {e}")
   
    pass




@frappe.whitelist()

def handle_show_msg():
    
    #frappe.msgprint ("Rows Affected: 1")
    
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
            TOP 1 
            DisplayEmployeeCode
            ,EmployeeName
            
            
            from EmployeePIMSInfoNew;
            """
       
         # Create a cursor from the connection
        cursor = conn.cursor()
           # Execute the query
        result = cursor.execute(SQL_QUERY).fetchall(),
         
        #return result
        frappe.msgprint(f"Rows Affected: {len(result)}")
        frappe.msgprint(f"Rows Affected: {result}")
        
        # Close the cursor and connection
        #cursor.close()
        #conn.close()
        
        # Uncomment the following line for debugging
        #print("Debugging point 1")

    # Uncomment the following line for debugging
        #import pdb; pdb.set_trace()
        
        #return {"message": "Success", "data": result}
        return {"Data":result}

        
    
#frappe.msgprint(f"Rows Affected: {len(result)}")

#return {"message": "Success", "data": result}
        #frappe.msgprint ("Rows Affected:3")
        
    except Exception as e:
    
        frappe.msgprint(f'Error: {str(e)}')
        
        #return {"message": "Error", "data": None}
    
  #-----------------------------------------------------------------------------  
        
def get_data_from_sql_server():
    
    
    
    try:
        frappe.msgprint ("Rows Affected: ")
        
        server = '172.16.16.17'
        database = 'fairshopdb'
        username = 'sa'
        password = 'Sqlkormee'
        port = 1433     # must mention port number to work pyodbc

        # Establish a connection to the SQL Server
        conn_str = f'DRIVER=/usr/lib/x86_64-linux-gnu/odbc/libtdsodbc.so;SERVER={server};PORT={port};DATABASE={database};UID={username};PWD={password}'
        conn = pyodbc.connect(conn_str)

        # Example query: Selecting data from the EmployeeInfo table
        SQL_QUERY = """
            SELECT 
            TOP 5 
            DisplayEmployeeCode
            ,EmployeeName
            
            
            from EmployeePIMSInfoNew;
            """
            
        # Create a cursor from the connection
        cursor = conn.cursor()
          # Execute the query
        result = cursor.execute(SQL_QUERY).fetchall()

        # Close the cursor and connection
        cursor.close()
        conn.close()

        #return result
    
        frappe.msgprint(f"Rows Affected: {len(result)}")

        return {"message": "Success", "data": result}

    except Exception as e:
        frappe.msgprint(f'Error: {str(e)}')
       # return {"message": "Error", "data": None}

    

# Explicitly register the method in the DocType
#get_odbc_data.get_data_from_sql_server = get_data_from_sql_server
