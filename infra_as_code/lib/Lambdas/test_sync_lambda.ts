import _lambda = require('aws-cdk-lib/aws-lambda');
import _logs = require('aws-cdk-lib/aws-logs');
import { Construct } from 'constructs';
import _apigw = require('aws-cdk-lib/aws-apigateway');

export class TestSyncLambda extends _lambda.Function {
    constructor(scope: Construct, fileName: string) {
        super(scope, fileName, {
            code: _lambda.Code.fromAsset('TestSyncLambda'),
            handler: `${fileName}.lambda_handler`,
            runtime : _lambda.Runtime.PYTHON_3_7,
            logRetention: _logs.RetentionDays.ONE_DAY
        })
    }
}

export const test_sync_lambda_integration_options: _apigw.LambdaIntegrationOptions = {
    proxy: false,
    requestParameters: {
      'integration.request.querystring.action': 'method.request.querystring.action',
      'integration.request.querystring.key': 'method.request.querystring.key',
    },
    requestTemplates: {
      'application/json': JSON.stringify({ action: "$util.escapeJavaScript($input.params('action'))", key: "$util.escapeJavaScript($input.params('key'))", })
    },
    passthroughBehavior: _apigw.PassthroughBehavior.WHEN_NO_TEMPLATES,
    integrationResponses: [
      {
        statusCode: "200",
        responseParameters: {
          'method.response.header.Access-Control-Allow-Origin': "'*'"
        }
      },
      {
        selectionPattern: "(\n|.)+",
        statusCode: "500",
        responseParameters: {
          'method.response.header.Access-Control-Allow-Origin': "'*'"
        }
      }
    ],
  };

  export const test_sync_lambda_method_options: _apigw.MethodOptions = {
    requestParameters: {
      'method.request.querystring.action': true,
      'method.request.querystring.key': true
    },
    methodResponses: [
      {
        statusCode: "200",
        responseParameters: {
          'method.response.header.Access-Control-Allow-Origin': true,
        },
      },
      {
        statusCode: "500",
        responseParameters: {
          'method.response.header.Access-Control-Allow-Origin': true,
        },
      }
    ]
  };