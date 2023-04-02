import _sfn = require('aws-cdk-lib/aws-stepfunctions');
import { Construct } from 'constructs';

export class TestStepFunctionFlow extends _sfn.StateMachine {
    constructor(scope: Construct, stateMachineName: string, startState: _sfn.IChainable) {
        super(scope, stateMachineName, {
            definition: startState
        })
    }
}