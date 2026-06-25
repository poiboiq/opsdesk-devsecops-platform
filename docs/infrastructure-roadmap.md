# Infrastructure Roadmap

## Current deployment model

OpsDesk currently runs locally using:

- Docker Compose
- Minikube Kubernetes
- GitHub Actions CI
- GitHub Actions Security Gates
- Prometheus and Grafana monitoring
- ArgoCD GitOps manifests
- Jenkins pipeline definition

## Current cloud-cost posture

The project is intentionally local-first.

No cloud infrastructure is created in the current repository state.

## Future AWS deployment path

### Stage 1: Container registry

Create ECR repositories:

- opsdesk-backend
- opsdesk-frontend

Pipeline changes:

- build Docker images
- tag images with commit SHA
- push images to ECR

### Stage 2: Network foundation

Create:

- VPC
- public subnets
- private subnets
- NAT gateway only if needed
- security groups

Cost warning:

- NAT Gateway can create monthly cost.
- For low-cost demos, avoid NAT Gateway if possible.

### Stage 3: Kubernetes foundation

Create:

- EKS cluster
- managed node group
- IAM roles
- OIDC provider

Cost warning:

- EKS control plane has ongoing hourly cost.
- Managed nodes also create EC2 cost.

### Stage 4: GitOps deployment

Install ArgoCD into EKS.

Then apply:

kubectl apply -k argocd

ArgoCD then syncs:

- k8s/base
- k8s/monitoring

### Stage 5: Production hardening

Add:

- external secrets
- TLS
- ingress controller
- autoscaling
- backup strategy
- centralized logs
- alerting rules
- cost limits

## Recommended demo strategy

Use local Minikube for live demo.

Use Terraform skeleton to show cloud-readiness.

Avoid real AWS/EKS until final deployment is required.
