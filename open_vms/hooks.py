from . import __version__ as app_version

app_name = "open_vms"
app_title = "Open VMS"
app_publisher = "faruk"
app_description = "Open sourece fleet management system"
app_email = "faruk.fa@gmail.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/open_vms/css/open_vms.css"
# app_include_js = "/assets/open_vms/js/open_vms.js"

# include js, css files in header of web template
# web_include_css = "/assets/open_vms/css/open_vms.css"
# web_include_js = "/assets/open_vms/js/open_vms.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "open_vms/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "open_vms.utils.jinja_methods",
# 	"filters": "open_vms.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "open_vms.install.before_install"
# after_install = "open_vms.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "open_vms.uninstall.before_uninstall"
# after_uninstall = "open_vms.uninstall.after_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "open_vms.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"open_vms.tasks.all"
# 	],
# 	"daily": [
# 		"open_vms.tasks.daily"
# 	],
# 	"hourly": [
# 		"open_vms.tasks.hourly"
# 	],
# 	"weekly": [
# 		"open_vms.tasks.weekly"
# 	],
# 	"monthly": [
# 		"open_vms.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "open_vms.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "open_vms.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "open_vms.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]


# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"open_vms.auth.validate"
# ]

# Translation
# --------------------------------

# Make link fields search translated document names for these DocTypes
# Recommended only for DocTypes which have limited documents with untranslated names
# For example: Role, Gender, etc.
# translated_search_doctypes = []


# to automate stock transfer from web store to delivery store
# Created By Faruk on 16/08/2024

doc_events = {
    "Sales Order": {
        "on_submit": "open_vms.custom_script.create_stock_entry"
    }
}

 # Include the html5-qrcode library
app_include_js = [
    "https://unpkg.com/html5-qrcode",
    "/assets/open_vms/js/customization_mr.js",
    
]
# open_vms/public/js/customization_mr.js

## open_vms/public/custom_javascript.js
## Path to the custom JavaScript file

#doctype_list_js = {
#    "Textile RnD Hanger": "public/js/textile_rnd_hanger.js",
#    "Asset Repair": "public/js/asset_repair_list.js"
#}


