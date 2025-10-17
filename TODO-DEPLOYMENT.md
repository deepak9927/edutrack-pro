# 🚀 DEPLOYMENT TODO - Follow These Steps When Ready

**Time needed:** 20 minutes  
**Cost:** $0/month (100% FREE!)

---

## ✅ COMPLETED:
- [x] Code pushed to GitHub (repo: deepak9927/edutrack-pro)
- [x] Supabase database created
  - Project: edutrack-pro
  - Project ID: tumrwrqgpzqwljljxipo
  - Password: NDryJGxLpCyOunGx
  - Database URL configured in .env.local

---

## 📋 NEXT STEPS:

### STEP 1: Deploy to Azure (15 minutes)

1. **Go to:** https://portal.azure.com
2. **Sign in** with your Microsoft/Azure account
3. Click **"Create a resource"** (the + button)
4. Search for **"Static Web Apps"** → Click **"Create"**

**Fill in the form:**

**Basics:**
- Subscription: (select your subscription)
- Resource group: Click "Create new" → Type `edutrack-rg`
- Name: `edutrack-pro`
- Plan type: **Free** ⚡ (important!)
- Region: **Central India** (or closest)

**Deployment:**
- Source: **GitHub**
- Click "Sign in with GitHub" (authorize)
- Organization: `deepak9927`
- Repository: `edutrack-pro`
- Branch: `main`

**Build Details:**
- Build Presets: **Next.js**
- App location: `/`
- Api location: (leave empty)
- Output location: `.next`

5. Click **"Review + create"**
6. Click **"Create"**
7. Wait 2-3 minutes

---

### STEP 2: Get Your App URL

1. After creation, click **"Go to resource"**
2. In **Overview**, copy the **URL**
   - Will look like: `https://nice-ocean-abc123.azurestaticapps.net`
3. **SAVE THIS URL!** You need it for next step.

---

### STEP 3: Add Environment Variables (5 minutes)

1. In your Static Web App, click **"Configuration"** (left menu)
2. Click **"+ Add"** for each of these 4 variables:

**Variable 1:**
- Name: `DATABASE_URL`
- Value: `postgresql://postgres.tumrwrqgpzqwljljxipo:NDryJGxLpCyOunGx@aws-0-ap-south-1.pooler.supabase.com:6543/postgres`

**Variable 2:**
- Name: `NEXTAUTH_URL`
- Value: (paste your Azure app URL from Step 2)
- Example: `https://nice-ocean-abc123.azurestaticapps.net`
- ⚠️ NO trailing slash!

**Variable 3:**
- Name: `NEXTAUTH_SECRET`
- Value: Generate by running this in terminal:
  ```bash
  openssl rand -base64 32
  ```
  Copy the output and paste it here

**Variable 4:**
- Name: `GEMINI_API_KEY`
- Value: `AIzaSyDFvQazTp1GSsRMl6AWI7rstoJH8oZRPsQ`

3. Click **"Save"** at the top

---

### STEP 4: Push Schema to Database (2 minutes)

Run these commands in your terminal (one-time only):

```bash
# Set the DATABASE_URL (use the one from Supabase)
export DATABASE_URL="postgresql://postgres.tumrwrqgpzqwljljxipo:NDryJGxLpCyOunGx@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"

# Push schema to database
npx prisma db push
```

If you get "prisma not found", you can skip this - Azure will handle it automatically!

---

### STEP 5: Wait for Build & Test! (10 minutes)

1. In Azure, go to your Static Web App
2. Click **"Environments"** (left menu)
3. Click on **"main"**
4. Watch the build (takes 5-10 minutes)
5. Once it shows **"Succeeded"**, visit your app URL
6. **Test these:**
   - ✅ Home page loads
   - ✅ Register a new user
   - ✅ Login
   - ✅ Navigate around

---

## 🎉 DONE!

Your app will be live at: `https://your-app-name.azurestaticapps.net`

**Cost:** $0/month forever!

---

## 🐛 If Something Goes Wrong:

**Build fails:**
- Go to Environments → main → View logs
- Check for errors

**Can't login:**
- Check all 4 environment variables are correct
- Make sure NEXTAUTH_URL has NO trailing slash
- Try clearing browser cookies

**Database connection error:**
- Verify DATABASE_URL is correct in Configuration
- Check Supabase allows all IPs (it should by default)

---

## 📞 Need Help?

Check these files in your project:
- `DEPLOYMENT.md` - Full deployment guide
- `CLOUD-DEPLOYMENT-CHECKLIST.md` - Detailed checklist
- `FREE-DATABASE-OPTIONS.md` - Database info

---

## 🔐 Important Info (Save This!)

**Supabase:**
- Project: edutrack-pro
- Project ID: tumrwrqgpzqwljljxipo
- Password: NDryJGxLpCyOunGx
- URL: https://supabase.com/dashboard/project/tumrwrqgpzqwljljxipo

**GitHub:**
- Repo: https://github.com/deepak9927/edutrack-pro

**Azure:**
- Resource group: edutrack-rg
- App name: edutrack-pro
- Your app URL: (you'll get this in Step 2)

---

**Good luck! You've got this! 🚀**

When you're done, your full-stack app will be LIVE on the internet for FREE!
