import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import _apigw = require('aws-cdk-lib/aws-apigateway');
import _lambda = require('aws-cdk-lib/aws-lambda');

export class ApiGateway extends _apigw.RestApi {
    constructor(scope: Construct) {
        super(scope, "APIGateway", {
            restApiName : 'step-fnx-api'
        })
    }

    addResourcePath(path: string): _apigw.Resource {
        return this.root.addResource(path);
    }

    addIntegration(
        method: string,
        resource: _apigw.Resource,
        fnx: _lambda.IFunction,
        lambdaIntegrationOptions: _apigw.LambdaIntegrationOptions,
        methodOptions: _apigw.MethodOptions
    ) {
        resource.addMethod(method, new _apigw.LambdaIntegration(fnx, lambdaIntegrationOptions), methodOptions);
    }
}