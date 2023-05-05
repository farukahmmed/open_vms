// Copyright (c) 2023, faruk and contributors
// For license information, please see license.txt

frappe.ui.form.on('vms_Voucher_Entry', {
	validate: function(frm) {

// calculate meter reading difference
		var meter_diff= frm.doc.current_meter_reading-frm.doc.previous_meter_reading// get the value of the id field
		frm.set_value('meter_reading_difference', meter_diff); // set the value of the unique id field
		
// calculate 'total amount' and 'total' in parent and child doc

	var temp = cur_frm.doc.voucher_entry_detail; 
						   // "voucher_entry_detail" parant doc table type field name
	var sum = 0;
	for ( var i = 0; i < temp.length; i++)
	{
	var obj = temp[i];
	var amount = obj.rate * obj.qty;
	sum = sum + amount;
    obj.total=amount
				}
				frm.set_value("total_amount",sum)

	
	
}
});
