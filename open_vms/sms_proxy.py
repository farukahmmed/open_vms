from flask import Flask, request, jsonify
import requests
import json
import datetime

app = Flask(__name__)

LOG_FILE = "open_vms/sms_proxy.log"

def write_log(entry):
    with open(LOG_FILE, "a") as f:
        f.write(f"{datetime.datetime.now()} - {entry}\n")

@app.route('/sms-proxy', methods=['GET'])
def send_sms():
    to = request.args.get('receiver')
    message = request.args.get('message')

    if not to or not message:
        log_msg = "Missing parameters: receiver or message"
        write_log(log_msg)
        return jsonify({"status": "error", "msg": log_msg}), 400

    payload = [
        {
            "to": to,
            "lan": "1",
            "message": message
        }
    ]

    headers = {
        "api_key": "24b81ba1-1d8e1-4e1b-aeab-5fd32368f88waMetrok",
        "api_id": "metrokd.l3",
        "api_password": "Asdf@#1234",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(
            "https://sms.link3.net/api/SendBulkSMS",
            headers=headers,
            data=json.dumps(payload),
            timeout=30
        )
        write_log(f"Sent to: {to}, Message: {message}, Response: {response.status_code} - {response.text}")
        return jsonify({"status": "success", "response": response.text})
    except Exception as e:
        error_msg = f"Exception: {str(e)}"
        write_log(error_msg)
        return jsonify({"status": "error", "msg": error_msg}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

##########################################################################
# INSTALL FLASK:
# pip install flask requests


# RUN THE SMS PROXY SERVER:
# python3 /path/sms_proxy.py

# create a sms_proxy.log file in the same directory
# and give write permission to the user running the script.

    
# TEST URL:
# http://localhost:8080/sms-proxy?receiver=0171344292&message=Test+message

# ERPNEXT SMS SETTINGS:

# 1. Go to Settings > SMS Settings

# SMS Gateway URL:	http://your_server_ip:8080/sms-proxy
# Message Parameter:	message
# Receiver Parameter:	receiver
# Use Post:	            (Unchecked)
# Parameters:	        (Leave empty)

