# Jenkins Pipeline Runbook

## Purpose

This Jenkins pipeline demonstrates an enterprise CI/CD workflow for OpsDesk DevSecOps Platform.

It complements GitHub Actions by showing how the same project can be validated and optionally deployed through Jenkins.

## Pipeline stages

1. Checkout source code
2. Install backend dependencies
3. Validate backend JavaScript syntax
4. Run backend dependency audit
5. Install frontend dependencies
6. Build frontend production assets
7. Run frontend dependency audit
8. Build backend and frontend Docker images
9. Render Kubernetes app and monitoring manifests
10. Optionally deploy to Minikube

## Required Jenkins environment

The Jenkins agent should have:

- Git
- Node.js 20 or newer
- npm
- Docker CLI with access to Docker daemon
- kubectl
- Minikube, only if using optional deploy stage

## Recommended Jenkins plugins

- Pipeline
- Git
- Docker Pipeline
- Workspace Cleanup

## Parameters

### DEPLOY_TO_MINIKUBE

Default: false

When disabled, the pipeline only validates the code, Docker builds, and Kubernetes manifests.

When enabled, the pipeline loads images into Minikube and applies:

- k8s/base
- k8s/monitoring

## Local-first deployment note

This project is designed to run locally first to avoid unnecessary cloud cost.

For cloud deployment, replace local image loading with registry push/pull and use a managed Kubernetes cluster such as EKS, AKS, or GKE.

## Expected success result

The Jenkins run should complete with:

- backend checks passed
- frontend build passed
- Docker images built
- Kubernetes manifests rendered
- optional Minikube rollout successful
