#!/bin/bash
# Terraform Setup Script for SoleCloud Website
# This script helps you set up and deploy the AWS infrastructure

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  SoleCloud Website - AWS Infrastructure   ║${NC}"
echo -e "${BLUE}║         Terraform Setup Script            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
echo ""

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v terraform &> /dev/null; then
    echo -e "${RED}❌ Terraform is not installed. Please install it from https://www.terraform.io/downloads${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Terraform installed: $(terraform version -json | jq -r '.terraform_version')${NC}"

if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it from https://aws.amazon.com/cli/${NC}"
    exit 1
fi
echo -e "${GREEN}✓ AWS CLI installed: $(aws --version)${NC}"

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS credentials not configured. Please run 'aws configure'${NC}"
    exit 1
fi
echo -e "${GREEN}✓ AWS credentials configured${NC}"
echo ""

# Check if terraform.tfvars exists
if [ ! -f "terraform.tfvars" ]; then
    echo -e "${YELLOW}⚠️  terraform.tfvars not found. Creating from example...${NC}"
    cp terraform.tfvars.example terraform.tfvars
    echo -e "${GREEN}✓ Created terraform.tfvars${NC}"
    echo ""
    echo -e "${YELLOW}Please edit terraform.tfvars and set your domain name:${NC}"
    echo -e "  ${BLUE}nano terraform.tfvars${NC}"
    echo ""
    read -p "Press Enter when you've configured terraform.tfvars..."
fi

# Read domain from terraform.tfvars
DOMAIN=$(grep '^domain_name' terraform.tfvars | cut -d'"' -f2)
if [ -z "$DOMAIN" ] || [ "$DOMAIN" == "your-domain.com" ]; then
    echo -e "${RED}❌ Please set your domain name in terraform.tfvars${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Domain configured: ${DOMAIN}${NC}"
echo ""

# Check if Route53 hosted zone exists
echo -e "${YELLOW}Checking Route53 hosted zone...${NC}"
ZONE_ID=$(aws route53 list-hosted-zones-by-name --dns-name "${DOMAIN}" --query "HostedZones[?Name=='${DOMAIN}.'].Id" --output text | cut -d'/' -f3)

if [ -z "$ZONE_ID" ]; then
    echo -e "${RED}❌ Route53 hosted zone not found for ${DOMAIN}${NC}"
    echo ""
    echo -e "${YELLOW}Creating Route53 hosted zone...${NC}"
    read -p "Do you want to create a hosted zone for ${DOMAIN}? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        ZONE_ID=$(aws route53 create-hosted-zone --name "${DOMAIN}" --caller-reference "$(date +%s)" --query 'HostedZone.Id' --output text | cut -d'/' -f3)
        echo -e "${GREEN}✓ Created hosted zone: ${ZONE_ID}${NC}"
        echo ""
        echo -e "${YELLOW}⚠️  IMPORTANT: Update your domain registrar's nameservers to:${NC}"
        aws route53 get-hosted-zone --id "${ZONE_ID}" --query 'DelegationSet.NameServers' --output table
        echo ""
        read -p "Press Enter when you've updated your nameservers..."
    else
        echo -e "${RED}Cannot proceed without a hosted zone. Exiting.${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ Found hosted zone: ${ZONE_ID}${NC}"
fi
echo ""

# Initialize Terraform
echo -e "${YELLOW}Initializing Terraform...${NC}"
terraform init
echo -e "${GREEN}✓ Terraform initialized${NC}"
echo ""

# Validate configuration
echo -e "${YELLOW}Validating Terraform configuration...${NC}"
terraform validate
echo -e "${GREEN}✓ Configuration is valid${NC}"
echo ""

# Show plan
echo -e "${YELLOW}Generating infrastructure plan...${NC}"
terraform plan -out=tfplan
echo ""

# Ask for confirmation
echo -e "${YELLOW}═══════════════════════════════════════════${NC}"
echo -e "${YELLOW}Review the plan above. This will create:${NC}"
echo -e "  • S3 bucket for website hosting"
echo -e "  • CloudFront distribution with SSL"
echo -e "  • ACM certificate"
echo -e "  • Route53 DNS records"
echo -e "  • S3 bucket for logs (optional)"
echo ""
echo -e "${YELLOW}Estimated monthly cost: \$5-20 USD${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════${NC}"
echo ""

read -p "Do you want to apply this infrastructure? (yes/no) " -r
echo ""

if [[ $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo -e "${GREEN}🚀 Deploying infrastructure...${NC}"
    terraform apply tfplan
    rm tfplan
    
    echo ""
    echo -e "${GREEN}╔════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║     Infrastructure deployed successfully!  ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════╝${NC}"
    echo ""
    
    # Show outputs
    echo -e "${BLUE}Terraform Outputs:${NC}"
    terraform output
    
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo -e "1. Build your Next.js application:"
    echo -e "   ${BLUE}cd .. && npm run build:aws${NC}"
    echo ""
    echo -e "2. Deploy to AWS:"
    echo -e "   ${BLUE}./deploy.sh${NC}"
    echo ""
    echo -e "3. Visit your website:"
    echo -e "   ${BLUE}$(terraform output -raw website_url)${NC}"
    echo ""
    echo -e "${GREEN}✨ All done! Your infrastructure is ready.${NC}"
else
    echo -e "${YELLOW}Deployment cancelled. Run this script again when ready.${NC}"
    rm -f tfplan
fi








