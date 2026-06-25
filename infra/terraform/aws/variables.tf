variable "project_name" {
  description = "Name of the project used for tagging and naming cloud resources."
  type        = string
  default     = "opsdesk"
}

variable "environment" {
  description = "Deployment environment name."
  type        = string
  default     = "dev"
}

variable "aws_region" {
  description = "AWS region where future infrastructure would be deployed."
  type        = string
  default     = "eu-north-1"
}

variable "cluster_name" {
  description = "Future EKS cluster name."
  type        = string
  default     = "opsdesk-dev"
}

variable "vpc_cidr" {
  description = "Future VPC CIDR block."
  type        = string
  default     = "10.40.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "Future public subnet CIDR blocks."
  type        = list(string)
  default     = ["10.40.1.0/24", "10.40.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "Future private subnet CIDR blocks."
  type        = list(string)
  default     = ["10.40.11.0/24", "10.40.12.0/24"]
}
