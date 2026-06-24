$ErrorActionPreference = "Stop"

$baseUrl = "http://localhost:5000"

Write-Host "Checking backend liveness..."
$live = Invoke-RestMethod -Uri "$baseUrl/health/live" -Method GET

if ($live.status -ne "alive") {
  throw "Liveness check failed"
}

Write-Host "Checking backend readiness..."
$ready = Invoke-RestMethod -Uri "$baseUrl/health/ready" -Method GET

if ($ready.status -ne "ready") {
  throw "Readiness check failed"
}

Write-Host "Checking incidents API..."
$incidents = Invoke-RestMethod -Uri "$baseUrl/api/incidents" -Method GET

if ($null -eq $incidents.count) {
  throw "Incidents API did not return count"
}

Write-Host "Smoke test passed."
