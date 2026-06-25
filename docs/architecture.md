# Architecture

## System overview

OpsDesk is a three-tier DevSecOps platform.

The runtime architecture contains:

1. Frontend
2. Backend API
3. MongoDB database
4. Monitoring stack
5. CI/CD and GitOps control plane definitions

## Application path

User browser
-> frontend service
-> React dashboard
-> backend service
-> Express API
-> MongoDB service
-> MongoDB persistent volume

## Metrics path

Backend exposes metrics at:

/metrics

Prometheus scrapes:

backend.opsdesk.svc.cluster.local:5000/metrics

Grafana reads from:

prometheus.monitoring.svc.cluster.local:9090

## Kubernetes namespaces

opsdesk namespace:

- backend
- frontend
- mongodb
- services
- configmap
- secret
- PVC

monitoring namespace:

- prometheus
- grafana
- provisioning config
- dashboard config

argocd namespace:

- AppProject
- Application definitions

## Security architecture

Kubernetes workloads are hardened with:

- runAsNonRoot
- allowPrivilegeEscalation false
- readOnlyRootFilesystem true
- capabilities drop ALL
- seccompProfile RuntimeDefault
- resource requests and limits

## Delivery architecture

GitHub Actions validates the repository on push and pull request.

Jenkinsfile demonstrates an enterprise CI/CD pipeline.

ArgoCD manifests define how Git can become the source of truth for cluster sync.

Terraform skeleton defines the future AWS/EKS infrastructure path without creating cloud resources.
