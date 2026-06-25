# Kubernetes Deployment Guide

## Prerequisites

Required:

- Docker Desktop
- Minikube
- kubectl

## Start Minikube

minikube start --driver=docker --cpus=2 --memory=3000

Update context:

minikube update-context
kubectl config use-context minikube

Verify:

kubectl get nodes

## Build images

docker build -t opsdesk-backend:k8s ./backend

docker build --build-arg VITE_API_BASE_URL=http://localhost:30081 -t opsdesk-frontend:k8s ./frontend

## Load images into Minikube

minikube image load opsdesk-backend:k8s
minikube image load opsdesk-frontend:k8s

## Deploy app stack

kubectl apply -k k8s/base

## Verify app stack

kubectl -n opsdesk get pods

Expected:

- backend 1/1 Running
- frontend 1/1 Running
- mongodb 1/1 Running

## Port forward

Backend:

kubectl -n opsdesk port-forward service/backend 30081:5000

Frontend:

kubectl -n opsdesk port-forward service/frontend 30080:80

## URLs

Frontend:

http://localhost:30080

Backend readiness:

http://localhost:30081/health/ready

## Troubleshooting

If kubectl cannot connect:

minikube status
minikube start --driver=docker --cpus=2 --memory=3000
minikube update-context
kubectl get nodes

If images are not found:

docker build -t opsdesk-backend:k8s ./backend
docker build --build-arg VITE_API_BASE_URL=http://localhost:30081 -t opsdesk-frontend:k8s ./frontend
minikube image load opsdesk-backend:k8s
minikube image load opsdesk-frontend:k8s
