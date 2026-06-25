# OpsDesk DevSecOps Platform

OpsDesk is a full-stack DevSecOps platform built to demonstrate modern application delivery from local development to Kubernetes, CI/CD, security scanning, monitoring, GitOps, and future cloud infrastructure readiness.

The project is intentionally local-first to avoid cloud cost while still following production-grade engineering patterns.

## Project status

Current status: production-style portfolio build, local-first, cloud-ready skeleton.

Implemented:

- React frontend dashboard
- Node.js and Express backend API
- MongoDB persistence
- Docker Compose local stack
- Kubernetes manifests for Minikube
- Hardened Kubernetes security contexts
- GitHub Actions CI pipeline
- GitHub Actions security gates
- Prometheus metrics scraping
- Grafana dashboard provisioning
- Jenkins pipeline definition
- ArgoCD GitOps application manifests
- Terraform AWS skeleton for future EKS deployment

Not currently active:

- Real AWS/EKS resources
- Production DNS/TLS
- External secrets manager
- Public cloud deployment

## Architecture

High-level flow:

User browser
-> React frontend
-> Node/Express backend
-> MongoDB

Operational flow:

GitHub repository
-> GitHub Actions CI
-> Security Gates
-> Kubernetes manifests
-> Minikube runtime
-> Prometheus metrics
-> Grafana dashboards

GitOps-ready flow:

GitHub repository
-> ArgoCD Application manifests
-> Kubernetes sync target

Cloud-ready flow:

Terraform skeleton
-> future AWS VPC/ECR/EKS/IAM design

## Tech stack

Frontend:

- React
- Vite
- Nginx container runtime

Backend:

- Node.js
- Express
- Mongoose
- Prometheus client metrics

Database:

- MongoDB

DevOps:

- Docker
- Docker Compose
- Kubernetes
- Minikube
- Kustomize
- GitHub Actions
- Jenkins
- ArgoCD
- Terraform

Security:

- npm audit
- Gitleaks
- Trivy
- Kubernetes non-root containers
- read-only root filesystem
- dropped Linux capabilities
- seccomp RuntimeDefault

Monitoring:

- Prometheus
- Grafana
- Backend /metrics endpoint

## Repository structure

backend/                  Node.js Express API
frontend/                 React Vite dashboard
k8s/base/                 Core Kubernetes app stack
k8s/monitoring/           Prometheus and Grafana manifests
argocd/                   ArgoCD GitOps applications
infra/terraform/aws/      Future AWS/EKS IaC skeleton
.github/workflows/        CI and security workflows
docs/                     Project documentation
screenshots/              Demo screenshot checklist
Jenkinsfile               Jenkins pipeline definition
docker-compose.yml        Local full-stack runtime

## Local Docker Compose

Use Docker Compose for fast local validation.

Command:

docker compose up --build

Expected services:

- frontend on port 3000
- backend on port 5000
- MongoDB on port 27017

Backend health:

http://localhost:5000/health/ready

Frontend:

http://localhost:3000

## Kubernetes / Minikube

Build and load images:

docker build -t opsdesk-backend:k8s ./backend
docker build --build-arg VITE_API_BASE_URL=http://localhost:30081 -t opsdesk-frontend:k8s ./frontend
minikube image load opsdesk-backend:k8s
minikube image load opsdesk-frontend:k8s

Apply app stack:

kubectl apply -k k8s/base

Apply monitoring stack:

kubectl apply -k k8s/monitoring

Verify:

kubectl -n opsdesk get pods
kubectl -n monitoring get pods

Expected:

- backend 1/1 Running
- frontend 1/1 Running
- mongodb 1/1 Running
- prometheus 1/1 Running
- grafana 1/1 Running

## Port forwarding

Backend:

kubectl -n opsdesk port-forward service/backend 30081:5000

Frontend:

kubectl -n opsdesk port-forward service/frontend 30080:80

Prometheus:

kubectl -n monitoring port-forward service/prometheus 9090:9090

Grafana:

kubectl -n monitoring port-forward service/grafana 3001:3000

URLs:

- Frontend: http://localhost:30080
- Backend readiness: http://localhost:30081/health/ready
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001

## CI/CD

GitHub Actions workflows:

- OpsDesk CI
- OpsDesk Security Gates

OpsDesk CI validates:

- backend npm install
- backend syntax
- frontend npm install
- frontend production build
- backend Docker build
- frontend Docker build
- Kubernetes manifest rendering
- ArgoCD manifest rendering

Security Gates validate:

- backend npm audit
- frontend npm audit
- Gitleaks secret scan
- Trivy Kubernetes and GitOps config scan

## Jenkins

The repository includes a Jenkinsfile for enterprise CI/CD demonstration.

Jenkins stages:

- checkout
- backend install
- backend syntax check
- backend dependency audit
- frontend install
- frontend build
- frontend dependency audit
- Docker build
- Kubernetes manifest render
- optional Minikube deploy

See:

docs/jenkins-pipeline.md

## GitOps

The argocd/ directory contains:

- AppProject
- opsdesk app Application
- monitoring Application

These manifests require ArgoCD CRDs before applying.

After ArgoCD is installed:

kubectl apply -k argocd

See:

docs/argocd-gitops.md

## Terraform / IaC

The infra/terraform/aws directory contains a future AWS/EKS skeleton.

It intentionally creates no resources yet.

Do not run terraform apply until AWS cost, credentials, and target architecture are reviewed.

See:

infra/terraform/aws/README.md
docs/infrastructure-roadmap.md

## Portfolio value

This project demonstrates:

- full-stack application delivery
- containerization
- Kubernetes deployment
- CI/CD automation
- DevSecOps security gates
- observability
- GitOps readiness
- cloud infrastructure planning

## Author

Ali Zafar
OpsDesk DevSecOps Platform
