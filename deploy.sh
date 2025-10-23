#!/bin/bash
# SoleCloud Website Deployment Script
# This script builds and deploys the Next.js website to AWS S3/CloudFront

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if terraform outputs are available
if [ ! -d "terraform/.terraform" ]; then
    echo -e "${RED}Error: Terraform not initialized. Please run 'cd terraform && terraform init && terraform apply' first.${NC}"
    exit 1
fi

echo -e "${GREEN}🚀 Starting SoleCloud Website Deployment${NC}"
echo "=========================================="

# Get Terraform outputs
cd terraform
BUCKET_NAME=$(terraform output -raw website_bucket_name 2>/dev/null)
DISTRIBUTION_ID=$(terraform output -raw cloudfront_distribution_id 2>/dev/null)
cd ..

if [ -z "$BUCKET_NAME" ] || [ -z "$DISTRIBUTION_ID" ]; then
    echo -e "${RED}Error: Could not retrieve Terraform outputs. Make sure infrastructure is deployed.${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Building Next.js application...${NC}"
npm run build

if [ ! -d "out" ]; then
    echo -e "${RED}Error: Build output directory 'out' not found. Make sure Next.js is configured for static export.${NC}"
    exit 1
fi

echo -e "${YELLOW}☁️  Uploading to S3 bucket: ${BUCKET_NAME}${NC}"
aws s3 sync out/ s3://${BUCKET_NAME} --delete --cache-control "public,max-age=31536000,immutable" --exclude "*.html" --exclude "*.json"

# Upload HTML and JSON files with shorter cache
aws s3 sync out/ s3://${BUCKET_NAME} --delete --cache-control "public,max-age=0,must-revalidate" --exclude "*" --include "*.html" --include "*.json"

echo -e "${YELLOW}🔄 Invalidating CloudFront cache...${NC}"
INVALIDATION_ID=$(aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths "/*" --query 'Invalidation.Id' --output text)

echo -e "${GREEN}✅ Deployment successful!${NC}"
echo "=========================================="
echo "S3 Bucket: ${BUCKET_NAME}"
echo "CloudFront Distribution: ${DISTRIBUTION_ID}"
echo "Invalidation ID: ${INVALIDATION_ID}"
echo ""
echo "Website URL: $(cd terraform && terraform output -raw website_url)"
echo ""
echo "⏳ Note: CloudFront invalidation may take 5-15 minutes to complete."
echo "Check status: aws cloudfront get-invalidation --distribution-id ${DISTRIBUTION_ID} --id ${INVALIDATION_ID}"




















