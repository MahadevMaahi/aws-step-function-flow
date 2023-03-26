import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiGateway } from './ApiGateway';
import { TestLambda } from './Lambdas/test_lambda';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfraAsCodeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'InfraAsCodeQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const apigw = new ApiGateway(this);

    const testLambdaFnx = new TestLambda(this, 'test_lambda_fnx');

    apigw.addIntegration('GET', 'test', testLambdaFnx);
  }
}
