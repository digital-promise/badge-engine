output "issuer_get_role_arn" {
    value = aws_iam_role.issuer_secret_get_role.arn
    description = "ARN for IAM role to be assumed to get issuer secret"
}