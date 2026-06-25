output "project_name" {
  description = "Project name used by this Terraform skeleton."
  value       = var.project_name
}

output "environment" {
  description = "Environment name used by this Terraform skeleton."
  value       = var.environment
}

output "aws_region" {
  description = "Configured AWS region."
  value       = var.aws_region
}

output "future_cluster_name" {
  description = "Planned future EKS cluster name."
  value       = var.cluster_name
}

output "iac_status" {
  description = "Current IaC maturity status."
  value       = "skeleton-only-no-cloud-resources-created"
}
