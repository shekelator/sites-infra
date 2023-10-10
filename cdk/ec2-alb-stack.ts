import { App, Stack, StackProps, CfnOutput } from 'aws-cdk-lib'
import { ServerResources, ServerProps } from './server-resources'
import { Construct } from 'constructs'
import { ec2 } from 'aws-cdk-lib/aws-ec2'

export interface EC2Props extends StackProps {
    logLevel: string;
    sshPublicKey: string;
    cpuType: string;
    instanceSize: string;
}

// Lots of borrowing from https://github.com/aws-samples/aws-cdk-examples/tree/master/typescript/ec2-instance
export class MultAppsStack extends Stack {
    constructor(scope: Construct, id: string, props: EC2Props) {
        super(scope, id, props);

        const vpcId = this.node.tryGetContext('vpcid');

        const { logLevel, sshPublicKey, cpuType, instanceSize } = props;

        const existingVpc = ec2.Vpc.fromLookup(this, 'VPC', { vpcId: vpcId, isDefault: true });

        // Create EC2 Instance
        // We will pass props to ServerResources to create the EC2 instance
        const serverResources = new ServerResources(this, 'EC2', {
            vpc: existingVpc,
            sshSecurityGroup: existingVpc.sshSecurityGroup,
            logLevel: logLevel,
            sshPubKey: sshPublicKey,
            cpuType: cpuType,
            instanceSize: instanceSize.toLowerCase(),
        });
    }

}