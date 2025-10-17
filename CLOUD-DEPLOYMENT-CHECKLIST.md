# Cloud Deployment Checklist

This guide shows you what to update when deploying to the cloud.

---

## 📋 Pre-Deployment Checklist

### ✅ Step 1: Choose Your Database (Pick ONE)

| Option | Cost | Setup Time | Link |
|--------|------|------------|------|
| **Supabase** (Recommended) | FREE | 5 min | [supabase.com](https://supabase.com) |
| **MongoDB Atlas** | FREE | 10 min | [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) |
| **Railway** | $5 credit | 3 min | [railway.app](https://railway.app) |
| **Azure PostgreSQL** | $15/month | 15 min | Uses your $100 credit |

**👉 Follow the guide:** `FREE-DATABASE-OPTIONS.md`

---

### ✅ Step 2: Get Your Database Connection String

After setting up your database, copy the connection string:

**Supabase:**
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**MongoDB Atlas:**
```
mongodb+srv://user:password@cluster.xxxxx.mongodb.net/edutrack_pro?retryWrites=true&w=majority
```

**Railway:**
```
postgresql://postgres:PASSWORD@containers-us-west-xx.railway.app:7432/railway
```

---

### ✅ Step 3: Update `.env.local` for Testing

Before deploying, test with your cloud database locally:

1. **Open `.env.local`**
2. **Replace `DATABASE_URL`** with your cloud database URL
3. **Update `NEXTAUTH_URL`** (keep `http://localhost:3000` for now)
4. **Test locally:**
   ```bash
   npx prisma generate
   npx prisma db push
   pnpm dev
   ```
5. **Try registering a user** at http://localhost:3000

---

### ✅ Step 4: Deploy to Azure Static Web Apps

#### 4.1 Create Static Web App

1. Go to [Azure Portal](https://portal.azure.com)
2. Click **"Create a resource"** → Search **"Static Web Apps"**
3. Fill in:
   - **Subscription:** Your Azure subscription
   - **Resource group:** Create new → `edutrack-rg`
   - **Name:** `edutrack-pro`
   - **Plan:** **Free** (Standard is $9/month)
   - **Region:** **Central India** (or closest)
   - **Source:** **GitHub**
   - Authorize GitHub
   - **Organization:** `deepak9927`
   - **Repository:** `edutrack-pro`
   - **Branch:** `main`
   - **Build Presets:** **Next.js**
   - **App location:** `/`
   - **Api location:** *(leave empty)*
   - **Output location:** `.next`
4. Click **"Review + Create"** → **"Create"**
5. Wait 2-3 minutes for deployment

#### 4.2 Get Your App URL

After creation, go to your Static Web App resource:
- **Overview** → Copy the URL (e.g., `https://nice-forest-0a1b2c3d4.azurestaticapps.net`)

---

### ✅ Step 5: Configure Environment Variables in Azure

1. In your Static Web App, go to **"Configuration"** (left menu)
2. Click **"+ Add"** for each variable:

#### Required Variables:

```bash
# 1. Database Connection
DATABASE_URL = <paste your Supabase/MongoDB/Railway connection string>

# 2. NextAuth URL (use your actual Azure app URL)
NEXTAUTH_URL = https://your-app-name.azurestaticapps.net

# 3. NextAuth Secret (generate new for production!)
NEXTAUTH_SECRET = <run: openssl rand -base64 32>

# 4. AI API Key
GEMINI_API_KEY = AIzaSyDFvQazTp1GSsRMl6AWI7rstoJH8oZRPsQ
```

#### Example:

```
DATABASE_URL = postgresql://postgres.abc123xyz:MyPass123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true

NEXTAUTH_URL = https://nice-forest-0a1b2c3d4.azurestaticapps.net

NEXTAUTH_SECRET = xK9mL4pQ8wR2tY7vN3cZ6bM1aS5dF0gH

GEMINI_API_KEY = AIzaSyDFvQazTp1GSsRMl6AWI7rstoJH8oZRPsQ
```

3. Click **"Save"**

---

### ✅ Step 6: Push Schema to Cloud Database (One-Time)

Run this ONCE from your local machine:

```bash
# Set the cloud DATABASE_URL temporarily
export DATABASE_URL="<your-cloud-database-url>"

# Push schema
npx prisma db push

# Verify
npx prisma studio
```

---

### ✅ Step 7: Trigger Deployment

Azure auto-deploys when you push to GitHub:

```bash
git add .
git commit -m "Configure for cloud deployment"
git push origin main
```

**Check deployment status:**
- Go to your Static Web App → **"Environments"** → Click on **"main"**
- Wait for build to complete (~5-10 minutes)

---

### ✅ Step 8: Test Your Live App!

1. Visit your app URL: `https://your-app-name.azurestaticapps.net`
2. Try:
   - ✅ Register a new user
   - ✅ Login
   - ✅ Navigate around
   - ✅ Test wellness features

---

## 🔒 Security Checklist

Before going live:

- [ ] Generate NEW `NEXTAUTH_SECRET` (don't reuse local one)
- [ ] Use strong database password
- [ ] Don't commit `.env.local` to Git (already in `.gitignore`)
- [ ] Restrict database IP whitelist (production)
- [ ] Enable 2FA on your Azure/GitHub accounts

---

## 📊 Cost Summary

| Service | Cost | Notes |
|---------|------|-------|
| **Supabase Database** | $0/month | 500MB free forever |
| **Azure Static Web Apps** | $0/month | Free tier |
| **Total** | **$0/month** | 🎉 |

---

## 🐛 Troubleshooting

### Build Fails on Azure

**Error:** `prisma generate failed`
- **Fix:** Ensure `postinstall` script in `package.json` runs `prisma generate`
- Your package.json already has this ✅

### "Database connection failed"

- **Check:** DATABASE_URL is correct in Azure Configuration
- **Check:** Database allows connections from Azure IPs (0.0.0.0/0 for dev)
- **Check:** Password is URL-encoded (e.g., `@` → `%40`)

### "NextAuth session not found"

- **Check:** `NEXTAUTH_URL` matches your actual app URL (no trailing slash)
- **Check:** `NEXTAUTH_SECRET` is set
- **Fix:** Clear browser cookies and try again

### App shows blank page

- **Check:** Build logs in Azure (Environments → main → View logs)
- **Check:** All environment variables are set
- **Try:** Redeploy: Settings → "Manage deployment token" → Re-link GitHub

---

## 🎯 Quick Reference

**Local Development:**
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/edutrack_pro"
NEXTAUTH_URL="http://localhost:3000"
```

**Cloud Production:**
```bash
DATABASE_URL="<supabase-or-mongo-url>"
NEXTAUTH_URL="https://your-app.azurestaticapps.net"
NEXTAUTH_SECRET="<generate-new-secret>"
```

---

## 📚 Helpful Commands

```bash
# Test cloud database locally
export DATABASE_URL="<cloud-url>"
npx prisma db push
pnpm dev

# Generate new NextAuth secret
openssl rand -base64 32

# View database in GUI
npx prisma studio

# Check build locally (simulates Azure build)
pnpm build

# Deploy to GitHub (triggers Azure build)
git push origin main
```

---

## ✅ Final Checklist

Before marking as "deployed":

- [ ] Database created (Supabase/MongoDB/Railway)
- [ ] Azure Static Web App created
- [ ] All environment variables configured in Azure
- [ ] Schema pushed to cloud database (`prisma db push`)
- [ ] Code pushed to GitHub
- [ ] Azure build completed successfully
- [ ] Live app tested (register, login, features work)
- [ ] Custom domain configured (optional)

---

**🎉 Once complete, your app is LIVE at:**
`https://your-app-name.azurestaticapps.net`

**Total setup time:** ~30 minutes  
**Total cost:** $0/month with free tiers

---

Need help? Check:
- `FREE-DATABASE-OPTIONS.md` - Database setup
- `azure-deploy.md` - Detailed Azure guide
- `MONGODB-SETUP.md` - MongoDB-specific guide

Let me know if you hit any issues! 🚀
