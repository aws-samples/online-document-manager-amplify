import { AmplifyS3ResourceTemplate } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyS3ResourceTemplate) {
    resources.s3Bucket.accelerateConfiguration = {
        accelerationStatus: 'Enabled'
    }
}
