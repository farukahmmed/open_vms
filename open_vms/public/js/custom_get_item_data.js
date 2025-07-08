frappe.ui.form.on("Material Request", {
	get_item_data: function (frm, item, overwrite_warehouse = false) {
		if (item && !item.item_code) {
			return;
		}
		frappe.call({
			method: "erpnext.stock.get_item_details.get_item_details",
			args: {
				args: {
					item_code: item.item_code,
					from_warehouse: item.from_warehouse,
					warehouse: item.warehouse,
					doctype: frm.doc.doctype,
					buying_price_list: frappe.defaults.get_default("buying_price_list"),
					currency: frappe.defaults.get_default("Currency"),
					name: frm.doc.name,
					qty: item.qty || 1,
					stock_qty: item.stock_qty,
					company: frm.doc.company,
					conversion_rate: 1,
					material_request_type: frm.doc.material_request_type,
					plc_conversion_rate: 1,
					rate: item.rate,
					uom: item.uom,
					conversion_factor: item.conversion_factor,
					project: item.project,
				},
				overwrite_warehouse: overwrite_warehouse,
			},
			callback: function (r) {
				const d = item;
				let allow_to_change_fields = [
					"actual_qty",
					"projected_qty",
					"min_order_qty",
					"item_name",
					"stock_uom",
					"uom",
					"conversion_factor",
					"custom_current_stock_qty",
					"custom_last_purchase_rate",
					"custom_supplier",
				];

				if (overwrite_warehouse) {
					allow_to_change_fields.push("description");
				}

				if (!r.exc) {
					$.each(r.message, function (key, value) {
						if (!d[key] || allow_to_change_fields.includes(key)) {
							d[key] = value;
						}
					});

					if (d.price_list_rate != r.message.price_list_rate) {
						d.rate = 0.0;
						d.price_list_rate = r.message.price_list_rate;
						frappe.model.set_value(d.doctype, d.name, "rate", d.price_list_rate);
					}

					refresh_field("items");
				}
			},
		});
	},

});
