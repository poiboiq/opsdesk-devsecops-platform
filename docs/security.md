# Security Guide

## Security gates

The repository includes GitHub Actions security gates.

Security workflow:

.github/workflows/security.yml

Checks:

- backend npm audit
- frontend npm audit
- Gitleaks secret scan
- Trivy Kubernetes and GitOps config scan

## Dependency scanning

Backend and frontend are checked with:

npm audit --audit-level=high

The workflow fails on high or critical dependency vulnerabilities.

## Secret scanning

Gitleaks scans the full Git history for secrets.

This helps detect:

- API keys
- passwords
- tokens
- credentials
- private keys

## Kubernetes security scanning

Trivy scans rendered manifests from:

- k8s/base
- k8s/monitoring
- argocd

## Kubernetes workload hardening

Workloads use:

- runAsNonRoot
- allowPrivilegeEscalation false
- readOnlyRootFilesystem true
- capabilities drop ALL
- seccompProfile RuntimeDefault
- resource requests
- resource limits

## Secret note

The k8s/base/secret.yaml file contains local demo credentials only.

Do not store real production secrets in Kubernetes YAML.

For production, use:

- External Secrets Operator
- AWS Secrets Manager
- sealed secrets
- cloud-native secret manager
