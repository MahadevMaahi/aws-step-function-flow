import _sfn = require('aws-cdk-lib/aws-stepfunctions');

export function getPassState(stateMachine: _sfn.StateMachine, stateName: string, passProps: _sfn.PassProps): _sfn.Pass {
    return new _sfn.Pass(stateMachine, stateName, passProps)
}

export function getWaitState(stateMachine: _sfn.StateMachine, stateName: string, waitProps: _sfn.WaitProps): _sfn.Wait {
    return new _sfn.Wait(stateMachine, stateName, waitProps)
}

export function getSucceedState(stateMachine: _sfn.StateMachine, stateName: string, succeedProps: _sfn.SucceedProps): _sfn.Succeed {
    return new _sfn.Succeed(stateMachine, stateName, succeedProps)
}

export const startStateProps: _sfn.PassProps = {
    parameters: {
        triggerTime: _sfn.JsonPath.stringAt('$.key'),
    }
}

export const waitStateProps: _sfn.WaitProps = {
    time: _sfn.WaitTime.timestampPath('$.triggerTime'),
}