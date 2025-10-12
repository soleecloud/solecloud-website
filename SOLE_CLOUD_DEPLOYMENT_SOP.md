# 📋 **SoleCloud Website Deployment SOP**
## **Standard Operating Procedure for AWS Deployment**

---

## **🎯 Overview**
This SOP provides step-by-step instructions for deploying a Next.js website to AWS using Terraform infrastructure as code. The process creates a production-ready website with S3 hosting, CloudFront CDN, SSL certificates, and Route53 DNS management.

---

## **📋 Prerequisites**

### **Required Tools:**
- Node.js (v18+)
- npm or yarn
- AWS CLI
- Terraform
- Git
- Code editor (VS Code recommended)

### **Required AWS Resources:**
- AWS Account with billing enabled
- Route53 hosted zone for your domain
- IAM user with appropriate permissions

---

## **🔧 Step 1: Environment Setup**

### **1.1 Install Required Tools**
```bash
# Install Node.js (if not already installed)
# Download from https://nodejs.org/

# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Install Terraform
wget https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_linux_amd64.zip
unzip terraform_1.6.0_linux_amd64.zip
sudo mv terraform /usr/local/bin/
```

### **1.2 Clone Repository**
```bash
git clone <repository-url>
cd solecloud-website
```

### **1.3 Install Dependencies**
```bash
npm install
```

---

## **🔐 Step 2: AWS Credentials Setup**

### **2.1 Create IAM User**
1. Go to AWS Console → IAM → Users
2. Click "Create user"
3. Username: `solecloud-deployment`
4. Select "Attach policies directly"
5. Attach these policies:
   - `AmazonS3FullAccess`
   - `CloudFrontFullAccess`
   - `AmazonRoute53FullAccess`
   - `AWSCertificateManagerFullAccess`
   - `IAMReadOnlyAccess`

### **2.2 Create Access Keys**
1. Go to Security credentials tab
2. Click "Create access key"
3. Select "Command Line Interface (CLI)"
4. Download credentials

### **2.3 Configure AWS CLI**
```bash
aws configure
# Enter Access Key ID
# Enter Secret Access Key
# Default region: us-east-1
# Default output format: json
```

### **2.4 Test Credentials**
```bash
aws sts get-caller-identity
```

---

## **🏗️ Step 3: Terraform Infrastructure Setup**

### **3.1 Configure Domain Variables**
```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars`:
```hcl
# Replace with your actual domain
domain_name = "yourdomain.com"
www_domain_name = "www.yourdomain.com"
aws_region = "us-east-1"
environment = "production"
```

### **3.2 Initialize Terraform**
```bash
terraform init
```

### **3.3 Plan Infrastructure**
```bash
terraform plan
```

### **3.4 Deploy Infrastructure**
```bash
terraform apply
# Type 'yes' when prompted
```

**Expected Output:**
- S3 bucket for website files
- CloudFront distribution
- SSL certificate
- Route53 DNS records
- Logging bucket

---

## **📦 Step 4: Website Build & Deployment**

### **4.1 Configure Next.js for Static Export**
Create `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: 'canvas' }];
    if (!config.resolve.fallback) {
      config.resolve.fallback = {};
    }
    config.resolve.fallback.fs = false;
    config.resolve.fallback.net = false;
    config.resolve.fallback.tls = false;
    return config;
  },
  serverExternalPackages: ['three', 'vanta'],
};

module.exports = nextConfig;
```

### **4.2 Build Website**
```bash
cd .. # Return to project root
npm run build
```

### **4.3 Deploy to S3**
```bash
# Get bucket name from Terraform output
aws s3 sync out/ s3://yourdomain.com --delete
```

### **4.4 Invalidate CloudFront Cache**
```bash
# Get distribution ID from Terraform output
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

---

## **✅ Step 5: Verification**

### **5.1 Check Website Accessibility**
- Visit `https://yourdomain.com`
- Verify SSL certificate is valid
- Test all pages load correctly
- Check mobile responsiveness

### **5.2 Verify Infrastructure**
```bash
# Check S3 bucket contents
aws s3 ls s3://yourdomain.com

# Check CloudFront distribution status
aws cloudfront get-distribution --id YOUR_DISTRIBUTION_ID
```

---

## **🔄 Step 6: Future Deployments**

### **6.1 Development Workflow**
```bash
# 1. Make changes to code
# 2. Test locally
npm run dev

# 3. Build for production
npm run build

# 4. Deploy to AWS
aws s3 sync out/ s3://yourdomain.com --delete
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### **6.2 Automated Deployment Script**
Create `deploy.sh`:
```bash
#!/bin/bash
echo "Building website..."
npm run build

echo "Deploying to S3..."
aws s3 sync out/ s3://yourdomain.com --delete

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"

echo "Deployment complete!"
```

Make executable:
```bash
chmod +x deploy.sh
```

---

## **🛠️ Step 7: Troubleshooting**

### **7.1 Common Issues**

**Build Errors:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**S3 Sync Issues:**
```bash
# Check AWS credentials
aws sts get-caller-identity

# Check bucket permissions
aws s3 ls s3://yourdomain.com
```

**CloudFront Issues:**
```bash
# Check distribution status
aws cloudfront get-distribution --id YOUR_DISTRIBUTION_ID

# Check invalidation status
aws cloudfront get-invalidation --distribution-id YOUR_DISTRIBUTION_ID --id INVALIDATION_ID
```

### **7.2 Rollback Procedure**
```bash
# Revert to previous version
git checkout HEAD~1
npm run build
aws s3 sync out/ s3://yourdomain.com --delete
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

---

## **📊 Step 8: Monitoring & Maintenance**

### **8.1 Cost Monitoring**
- Monitor S3 storage costs
- Check CloudFront data transfer costs
- Review Route53 query costs

### **8.2 Performance Monitoring**
- Use CloudFront analytics
- Monitor S3 access logs
- Check SSL certificate expiration

### **8.3 Security Updates**
- Keep dependencies updated
- Monitor for security vulnerabilities
- Rotate AWS access keys regularly

---

## **📞 Support & Resources**

### **Documentation:**
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)

### **Emergency Contacts:**
- AWS Support: [AWS Support Center](https://console.aws.amazon.com/support/)
- Terraform Issues: [Terraform Documentation](https://developer.hashicorp.com/terraform)

---

## **🎯 Success Criteria**

✅ Website loads at custom domain  
✅ SSL certificate is valid  
✅ All pages are accessible  
✅ Mobile responsive design  
✅ Fast loading times  
✅ CloudFront CDN active  
✅ S3 bucket properly configured  

---

## **📝 Quick Reference Commands**

### **Development:**
```bash
npm run dev                    # Start development server
npm run build                  # Build for production
npm run build:aws             # Build with AWS config
```

### **Deployment:**
```bash
aws s3 sync out/ s3://yourdomain.com --delete
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### **Infrastructure:**
```bash
terraform plan                 # Preview changes
terraform apply                # Apply changes
terraform destroy              # Destroy infrastructure
```

### **Monitoring:**
```bash
aws s3 ls s3://yourdomain.com
aws cloudfront get-distribution --id YOUR_DISTRIBUTION_ID
```

---

**📝 Note:** This SOP assumes a Next.js application with static export capabilities. Adjust build commands and configurations based on your specific framework requirements.

**Last Updated:** October 2024  
**Version:** 1.0  
**Author:** SoleCloud Team







