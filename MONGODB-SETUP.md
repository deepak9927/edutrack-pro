# MongoDB Atlas Setup Guide (Free Forever!)

This guide will help you set up MongoDB Atlas free tier for EduTrack Pro.

## Why MongoDB Atlas?
- ✅ **$0/month forever** (512MB free tier)
- ✅ No credit card needed for free tier
- ✅ Perfect for students and MVPs
- ✅ Auto-scaling when needed
- ✅ Built-in backups

---

## Step 1: Create MongoDB Atlas Account

1. Go to **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)**
2. Sign up with:
   - Email
   - Or GitHub (recommended - faster)
3. Complete the welcome survey (select "Learning MongoDB" if asked)

---

## Step 2: Create a Free Cluster

1. Click **"Build a Database"** or **"Create"**
2. Select **"M0 FREE"** tier (should be pre-selected)
3. Choose **Cloud Provider & Region:**
   - Provider: **AWS** or **Google Cloud**
   - Region: **Mumbai (ap-south-1)** (closest to India)
4. Cluster Name: `edutrack-cluster` (or keep default)
5. Click **"Create Deployment"**

---

## Step 3: Create Database User

1. You'll see a popup **"Security Quickstart"**
2. **Authentication Method:** Username and Password
3. Fill in:
   - Username: `edutrack_user`
   - Password: Click **"Autogenerate Secure Password"** → **SAVE IT!**
   - Or create your own strong password
4. Click **"Create Database User"**

---

## Step 4: Add Your IP Address

1. Still in Security Quickstart:
2. **"Where would you like to connect from?"**
3. Select **"My Local Environment"**
4. Click **"Add My Current IP Address"**
5. For development, also add:
   - **"Add IP Address"** → Enter `0.0.0.0/0` → Description: "Allow all (dev only)"
   - ⚠️ **Note:** In production, restrict this to specific IPs!
6. Click **"Finish and Close"**

---

## Step 5: Get Connection String

1. Click **"Connect"** on your cluster
2. Choose **"Drivers"**
3. Select:
   - Driver: **Node.js**
   - Version: **5.5 or later**
4. Copy the connection string:
   ```
   mongodb+srv://edutrack_user:<password>@edutrack-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Replace `<password>`** with your actual password from Step 3
6. **Add database name** before the `?`:
   ```
   mongodb+srv://edutrack_user:YOUR_PASSWORD@edutrack-cluster.xxxxx.mongodb.net/edutrack_pro?retryWrites=true&w=majority
   ```

---

## Step 6: Update Local Environment

Update your `.env.local`:

```bash
# MongoDB Atlas Connection
DATABASE_URL="mongodb+srv://edutrack_user:YOUR_PASSWORD@edutrack-cluster.xxxxx.mongodb.net/edutrack_pro?retryWrites=true&w=majority"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="c6d9c9c2e3e64d0cbe2b8f2f5a8a1d77"

# AI Keys
GEMINI_API_KEY="AIzaSyDFvQazTp1GSsRMl6AWI7rstoJH8oZRPsQ"
```

---

## Step 7: Generate Prisma Client & Push Schema

```bash
# Regenerate Prisma client for MongoDB
npx prisma generate

# Push schema to MongoDB
npx prisma db push

# Verify connection
npx prisma studio
```

---

## Step 8: Deploy to Azure Static Web Apps

1. **Create Azure Static Web App** (still FREE):
   - Go to [Azure Portal](https://portal.azure.com)
   - Create new **Static Web Apps**
   - Resource group: `edutrack-rg`
   - Name: `edutrack-pro`
   - Region: Central India
   - Source: **GitHub**
   - Repo: `deepak9927/edutrack-pro`
   - Branch: `main`
   - Build preset: **Next.js**
   - App location: `/`
   - Output location: `.next`

2. **Add Environment Variables** in Static Web App → Configuration:
   ```
   DATABASE_URL = mongodb+srv://edutrack_user:YOUR_PASSWORD@edutrack-cluster.xxxxx.mongodb.net/edutrack_pro?retryWrites=true&w=majority
   
   NEXTAUTH_URL = https://YOUR_APP_NAME.azurestaticapps.net
   
   NEXTAUTH_SECRET = (generate with: openssl rand -base64 32)
   
   GEMINI_API_KEY = AIzaSyDFvQazTp1GSsRMl6AWI7rstoJH8oZRPsQ
   ```

3. **Push schema to MongoDB** (one-time):
   ```bash
   # Use the MongoDB connection string
   export DATABASE_URL="mongodb+srv://..."
   npx prisma db push
   ```

4. **Done!** Your app deploys automatically from GitHub

---

## Free Tier Limits

MongoDB Atlas M0 Free Tier:
- ✅ 512 MB storage
- ✅ Shared RAM (512 MB - 2 GB)
- ✅ Shared vCPU
- ✅ 100 max connections
- ✅ No time limit - free forever!

**Should be plenty for:**
- Testing & Development
- Student projects
- Small MVPs
- 1000s of users

**Upgrade later if needed:** M10 tier starts at ~$9/month

---

## Total Cost Summary

| Service | Cost | Notes |
|---------|------|-------|
| **MongoDB Atlas** | **$0/month** | Free tier forever |
| **Azure Static Web Apps** | **$0/month** | Free tier |
| **Total** | **$0/month** | 🎉 |

**Your $100 Azure credit:** Fully saved for future features!

---

## Troubleshooting

### Connection Error: "Authentication failed"
- Double-check password in DATABASE_URL
- Ensure password is URL-encoded (special chars like `@` → `%40`)

### "IP not whitelisted"
- Go to Atlas → Network Access
- Add your current IP or `0.0.0.0/0` for dev

### "Database not found"
- Ensure you added `/edutrack_pro` before `?` in connection string
- Prisma will auto-create it on first push

### "Too many connections"
- Free tier has 100 max connections
- Use connection pooling (Prisma handles this automatically)

---

## Next Steps

1. Set up MongoDB Atlas (10 minutes)
2. Update `.env.local` with connection string
3. Run `npx prisma db push`
4. Test locally with `pnpm dev`
5. Deploy to Azure Static Web Apps
6. Enjoy free hosting! 🚀

---

**Questions?** Let me know and I'll help troubleshoot!
