// Copyright (c) 2024, faruk and contributors
// For license information, please see license.txt

frappe.ui.form.on("Bill", {
	refresh:function(frm) {
        calculate_total_amount(frm);       

	},
    amount:function(frm){
        calculate_total_amount(frm);

    },
    additional_amount:function(frm){
        calculate_total_amount(frm)
    }
});

//Function to calculate total amount and convert it to in-words.
function calculate_total_amount(frm){
    let amount=frm.doc.amount ||0;
    let additional_amount=frm.doc.additional_amount || 0;
    let total_amount= amount+additional_amount;
    frm.set_value('total_amount',total_amount);

    if (total_amount){
        frappe.call({
            method: 'open_vms.open_vms.doctype.bill.bill.get_total_amount_in_words',
            args:{
                amount: total_amount,
                currency: frm.doc.currency || "BDT"
            },
            callback:function(r){
                if (r.message){
                    frm.set_value('in_words', r.message)
                }
            }
        });
    }

}