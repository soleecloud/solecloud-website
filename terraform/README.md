# SoleCloud Website - Terraform Infrastructure

This directory contains Terraform configuration to deploy the SoleCloud website to AWS using S3, CloudFront, Route53, and ACM.

## Architecture

The infrastructure includes:
- **S3 Bucket**: Stores static website files
- **CloudFront**: CDN for global content delivery with HTTPS
- **Route53**: DNS management for your domain
- **ACM Certificate**: SSL/TLS certificate for HTTPS
- **S3 Logs Bucket**: Stores CloudFront access logs (optional)

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **AWS CLI** configured with credentials
3. **Terraform** (v1.0 or later) installed
4. **Domain name** registered and Route53 hosted zone created
5. **Next.js build** configured for static export

## Setup Instructions

### 1. Configure Terraform Variables

Copy the example variables file and update with your domain:

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars` with your values:

```hcl
domain_name     = "solecloud.com"
www_domain_name = "www.solecloud.com"
aws_region      = "us-east-1"
environment     = "production"
```

### 2. Configure Next.js for Static Export

Update your `next.config.js` to enable static export:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
```

### 3. Initialize Terraform

```bash
cd terraform
terraform init
```

### 4. Review the Infrastructure Plan

```bash
terraform plan
```

Review the resources that will be created.

### 5. Deploy the Infrastructure

```bash
terraform apply
```

Type `yes` when prompted to confirm.

**Note**: Certificate validation may take 5-10 minutes as DNS records are created and validated.

### 6. Build and Deploy Your Website

After Terraform completes, build and deploy your website:

```bash
# Go back to project root
cd ..

# Build the Next.js application
npm run build

# Sync to S3 (use the bucket name from Terraform output)
aws s3 sync out/ s3://your-domain.com --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

Replace `YOUR_DISTRIBUTION_ID` with the value from `terraform output cloudfront_distribution_id`.

## Terraform Outputs

After deployment, Terraform provides useful outputs:

```bash
terraform output
```

Key outputs:
- `website_url`: Your website URL
- `cloudfront_distribution_id`: CloudFront distribution ID
- `website_bucket_name`: S3 bucket name
- `deployment_commands`: Helpful deployment commands

## Updating Your Website

To update your website after making changes:

```bash
# Build the latest version
npm run build

# Sync to S3
aws s3 sync out/ s3://$(terraform output -raw website_bucket_name) --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id $(terraform output -raw cloudfront_distribution_id) \
  --paths "/*"
```

## Automation Script

For convenience, you can create a deployment script:

```bash
#!/bin/bash
# deploy.sh

set -e

echo "Building Next.js application..."
npm run build

echo "Deploying to S3..."
BUCKET=$(cd terraform && terraform output -raw website_bucket_name)
aws s3 sync out/ s3://$BUCKET --delete

echo "Invalidating CloudFront cache..."
DISTRIBUTION_ID=$(cd terraform && terraform output -raw cloudfront_distribution_id)
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "Deployment complete!"
echo "Website URL: $(cd terraform && terraform output -raw website_url)"
```

Make it executable:
```bash
chmod +x deploy.sh
./deploy.sh
```

## Cost Estimate

Approximate monthly costs (us-east-1):
- S3 Storage: ~$0.023 per GB
- CloudFront: First 10TB free tier, then ~$0.085 per GB
- Route53: $0.50 per hosted zone
- ACM Certificate: Free

For a typical website with moderate traffic: **$5-20/month**

## Security Best Practices

1. **Enable S3 Versioning**: Already enabled to recover from accidental deletions
2. **CloudFront HTTPS**: Enforced by default (redirect-to-https)
3. **Minimum TLS**: Set to TLSv1.2
4. **Access Logs**: Enable for security auditing
5. **IAM Policies**: Use least privilege access

## Troubleshooting

### Certificate Validation Fails
- Ensure your domain's nameservers point to Route53
- Check Route53 hosted zone contains validation records
- Wait 5-10 minutes for DNS propagation

### Website Not Loading
- Check CloudFront distribution status (must be "Deployed")
- Verify S3 bucket has files in correct structure
- Check CloudFront error rate in AWS Console

### 404 Errors
- Ensure `out/` directory has `index.html`
- CloudFront custom error response redirects 404 to index.html for SPA routing

### DNS Not Resolving
- Verify Route53 A/AAAA records point to CloudFront
- Check domain registrar nameservers match Route53

## Cleanup

To destroy all resources:

```bash
cd terraform
terraform destroy
```

**Warning**: This will delete all resources including S3 buckets and their contents.

## Remote State (Recommended for Production)

For production, use remote state with S3 backend:

1. Create an S3 bucket and DynamoDB table for state locking:

```bash
aws s3 mb s3://solecloud-terraform-state
aws dynamodb create-table \
  --table-name terraform-state-lock \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST
```

2. Uncomment the backend configuration in `main.tf`:

```hcl
backend "s3" {
  bucket         = "solecloud-terraform-state"
  key            = "solecloud-website/terraform.tfstate"
  region         = "us-east-1"
  encrypt        = true
  dynamodb_table = "terraform-state-lock"
}
```

3. Reinitialize Terraform:

```bash
terraform init -migrate-state
```

## Support

For issues or questions:
- Email: soleecloud@gmail.com
- Review AWS CloudWatch logs
- Check Terraform documentation: https://registry.terraform.io/providers/hashicorp/aws/latest/docs

## License

Proprietary - SoleCloud LLC © 2025




















