# Monitoring Guide

## Purpose

OpsDesk includes Prometheus and Grafana for local Kubernetes observability.

## Components

Prometheus:

- scrapes backend metrics
- stores time-series metrics locally

Grafana:

- reads metrics from Prometheus
- provisions a default OpsDesk dashboard

## Deploy monitoring

kubectl apply -k k8s/monitoring

## Verify

kubectl -n monitoring get pods

Expected:

- prometheus 1/1 Running
- grafana 1/1 Running

## Port forward

Prometheus:

kubectl -n monitoring port-forward service/prometheus 9090:9090

Grafana:

kubectl -n monitoring port-forward service/grafana 3001:3000

## URLs

Prometheus:

http://localhost:9090

Grafana:

http://localhost:3001

## Prometheus target check

In Prometheus:

Status -> Target health

Expected targets:

- prometheus UP
- opsdesk-backend UP

Query:

up{job="opsdesk-backend"}

Expected value:

1

## Grafana dashboard

Open Grafana and check:

Dashboards -> OpsDesk -> OpsDesk Platform Overview

Expected panels:

- OpsDesk Backend Up
- Backend Memory
- Backend CPU Rate
