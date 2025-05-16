console.log("Custom JavaScript loaded for asset repair List");

frappe.listview_settings['Asset Repair'] = {
    onload: function(listview) {
        // Wait until filters are rendered
        frappe.after_ajax(() => {
            add_scan_button_beside_id_filter(listview);
        });
    }
};

function add_scan_button_beside_id_filter(listview) {
    // Use a timeout to ensure the filters are fully loaded
    setTimeout(() => {
        // Get the filter for the 'asset' field
        let name_filter = listview.filter_area.standard_filters_wrapper.find('div[data-fieldname="asset"]');

        if (name_filter.length > 0 && !name_filter.find('.scan-btn').length) {
            let name_filter_input = name_filter.find('input');

            // Create the Scan QR Code button
            let scan_button = $('<button type="button" class="btn btn-primary btn-xs scan-btn" style="margin-left: 5px; margin-top: 5px;">Scan QR Code</button>')
                .click(function() {
                    start_qr_scanner(listview);
                });

            // Insert the button next to the asset filter input
            name_filter_input.after(scan_button);
        }
    }, 1000); // Adjust the delay if needed
}

function start_qr_scanner(listview) {
    if (typeof Html5Qrcode === 'undefined') {
        frappe.msgprint('QR code scanner library not loaded. Please contact your administrator.');
        return;
    }

    // Generate a unique ID for the scanner element
    let scannerId = 'qr-code-scanner-' + new Date().getTime();

    // Create a dialog to display the QR code scanner
    let d = new frappe.ui.Dialog({
        title: 'Scan QR Code',
        fields: [
            {
                fieldtype: 'HTML',
                fieldname: 'qr_code_scanner',
                options: `<div asset="${scannerId}" style="width:100%;"></div>`
            }
        ],
        primary_action_label: 'Close',
        primary_action() {
            stopScanner();
        }
    });

    d.show();

    // Wait for the dialog to render before initializing the QR code scanner
    setTimeout(() => {
        let qrCodeScannerElement = document.getElementById(scannerId);

        if (!qrCodeScannerElement) {
            frappe.msgprint('QR code scanner element not found.');
            return;
        }

        // Initialize the Html5Qrcode scanner
        let html5QrCode = new Html5Qrcode(scannerId);

        html5QrCode.start(
            { facingMode: 'environment' }, // Use the environment-facing camera
            {
                fps: 10,  // Frames per second
                qrbox: 250  // QR scanning box size
            },
            (decodedText, decodedResult) => {
                console.log('QR code scanned:', decodedText);

                // Set the scanned value in the asset filter input
                let name_filter = listview.filter_area.standard_filters_wrapper.find('div[data-fieldname="asset"]');
                let name_filter_input = name_filter.find('input');
                name_filter_input.val(decodedText).trigger('change');  // Apply the filter with the scanned value

                stopScanner();
            },
            (errorMessage) => {
                console.log('QR Code scan error:', errorMessage);
            }
        ).catch((err) => {
            frappe.msgprint('Error starting the QR code scanner: ' + err);
        });
    }, 500);

    // Stop the scanner when closing the dialog
    function stopScanner() {
        if (html5QrCode) {
            html5QrCode.stop().then(() => {
                html5QrCode.clear();
                d.hide();
            }).catch(err => {
                frappe.msgprint('Error stopping the scanner: ' + err);
            });
        } else {
            d.hide();
        }
    }
}
