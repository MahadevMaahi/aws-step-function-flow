import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import _apigw = require('aws-cdk-lib/aws-apigateway');
import _logs = require('aws-cdk-lib/aws-logs');
import _lambda = require('aws-cdk-lib/aws-lambda');

export class ApiGateway extends _apigw.RestApi {
    constructor(scope: Construct) {
        super(scope, "APIGateway", {
            restApiName : 'step-fnx-api'
        })
    }

    addIntegration(method: string, path: string, fnx: _lambda.IFunction) {
        const resApi = this.root.addResource(path);
        resApi.addMethod(method, new _apigw.LambdaIntegration(fnx));
    }
}