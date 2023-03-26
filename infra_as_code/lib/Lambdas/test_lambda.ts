import _lambda = require('aws-cdk-lib/aws-lambda');
import _nodeLambda = require('aws-cdk-lib/aws-lambda-nodejs');
import _logs = require('aws-cdk-lib/aws-logs');
import { Construct } from 'constructs';
import * as path from "path";

export class TestLambda extends _lambda.Function {
    constructor(scope: Construct, fileName: string) {
        super(scope, fileName, {
            code: _lambda.Code.fromAsset('LambdaHandlers'),
            handler: `${fileName}.lambda_handler`,
            runtime : _lambda.Runtime.PYTHON_3_7,
            logRetention: _logs.RetentionDays.ONE_DAY
        })
    }
}