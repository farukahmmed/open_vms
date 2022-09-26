# Copyright (c) 2022, faruk and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document

class ServerSideScripting(Document):

	pass
	#def validate (self):
		# frappe.msgprint("hellow frappe SSS")

# # FETCH VALE FROM MAIN/PARENT DOC
# 		frappe.msgprint(_("My full Name is '{0}'").format(
# 			self.first_name +" "+ self.middle_name + " " +self.last_name
# 		))

# ## FETCH VALUE FROM CHILD DOC
# 		for row in self.get("family_members"):
# 			frappe.msgprint(_(
# 				"{0}. The family members name is '{1}', relation '{2}', and age = {3} Years").format(
# 					row.idx, row.name1,row.relation,row.age))

		

