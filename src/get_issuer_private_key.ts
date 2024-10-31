import 'server-only'
import { env } from "~/env.mjs";

import {
    SecretsManagerClient,
    GetSecretValueCommand,
    type SecretsManagerClientConfig
} from "@aws-sdk/client-secrets-manager";

import { 
    STSClient, AssumeRoleCommand, 
    type AssumeRoleCommandOutput
} from "@aws-sdk/client-sts";


export const assumeRoleToGetIssuerPrivateKey: () => Promise<AssumeRoleCommandOutput> = async () => {
    // Assume role before getting issuer private key
    const client = new STSClient({ 
        region: env.AWS_REGION,
        credentials: {
            accessKeyId: env.AWS_ACCESS_KEY_ID, // your AWS access key ID.
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY //your AWS secret access key.
        }
    });

    try {
        // Returns a set of temporary security credentials that you can use to
        // access Amazon Web Services resources that you might not normally
        // have access to.
        const command = new AssumeRoleCommand({
          // The Amazon Resource Name (ARN) of the role to assume.
          RoleArn: env.ISSUER_PRIVATE_KEY_READ_ROLE_ARN,
          // An identifier for the assumed role session.
          RoleSessionName: "session-badging-monolith",
          // The duration, in seconds, of the role session. The value specified
          // can range from 900 seconds (15 minutes) up to the maximum session
          // duration set for the role.
          DurationSeconds: 900,
        });
        const response = await client.send(command);
        return response
      } catch (err) {
        console.error(err);
        throw err
      }
}

export const getIssuerKeyFromSecretsManager: (c: AssumeRoleCommandOutput) => Promise<string | undefined> = async (config) => {
    // Grab issuer key from secret manager using temporary credentials from parameters

    // Use this code snippet in your app.
    // If you need more information about configurations or implementing the sample code, visit the AWS docs:
    // https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html
    if (!config?.Credentials?.AccessKeyId || !config?.Credentials?.SecretAccessKey) {
        throw "Invalid configurations passed through from STS assume role"
    }
    const secret_name: string = env.ISSUER_PRIVATE_KEY_SECRET_NAME; 
    
    // Find configuration details at: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
    const clientOptions: SecretsManagerClientConfig = {
        credentials: {
            accessKeyId: config.Credentials.AccessKeyId, // AWS access key ID from STS
            secretAccessKey: config.Credentials.SecretAccessKey, // AWS secret access key from STS
            sessionToken: config.Credentials.SessionToken,
        },  
        region: env.AWS_REGION, // region isn't in config from STS call
    }

    const client: SecretsManagerClient = new SecretsManagerClient(clientOptions);

    const params = {
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
    }
    
    let response;
    
    try {
        response = await client.send(
            new GetSecretValueCommand(params)
        );
        const secret = response.SecretString;
        console.log('Successfully got issuer private key!')
        return secret
    } catch (error) {
        // For a list of exceptions thrown, see
        // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        throw error;
    }
}

export const getIssuerPrivateKey: () => Promise<string | undefined> = async () => {
    // Assume role first to get temporary credentials
    const config: AssumeRoleCommandOutput = await assumeRoleToGetIssuerPrivateKey();

    // Pass through temp credentials as parameters to get issuer private key secret
    const ipk: string | undefined = await getIssuerKeyFromSecretsManager(config);
    return ipk
}