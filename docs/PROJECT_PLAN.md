# OpsDesk Project Plan

## Objective

Build a production-style three-tier DevSecOps platform for learning, portfolio proof, and hiring preparation.

## Core Application

OpsDesk will be an incident management platform for DevOps teams.

Main features:
- Create incidents
- Assign severity levels: P1, P2, P3
- Track status: open, investigating, resolved
- Store data in MongoDB
- Expose health and metrics endpoints

## DevOps Scope

- Docker and Docker Compose for local runtime
- Kubernetes manifests for Minikube and EKS
- Jenkins CI/CD pipeline
- ArgoCD GitOps deployment
- Terraform infrastructure provisioning
- Prometheus and Grafana observability
- Trivy, Gitleaks, SonarQube, and SBOM security checks

## Cost Strategy

AWS infrastructure will be deployed only on demand for demos and destroyed afterward.
