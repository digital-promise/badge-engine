// Provides AWS account information of caller
data "aws_caller_identity" "current" {}

/*
    SECRETS MANAGER SECRETS CREATION
    Purpose: Create a secret on secrets manager to store issuer private key
*/

# Creates secrets metadata
resource "aws_secretsmanager_secret" "issuer_private_key_metadata" {
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/secretsmanager_secret

  description = "Private key used to sign credentials"
  name = "badging-issuer-private-key"

  # Num days that secrets manager waits to allow deletion of a secret
  recovery_window_in_days = "0"  # TODO - should be higher in production, defaults to 30
}

# Passes through secret and associate secret with metadata
resource "aws_secretsmanager_secret_version" "issuer_private_key" {
  # https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/secretsmanager_secret_version

  secret_id     = aws_secretsmanager_secret.issuer_private_key_metadata.id
  secret_string = var.issuer_private_key
}

/*
    IAM ROLE, IDENTITY POLICY, RESOURCE POLICY
    Purpose: Create a role that can read issuer private key secret
*/

# Creates identity policy to be used to 
  # Define the principals allowed to assume role `issuer_secret_get_role`
data "aws_iam_policy_document" "issuer_get_secret_identity_policy" {
  statement {
    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = [
        data.aws_caller_identity.current.account_id,
      ]
    }

    actions = ["sts:AssumeRole"]
  }
}

// Create IAM role that users will assume to read secret
resource "aws_iam_role" "issuer_secret_get_role" {
  name               = "issuer_private_key_read_role"
  assume_role_policy = data.aws_iam_policy_document.issuer_get_secret_identity_policy.json
}

// Permission policy - that allows getting of a defined secret - in JSON format
data "aws_iam_policy_document" "issuer_secret_get_permission_policy_document" {
  statement {
    effect    = "Allow"
    actions   = ["secretsmanager:GetSecretValue"]
    resources = [
      aws_secretsmanager_secret.issuer_private_key_metadata.arn
    ]
  }
}

// Creates IAM permission policy using permission policy data source
resource "aws_iam_policy" "issuer_secret_get_permission_policy" {
  name        = "issuer_secret_get_permission_policy"
  description = "Identity policy for GET issuer secret"
  policy      = data.aws_iam_policy_document.issuer_secret_get_permission_policy_document.json
}

# Attaches permissions policy to IAM role
resource "aws_iam_role_policy_attachment" "issuer_secret_get_attach" {
  role       = aws_iam_role.issuer_secret_get_role.name
  policy_arn = aws_iam_policy.issuer_secret_get_permission_policy.arn
}


/*
  IAM GROUP with PERMISSION TO ASSUME ROLE
  Purpose: Provides group members with priviledges to assume the role defined above
*/

// Creates IAM group
resource "aws_iam_group" "assume_role_issuer_secret_manager" {
  name = "assume-role-issuer-secret-manager-read"
}

// Creates permissions policy in JSON format
data "aws_iam_policy_document" "assume_role_issuer_secret_get_policy" {
  statement {
    effect    = "Allow"
    actions   = ["sts:AssumeRole"]
    resources = [
      aws_iam_role.issuer_secret_get_role.arn
    ]
  }
}

// Creates permissions policy as remote object using data source permission policy
resource "aws_iam_policy" "assume_role_issuer_secret_get_role_policy" {
  name        = "assume_role_issuer_secret_get_role_policy"
  description = "Permissions policy to allow user to assume role to issuer_secret_get"
  policy      = data.aws_iam_policy_document.assume_role_issuer_secret_get_policy.json
}

// Attaches permission policy to IAM group
resource "aws_iam_group_policy_attachment" "attach" {
  group      = aws_iam_group.assume_role_issuer_secret_manager.name
  policy_arn = aws_iam_policy.assume_role_issuer_secret_get_role_policy.arn
}