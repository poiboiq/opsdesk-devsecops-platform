# Local Deployment Guide

## Prerequisites

Required:

- Git
- Node.js
- npm
- Docker Desktop
- Docker Compose

## Run with Docker Compose

From repository root:

docker compose up --build

## Validate backend

Open:

http://localhost:5000/health/ready

Expected:

status ready
database connected

## Validate frontend

Open:

http://localhost:3000

Expected:

- dashboard loads
- backend readiness visible
- incident count visible

## Stop services

docker compose down

## Clean volumes if needed

docker compose down -v

Use volume deletion only when you intentionally want to reset MongoDB data.
