# 🚀 AWS Deployment Guide for Next.js with API Routes

This guide shows you how to deploy your Next.js website with working contact form API routes to AWS.

---

## 🎯 **Recommended: AWS Amplify (Easiest)**

### **Why Amplify?**
- ✅ **Serverless** - handles API routes automatically
- ✅ **Easy setup** - connects to GitHub
- ✅ **Free tier** - 1000 build minutes/month
- ✅ **Supports Next.js** with full-stack features
- ✅ **Global CDN** - fast worldwide
- ✅ **SSL certificates** - automatic HTTPS

---

## 📋 **Step 1: Set Up AWS Amplify**

### **1.1 Create Amplify App**
1. Go to **AWS Console** → **Amplify**
2. Click **"Host web app"**
3. Choose **"GitHub"** as source
4. Authorize GitHub access
5. Select repository: `soleecloud/solecloud-website`
6. Click **"Next"**

### **1.2 Configure Build Settings**
Amplify will auto-detect Next.js, but you can customize:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### **1.3 Add Environment Variables**
In Amplify console → **Environment variables**, add:

| Variable | Value | Description |
|----------|-------|-------------|
| `EMAIL_USER` | `contact@solecloud.io` | Your email address |
| `EMAIL_PASSWORD` | `your-app-password` | Gmail App Password |

### **1.4 Deploy**
1. Click **"Save and deploy"**
2. Wait 5-10 minutes for deployment
3. Your site will be available at: `https://branch-name.d1234567890.amplifyapp.com`

---

## 🌐 **Step 2: Connect Custom Domain**

### **2.1 Add Domain**
1. In Amplify console → **Domain management**
2. Click **"Add domain"**
3. Enter: `solecloud.io`
4. Click **"Configure domain"**

### **2.2 Update DNS**
1. Amplify will show DNS records to add
2. Go to your domain registrar (Route53)
3. Add the CNAME records shown
4. Wait 24-48 hours for DNS propagation

---

## 🔄 **Step 3: Update Your Workflow**

### **3.1 Option A: Keep GitHub Actions (for S3 backup)**
- Keep current GitHub Actions workflow
- Deploy to both S3 (backup) and Amplify (main)

### **3.2 Option B: Use Amplify Only**
- Disable GitHub Actions
- Use Amplify's built-in CI/CD
- Automatic deployments on push to main

---

## 🛠️ **Alternative: Lambda + API Gateway (Advanced)**

If you want to keep S3 + add serverless API:

### **Step 1: Create Lambda Function**
```bash
# Create deployment package
cd lambda
npm init -y
npm install nodemailer
zip -r contact-function.zip .
```

### **Step 2: Deploy Lambda**
1. AWS Console → **Lambda** → **Create function**
2. Upload the zip file
3. Set environment variables
4. Create API Gateway trigger

### **Step 3: Update Contact Form**
```javascript
const response = await fetch("https://your-api-gateway-url/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
```

---

## 💰 **Cost Comparison**

### **AWS Amplify:**
- **Free tier**: 1000 build minutes/month
- **After free**: ~$0.01 per build minute
- **Bandwidth**: 15GB/month free

### **S3 + Lambda:**
- **S3**: ~$0.023/GB storage
- **Lambda**: 1M requests free/month
- **API Gateway**: 1M requests free/month

### **Current Setup (S3 + CloudFront):**
- **S3**: ~$0.023/GB storage
- **CloudFront**: 1TB transfer free/month

---

## 🎯 **My Recommendation**

**Go with AWS Amplify** because:

1. ✅ **Easiest setup** - 5 minutes
2. ✅ **API routes work** automatically
3. ✅ **Same features** as Vercel
4. ✅ **Stays on AWS** - your preferred platform
5. ✅ **Free tier** - perfect for your needs
6. ✅ **Easy scaling** - grows with your business

---

## 🚀 **Quick Start Commands**

### **Set up Amplify:**
```bash
# Install Amplify CLI (optional)
npm install -g @aws-amplify/cli

# Initialize Amplify (optional)
amplify init
amplify add hosting
amplify publish
```

### **Or just use AWS Console:**
1. Go to AWS Console → Amplify
2. Click "Host web app"
3. Connect GitHub
4. Select your repo
5. Deploy!

---

## 🔧 **Troubleshooting**

### **Build Fails:**
- Check Node.js version (use 18.x)
- Verify package.json dependencies
- Check build logs in Amplify console

### **API Routes Don't Work:**
- Ensure environment variables are set
- Check Lambda function logs
- Verify API Gateway configuration

### **Domain Not Working:**
- Wait 24-48 hours for DNS propagation
- Check CNAME records in Route53
- Verify SSL certificate status

---

## 📞 **Next Steps**

1. **Choose your approach** (I recommend Amplify)
2. **Set up the deployment**
3. **Test the contact form**
4. **Update DNS** for custom domain
5. **Monitor costs** and performance

---

**Ready to set up AWS Amplify? Let me know if you need help with any step!** 🚀






