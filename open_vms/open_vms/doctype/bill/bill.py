# Copyright (c) 2024, faruk and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import money_in_words
from frappe.model.document import Document


class Bill(Document):
	pass

@frappe.whitelist()
def get_total_amount_in_words(amount, currency):
    return money_in_words(amount, currency)