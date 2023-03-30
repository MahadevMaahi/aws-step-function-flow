import json
import boto3

def lambda_handler(event, context):

    action = event['action']
    key = event['key']

    message = 'Hello from test lambda! action = ' + action + ' received with Key = ' + key
    return { "message ": message }