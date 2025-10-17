#!/bin/bash
# Quick Azure deployment script for EduTrack Pro
# This script helps set up Azure resources via CLI

set -e  # Exit on error

echo "🚀 EduTrack Pro - Azure Deployment Helper"
echo "=========================================="
echo ""

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI not found. Install it first:"
    echo "   curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash"
    exit 1
fi

# Check if logged in
if ! az account show &> /dev/null; then
    echo "🔑 Please login to Azure..."
    az login
fi

echo ""
echo "📋 Current Azure subscription:"
az account show --query "{Name:name, ID:id, State:state}" -o table
echo ""

read -p "Continue with this subscription? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# Configuration
RESOURCE_GROUP="edutrack-rg"
LOCATION="centralindia"
DB_NAME="edutrack-db-$(date +%s)"
DB_USER="edutrackadmin"
DB_PASSWORD="$(openssl rand -base64 16 | tr -d /=+ | cut -c1-16)Aa1!"

echo ""
echo "🔧 Configuration:"
echo "   Resource Group: $RESOURCE_GROUP"
echo "   Location: $LOCATION"
echo "   Database: $DB_NAME"
echo "   DB User: $DB_USER"
echo ""

# Create Resource Group
echo "📦 Creating resource group..."
az group create --name $RESOURCE_GROUP --location $LOCATION --output table

# Create PostgreSQL Database
echo ""
echo "🐘 Creating PostgreSQL database (this takes 5-10 minutes)..."
az postgres flexible-server create \
  --resource-group $RESOURCE_GROUP \
  --name $DB_NAME \
  --location $LOCATION \
  --admin-user $DB_USER \
  --admin-password "$DB_PASSWORD" \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --storage-size 32 \
  --version 14 \
  --public-access 0.0.0.0-255.255.255.255 \
  --output table

echo ""
echo "🔒 Configuring firewall..."
az postgres flexible-server firewall-rule create \
  --resource-group $RESOURCE_GROUP \
  --name $DB_NAME \
  --rule-name AllowAll \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 255.255.255.255 \
  --output table

# Get connection string
DB_HOST="${DB_NAME}.postgres.database.azure.com"
DB_CONNECTION="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/postgres?sslmode=require"

echo ""
echo "✅ Azure resources created successfully!"
echo ""
echo "=========================================="
echo "📝 SAVE THESE CREDENTIALS:"
echo "=========================================="
echo ""
echo "DATABASE_URL:"
echo "$DB_CONNECTION"
echo ""
echo "Database Password: $DB_PASSWORD"
echo ""
echo "=========================================="
echo "📋 NEXT STEPS:"
echo "=========================================="
echo ""
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Deploy to Azure'"
echo "   git push origin main"
echo ""
echo "2. Create Azure Static Web App:"
echo "   - Go to https://portal.azure.com"
echo "   - Create new Static Web App"
echo "   - Connect to your GitHub repo"
echo "   - Build preset: Next.js"
echo ""
echo "3. Add environment variables in Static Web App:"
echo "   DATABASE_URL=$DB_CONNECTION"
echo "   NEXTAUTH_URL=https://YOUR_APP.azurestaticapps.net"
echo "   NEXTAUTH_SECRET=$(openssl rand -base64 32)"
echo "   GEMINI_API_KEY=<your-key>"
echo ""
echo "4. Run Prisma migration:"
echo "   export DATABASE_URL='$DB_CONNECTION'"
echo "   npx prisma db push"
echo ""
echo "5. Test your app at the Static Web App URL!"
echo ""
echo "💰 Estimated cost: ~\$15/month (PostgreSQL only)"
echo "   Your \$100 credit will last ~6 months"
echo ""

# Save credentials to file
CREDS_FILE=".azure-credentials.txt"
cat > $CREDS_FILE << EOF
Azure Deployment Credentials
=============================
Created: $(date)

Resource Group: $RESOURCE_GROUP
Location: $LOCATION
Database Name: $DB_NAME
Database User: $DB_USER
Database Password: $DB_PASSWORD

DATABASE_URL:
$DB_CONNECTION

NEXTAUTH_SECRET (generate new):
$(openssl rand -base64 32)

Delete resource group when done:
az group delete --name $RESOURCE_GROUP --yes --no-wait
EOF

echo "💾 Credentials saved to: $CREDS_FILE"
echo "   ⚠️  Keep this file private! Add to .gitignore"
echo ""
