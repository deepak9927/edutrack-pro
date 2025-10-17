# Azure Deployment Guide for EduTrack Pro

This guide will help you deploy your Next.js app to Azure using your $100 credit.

## Prerequisites

- Azure account with $100 credit
- Azure CLI installed (`az` command)
- GitHub repo for your code (for CI/CD)

## Deployment Options

### Option A: Azure Static Web Apps (Recommended - Easiest)

**Best for:** Quick deployment with built-in CI/CD from GitHub

1. **Push your code to GitHub** (if not already)
   ```bash
   git add .
   git commit -m "Prepare for Azure deployment"
   git push origin main
   ```

2. **Create Azure Static Web App via Portal**
   - Go to [Azure Portal](https://portal.azure.com)
   - Click "Create a resource" → Search "Static Web Apps"
   - Click "Create"
   - Fill in:
     - **Subscription:** Your subscription with credit
     - **Resource Group:** Create new (e.g., `edutrack-rg`)
     - **Name:** `edutrack-pro`
     - **Region:** Choose closest (e.g., Central India)
     - **Source:** GitHub
     - **Organization:** Your GitHub username
     - **Repository:** Your repo name
     - **Branch:** main
     - **Build Presets:** Next.js
     - **App location:** `/`
     - **Output location:** `.next`
   - Click "Review + Create" → "Create"

3. **Set up PostgreSQL Database**
   - In Azure Portal, create "Azure Database for PostgreSQL - Flexible Server"
   - Name: `edutrack-db`
   - Region: Same as your app
   - Compute + Storage: Burstable (B1ms - cheapest)
   - Admin username: `edutrackadmin`
   - Password: Create strong password
   - Networking: Allow Azure services access
   - Click "Create"

4. **Configure Environment Variables**
   - Go to your Static Web App → Configuration
   - Add these variables:
     ```
     DATABASE_URL=postgresql://edutrackadmin:YOUR_PASSWORD@edutrack-db.postgres.database.azure.com:5432/postgres?sslmode=require
     NEXTAUTH_URL=https://YOUR_APP.azurestaticapps.net
     NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
     GEMINI_API_KEY=<your key>
     ```

5. **Run Database Migrations**
   ```bash
   # Set DATABASE_URL temporarily
   export DATABASE_URL="postgresql://edutrackadmin:PASSWORD@edutrack-db.postgres.database.azure.com:5432/postgres?sslmode=require"
   
   # Push schema
   npx prisma db push
   ```

6. **Trigger Deployment**
   - Push to GitHub → Azure automatically deploys
   - Check deployment status in Azure Portal → Static Web Apps → Environments

---

### Option B: Azure App Service (More Control)

**Best for:** Production apps needing more resources and control

1. **Install Azure CLI**
   ```bash
   curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
   az login
   ```

2. **Create Resource Group**
   ```bash
   az group create --name edutrack-rg --location centralindia
   ```

3. **Create PostgreSQL Database**
   ```bash
   az postgres flexible-server create \
     --resource-group edutrack-rg \
     --name edutrack-db \
     --location centralindia \
     --admin-user edutrackadmin \
     --admin-password 'YourStrongPassword123!' \
     --sku-name Standard_B1ms \
     --tier Burstable \
     --storage-size 32 \
     --version 14
   
   # Allow Azure services
   az postgres flexible-server firewall-rule create \
     --resource-group edutrack-rg \
     --name edutrack-db \
     --rule-name AllowAzureServices \
     --start-ip-address 0.0.0.0 \
     --end-ip-address 0.0.0.0
   ```

4. **Create App Service Plan**
   ```bash
   az appservice plan create \
     --name edutrack-plan \
     --resource-group edutrack-rg \
     --location centralindia \
     --sku B1 \
     --is-linux
   ```

5. **Create Web App**
   ```bash
   az webapp create \
     --resource-group edutrack-rg \
     --plan edutrack-plan \
     --name edutrack-pro-app \
     --runtime "NODE:18-lts"
   ```

6. **Configure App Settings**
   ```bash
   az webapp config appsettings set \
     --resource-group edutrack-rg \
     --name edutrack-pro-app \
     --settings \
       DATABASE_URL="postgresql://edutrackadmin:YourStrongPassword123!@edutrack-db.postgres.database.azure.com:5432/postgres?sslmode=require" \
       NEXTAUTH_URL="https://edutrack-pro-app.azurewebsites.net" \
       NEXTAUTH_SECRET="$(openssl rand -base64 32)" \
       GEMINI_API_KEY="your-gemini-key"
   ```

7. **Deploy from GitHub**
   ```bash
   # Configure GitHub deployment
   az webapp deployment source config \
     --name edutrack-pro-app \
     --resource-group edutrack-rg \
     --repo-url https://github.com/YOUR_USERNAME/YOUR_REPO \
     --branch main \
     --manual-integration
   ```

8. **Run Migrations**
   ```bash
   # SSH into app or run locally with Azure DB connection
   DATABASE_URL="postgresql://..." npx prisma db push
   ```

---

### Option C: Azure Container Instances (Docker)

**Best for:** Containerized deployments

1. **Build and push Docker image**
   ```bash
   # Login to Azure Container Registry
   az acr create --resource-group edutrack-rg --name edutrackacr --sku Basic
   az acr login --name edutrackacr
   
   # Build and push
   docker build -t edutrackacr.azurecr.io/edutrack-pro:latest .
   docker push edutrackacr.azurecr.io/edutrack-pro:latest
   ```

2. **Deploy Container**
   ```bash
   az container create \
     --resource-group edutrack-rg \
     --name edutrack-container \
     --image edutrackacr.azurecr.io/edutrack-pro:latest \
     --dns-name-label edutrack-pro \
     --ports 3000 \
     --environment-variables \
       DATABASE_URL="postgresql://..." \
       NEXTAUTH_URL="http://edutrack-pro.centralindia.azurecontainer.io:3000" \
       NEXTAUTH_SECRET="your-secret"
   ```

---

## Cost Estimation with $100 Credit

**Option A (Static Web Apps + PostgreSQL):**
- Static Web Apps: $0/month (Free tier)
- PostgreSQL Flexible B1ms: ~$15/month
- **Total:** ~$15/month → **6 months with $100 credit**

**Option B (App Service + PostgreSQL):**
- App Service B1: ~$13/month
- PostgreSQL B1ms: ~$15/month
- **Total:** ~$28/month → **3.5 months with $100 credit**

**Option C (Container Instances):**
- Varies based on usage, typically $10-30/month

---

## Recommended: Start with Option A

**Why?**
- ✅ Easiest setup (GUI-based)
- ✅ Auto CI/CD from GitHub
- ✅ Free hosting (only pay for DB)
- ✅ Longest runtime with your credit
- ✅ Automatic HTTPS
- ✅ Global CDN

**Steps Summary:**
1. Push code to GitHub
2. Create Static Web App (5 min)
3. Create PostgreSQL DB (5 min)
4. Set env variables (2 min)
5. Run `prisma db push` (1 min)
6. Done! ✨

---

## Quick Setup Script (Option A)

I'll create an automated script for you...

```bash
#!/bin/bash
# azure-quick-deploy.sh
# Run this after creating Static Web App in portal

echo "Setting up Azure PostgreSQL..."
az postgres flexible-server create \
  --resource-group edutrack-rg \
  --name edutrack-db-$(date +%s) \
  --location centralindia \
  --admin-user edutrackadmin \
  --admin-password "$(openssl rand -base64 16)" \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --storage-size 32 \
  --version 14

echo "✅ Database created! Now:"
echo "1. Get connection string from Azure Portal"
echo "2. Add to Static Web App environment variables"
echo "3. Run: DATABASE_URL='...' npx prisma db push"
```

---

## Need Help?

- Azure Static Web Apps docs: https://learn.microsoft.com/en-us/azure/static-web-apps/
- Azure PostgreSQL docs: https://learn.microsoft.com/en-us/azure/postgresql/
- Your project already has Azure SDK packages installed, so integrations will work seamlessly!

**Next Step:** Push your code to GitHub, then follow Option A steps in Azure Portal. Takes ~15 minutes total.
