# OpsDesk AWS Terraform Skeleton

## Purpose

This directory contains the future AWS infrastructure skeleton for OpsDesk DevSecOps Platform.

It is intentionally safe by default:

- no active AWS resources
- no terraform apply required
- no cloud cost
- no credentials committed

## Current status

skeleton-only-no-cloud-resources-created

## Planned future cloud architecture

The future AWS deployment can include:

1. VPC with public and private subnets
2. ECR repositories for backend and frontend images
3. EKS cluster with managed node groups
4. IAM roles and least-privilege policies
5. AWS Load Balancer Controller
6. Secrets Manager or External Secrets integration
7. Route 53 DNS and ACM TLS certificates
8. ArgoCD syncing Kubernetes manifests to EKS
9. Prometheus/Grafana observability

## Safe validation commands

Only run these after Terraform is installed:

terraform fmt -check -recursive
terraform init
terraform validate

## Do not run apply yet

Do not run:

terraform apply

until cost, AWS account, credentials, and resource plan are reviewed.

## Example variables

When ready to test locally:

Copy-Item terraform.tfvars.example terraform.tfvars

The real terraform.tfvars file should stay uncommitted.
