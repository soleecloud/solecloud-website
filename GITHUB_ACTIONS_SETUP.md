# 🚀 GitHub Actions CI/CD Setup Guide

This guide will help you set up automated deployments to AWS using GitHub Actions.

---

## 📋 Overview

Once configured, every push to the `main` branch will automatically:
1. ✅ Build your Next.js application
2. ✅ Deploy to AWS S3
3. ✅ Invalidate CloudFront cache
4. ✅ Make your changes live within 5-15 minutes

---

## 🔐 Step 1: Configure GitHub Secrets

You need to add AWS credentials and configuration to your GitHub repository as secrets.

### 1.1 Navigate to Repository Settings

1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/solecloud-website`
2. Click **Settings** (top menu)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**

### 1.2 Add Required Secrets

Add the following secrets one by one:

#### **AWS_ACCESS_KEY_ID**
- **Value**: Your AWS access key ID
- Get this from: AWS Console → IAM → Users → Security credentials
- Or run: `aws configure get aws_access_key_id`

#### **AWS_SECRET_ACCESS_KEY**
- **Value**: Your AWS secret access key
- Get this from: AWS Console → IAM → Users → Security credentials
- Or run: `aws configure get aws_secret_access_key`

#### **AWS_REGION**
- **Value**: `us-east-1` (or your preferred region)
- This should match your Terraform configuration

#### **S3_BUCKET_NAME**
- **Value**: Your S3 bucket name (typically your domain name)
- Get this by running: `cd terraform && terraform output -raw website_bucket_name`
- Example: `solecloud.io` or `www.solecloud.io`

#### **CLOUDFRONT_DISTRIBUTION_ID**
- **Value**: Your CloudFront distribution ID
- Get this by running: `cd terraform && terraform output -raw cloudfront_distribution_id`
- Example: `E1A2B3C4D5E6F7`

---

## 🔍 Step 2: Get Your AWS Values

If you don't know your AWS values, run these commands:

```bash
# Get S3 bucket name
cd terraform
terraform output website_bucket_name

# Get CloudFront distribution ID
terraform output cloudfront_distribution_id

# Get AWS credentials
aws configure get aws_access_key_id
aws configure get aws_secret_access_key
aws configure get region
```

---

## ✅ Step 3: Verify Setup

### 3.1 Check GitHub Secrets
1. Go to: **Settings** → **Secrets and variables** → **Actions**
2. You should see 5 secrets:
   - ✅ AWS_ACCESS_KEY_ID
   - ✅ AWS_SECRET_ACCESS_KEY
   - ✅ AWS_REGION
   - ✅ S3_BUCKET_NAME
   - ✅ CLOUDFRONT_DISTRIBUTION_ID

### 3.2 Test the Workflow

**Option 1: Make a small change and push**
```bash
# Make a small change
echo "# Test" >> README.md

# Commit and push
git add .
git commit -m "test: Trigger GitHub Actions workflow"
git push origin main
```

**Option 2: Manually trigger from GitHub**
1. Go to **Actions** tab in your repository
2. Click **Deploy to AWS S3 & CloudFront** workflow
3. Click **Run workflow** → **Run workflow**

### 3.3 Monitor the Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You'll see your workflow running
3. Click on the workflow to see detailed logs
4. Wait for all steps to complete (usually 2-5 minutes)

---

## 🎯 Step 4: Your New Workflow

From now on, deployments are automatic:

```bash
# 1. Make your changes
# ... edit your files ...

# 2. Commit your changes
git add .
git commit -m "feat: Add new feature"

# 3. Push to GitHub
git push origin main

# 4. That's it! GitHub Actions handles the rest 🎉
```

You can watch the deployment progress in the **Actions** tab.

---

## 🛠️ Troubleshooting

### ❌ Build Fails

**Check the Actions logs:**
1. Go to **Actions** tab
2. Click on the failed workflow
3. Click on "Build Next.js application" to see error details

**Common issues:**
- Missing dependencies: Run `npm install` locally first
- Build errors: Fix with `npm run build` locally
- Type errors: Check TypeScript configuration

### ❌ AWS Authentication Fails

**Error:** "Unable to locate credentials"

**Solution:**
1. Verify all AWS secrets are set correctly in GitHub
2. Check that secret names match exactly (case-sensitive)
3. Verify AWS credentials are valid: `aws sts get-caller-identity`

### ❌ S3 Upload Fails

**Error:** "Access Denied" or "Bucket does not exist"

**Solution:**
1. Verify `S3_BUCKET_NAME` secret is correct
2. Check IAM user has S3 permissions
3. Verify bucket exists: `aws s3 ls s3://YOUR_BUCKET_NAME`

### ❌ CloudFront Invalidation Fails

**Error:** "Distribution not found"

**Solution:**
1. Verify `CLOUDFRONT_DISTRIBUTION_ID` is correct
2. Check IAM user has CloudFront permissions
3. Verify distribution exists: `aws cloudfront get-distribution --id YOUR_DISTRIBUTION_ID`

---

## 🔒 Security Best Practices

### ✅ Use Least Privilege IAM Policy

Create a dedicated IAM user for GitHub Actions with only required permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR_BUCKET_NAME",
        "arn:aws:s3:::YOUR_BUCKET_NAME/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation"
      ],
      "Resource": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
    }
  ]
}
```

### ✅ Rotate Credentials Regularly
- Rotate AWS access keys every 90 days
- Update GitHub secrets when credentials change

### ✅ Monitor Deployments
- Set up AWS CloudWatch alerts
- Review GitHub Actions logs regularly
- Monitor S3 and CloudFront costs

---

## 📊 Deployment Status Badge

Add this to your README.md to show deployment status:

```markdown
![Deployment Status](https://github.com/YOUR_USERNAME/solecloud-website/actions/workflows/deploy.yml/badge.svg)
```

---

## 🎨 Advanced Configuration

### Deploy to Staging Branch

To add staging environment, modify `.github/workflows/deploy.yml`:

```yaml
on:
  push:
    branches:
      - main      # Production
      - staging   # Staging
```

Then use different secrets for staging:
- `STAGING_S3_BUCKET_NAME`
- `STAGING_CLOUDFRONT_DISTRIBUTION_ID`

### Add Slack Notifications

Add this step to your workflow:

```yaml
- name: Notify Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### Add Email Notifications

GitHub automatically sends email notifications for failed workflows to your GitHub email.

---

## 📞 Support

### Useful Commands

```bash
# Check workflow status
gh workflow list

# View latest workflow run
gh run list --workflow=deploy.yml --limit 1

# View workflow logs
gh run view --log

# Re-run failed workflow
gh run rerun WORKFLOW_RUN_ID
```

### Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## ✅ Success Checklist

Once everything is set up, you should be able to:

- ✅ Push code to GitHub
- ✅ See workflow start automatically in Actions tab
- ✅ Watch build and deployment progress
- ✅ See website updates live within 5-15 minutes
- ✅ View deployment logs and status
- ✅ Roll back by reverting commits and pushing

---

## 🎉 You're All Set!

Your GitHub Actions CI/CD pipeline is ready. Every push to `main` will automatically deploy your website to AWS.

**Happy deploying! 🚀**

---

**Last Updated:** October 2024  
**Version:** 1.0  
**Workflow File:** `.github/workflows/deploy.yml`

