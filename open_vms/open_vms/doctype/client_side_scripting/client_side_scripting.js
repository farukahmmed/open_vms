// Copyright (c) 2022, faruk and contributors
// For license information, please see license.txt

frappe.ui.form.on('Client Side Scripting', {
	refresh: function(frm) {
		//frappe.msgprint("hello")
		//frappe.throw("there is an error")

		// if (frm.is_new ()){
		// 	frm.set_intro ("Intro: create a documet")
		// }

		// frm.add_custom_button ('Click me',() =>{
		// 	frappe.msgprint(__('You clicked'));
		// })

		frm.add_custom_button ('Click me-1',() =>{
			frappe.msgprint(__('You clicked-1'));
		}, 'Click Me')
		frm.add_custom_button ('Click me-2',() =>{
			frappe.msgprint(__('You clicked-2'));
		}, 'Click Me')
	

	},

	enabled: function(frm){
		frappe.throw("enabled")
	},
	age: function(frm){
		frappe.throw(" age modified")
	},

	after_save: function (frm){
		frappe.msgprint(__("Full Name is '{0}'",
		[frm.doc.first_name +" "+ 
		 frm.doc.middle_name +" "+
		 frm.doc.last_name
		]
		))

		for(let row of frm.doc.family_members){
			frappe.msgprint(__("{0}. The family memberis '{1}' and relation is '{2}'",
			[row.idx, row.name1, row.relation]))
		}
	},
	// validate:function(frm){
	// 	frm.set_value('full_name', frm.doc.first_name +" "+
	// 	frm.doc.middle_name +" "+ frm.doc.last_name)

	// 	let row=frm.add_child('family_members',{
	// 		name1:'Jony',
	// 		relation:'Father',
	// 		age:59,
	// 	})

	// },
	enabled:function(frm){
		frm.set_df_property('first_name','reqd',1)

	}

});

frappe.ui.form.on('Family Members',{
	name1: function(frm){
		frappe.msgprint("hello this is 'name1' event" )
	},

	age(frm,cdt,cdn){
		frappe.msgprint("Hello, you have changed age field value")
	}
})