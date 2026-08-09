# Deployment script for Portfolio (Backend & Frontend)
# Usage: .\deploy.ps1 -ProjectID your-gcp-project-id

param (
    [Parameter(Mandatory=$true)]
    [string]$ProjectID,
    [string]$Region = "us-central1"
)

Write-Host "--- Starting Deployment to Cloud Run ---" -ForegroundColor Cyan

# 1. Deploy Backend
Write-Host "Step 1: Deploying Backend..." -ForegroundColor Yellow
cd backend
gcloud run deploy portfolio-backend `
    --source . `
    --project $ProjectID `
    --region $Region `
    --allow-unauthenticated `
    --set-env-vars "ALLOWED_ORIGINS=*,EMAIL_USER=ipiyush.2324@gmail.com,EMAIL_PASS=bzua idox xfsm aqxg"

if ($LASTEXITCODE -ne 0) { Write-Error "Backend deployment failed"; exit $LASTEXITCODE }

# Get Backend URL
$BACKEND_URL = gcloud run services describe portfolio-backend --project $ProjectID --region $Region --format 'value(status.url)'
Write-Host "Backend URL: $BACKEND_URL" -ForegroundColor Green

# 2. Deploy Frontend
Write-Host "Step 2: Deploying Frontend..." -ForegroundColor Yellow
cd ../frontend

# Build the image using Cloud Build and cloudbuild.yaml
gcloud builds submit --config cloudbuild.yaml --substitutions="_NEXT_PUBLIC_API_URL=$BACKEND_URL" . --project $ProjectID

if ($LASTEXITCODE -ne 0) { Write-Error "Frontend build failed"; exit $LASTEXITCODE }

# Deploy the image to Cloud Run
$IMAGE_NAME = "gcr.io/$ProjectID/portfolio-frontend"
gcloud run deploy portfolio-frontend `
    --image $IMAGE_NAME `
    --project $ProjectID `
    --region $Region `
    --allow-unauthenticated

if ($LASTEXITCODE -ne 0) { Write-Error "Frontend deployment failed"; exit $LASTEXITCODE }

$FRONTEND_URL = gcloud run services describe portfolio-frontend --project $ProjectID --region $Region --format 'value(status.url)'

Write-Host "--- Deployment Complete! ---" -ForegroundColor Cyan
Write-Host "Frontend URL: $FRONTEND_URL" -ForegroundColor Green
Write-Host "Backend URL: $BACKEND_URL" -ForegroundColor Green

cd ..
