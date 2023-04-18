import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiGateway } from './ApiGateway';
import { TestSyncLambda, test_sync_lambda_integration_options, test_sync_lambda_method_options } from './Lambdas/test_sync_lambda';
import { TestAsyncLambda, test_async_lambda_integration_options, test_async_lambda_method_options } from './Lambdas/test_async_lambda';

export class InfraAsCodeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const apigw = new ApiGateway(this);

    const testSyncLambdaFnx = new TestSyncLambda(this, 'test_sync_lambda_fnx');

    const testASyncLambdaFnx = new TestAsyncLambda(this, 'test_async_lambda_fnx');

    const resource = apigw.addResourcePath('test');

    apigw.addIntegration(
      'GET',
      resource,
      testSyncLambdaFnx,
      test_sync_lambda_integration_options,
      test_sync_lambda_method_options
      );

      apigw.addIntegration(
        'POST',
        resource,
        testASyncLambdaFnx,
        test_async_lambda_integration_options,
        test_async_lambda_method_options
      );
  }
}
