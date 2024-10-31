# For outputs, check
    # Terraform cloud
    # or 
    # command line of local machine that ran TF apply

# Deactivate dependency module for now
# output "issuer_get_role_arn" {
#     value = module.secrets_manager_and_iam_role.issuer_get_role_arn
#     description = "ARN for IAM role to be assumed to get issuer secret"
# }