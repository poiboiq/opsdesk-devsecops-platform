# ArgoCD GitOps Runbook

## Purpose

This folder defines how ArgoCD can deploy OpsDesk from Git.

ArgoCD watches this GitHub repository and syncs Kubernetes manifests into the cluster.

## GitOps applications

### opsdesk-app

Deploys the core application stack from k8s/base.

This includes:

- opsdesk namespace
- backend
- frontend
- MongoDB
- services
- config
- local demo secret
- PVC

### opsdesk-monitoring

Deploys the monitoring stack from k8s/monitoring.

This includes:

- monitoring namespace
- Prometheus
- Grafana
- Grafana datasource provisioning
- Grafana dashboard provisioning

## ArgoCD project

The opsdesk AppProject restricts deployment to:

- opsdesk namespace
- monitoring namespace
- this GitHub repository only

## Important note

The files in argocd/ require ArgoCD CRDs to exist in the cluster.

If ArgoCD is not installed, this command will fail:

kubectl apply -k argocd

That is expected.

Install ArgoCD first, then apply these manifests.

## Apply after ArgoCD is installed

kubectl apply -k argocd

## Verify

kubectl -n argocd get applications

Expected applications:

- opsdesk-app
- opsdesk-monitoring

## Sync behavior

Both applications use automated sync:

- prune: true
- selfHeal: true

Meaning:

- If a manifest is removed from Git, ArgoCD removes it from the cluster.
- If someone manually changes the cluster, ArgoCD restores the Git version.

## Local-first note

This repo intentionally keeps ArgoCD manifests separate from ArgoCD installation.

The GitOps layer can be reviewed from GitHub without requiring ArgoCD to be installed locally.
