import json

def lambda_handler(event, context):
    message = 'Hello from test lambda!'
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps({
            "Region ": message
        })
    }