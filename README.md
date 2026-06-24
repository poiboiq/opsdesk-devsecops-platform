# OpsDesk DevSecOps Platform

OpsDesk is a production-style three-tier incident management platform built to demonstrate modern DevOps, DevSecOps, GitOps, Kubernetes, observability, and cloud deployment practices.

## Architecture

- Frontend: React dashboard
- Backend: Node.js/Express API
- Database: MongoDB
- Local runtime: Docker Compose
- Kubernetes runtime: Minikube and AWS EKS
- CI/CD: Jenkins
- GitOps: ArgoCD
- Security: Trivy, Gitleaks, SonarQube, SBOM
- Observability: Prometheus, Grafana

## Cost Strategy

This project uses local-first development. AWS infrastructure is deployed on-demand for demos and destroyed after use to avoid unnecessary cloud cost.
