locals {
  name_prefix = "${var.project_name}-${var.environment}"

  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

# This file intentionally contains no active cloud resources yet.
#
# Phase 11 is an IaC skeleton only.
# It documents the future AWS/EKS design without creating paid resources.
#
# Future resources can be added here in controlled phases:
#
# 1. VPC and subnets
# 2. ECR repositories for backend/frontend images
# 3. EKS cluster and managed node groups
# 4. IAM roles and policies
# 5. AWS Load Balancer Controller
# 6. External Secrets / Secrets Manager integration
# 7. Route 53 and ACM certificate
#
# Do not run `terraform apply` until cost, region, credentials, and resource plan are reviewed.
