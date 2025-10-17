# Free PostgreSQL Database Options for Students

Since you want to save your Azure credit, here are **FREE PostgreSQL** alternatives:

---

## 🏆 Recommended: Supabase (Best Free Option)

### Why Supabase?
- ✅ **FREE forever** (500MB database)
- ✅ PostgreSQL (your schema already works!)
- ✅ No credit card needed
- ✅ Built-in auth, storage, real-time
- ✅ Auto-backups
- ✅ Great for students

### Setup (5 minutes):

1. **Sign up:** [https://supabase.com](https://supabase.com)
   - Use GitHub login (fastest)

2. **Create Project:**
   - Click "New Project"
   - Organization: Your name
   - Name: `edutrack-pro`
   - Database Password: Generate strong password (SAVE IT!)
   - Region: **Mumbai / Singapore** (closest)
   - Plan: FREE
   - Click "Create new project" (takes 2 minutes)

3. **Get Connection String:**
   - Go to Project Settings → Database
   - Scroll to "Connection string"
   - Select **"URI"** tab
   - Copy the connection string:
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
   ```
   - Replace `[YOUR-PASSWORD]` with your database password

4. **Update `.env.local`:**
   ```bash
   DATABASE_URL="postgresql://postgres.xxxxx:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   
   # For migrations, use direct connection (remove ?pgbouncer=true):
   DIRECT_URL="postgresql://postgres.xxxxx:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"
   
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="c6d9c9c2e3e64d0cbe2b8f2f5a8a1d77"
   GEMINI_API_KEY="AIzaSyDFvQazTp1GSsRMl6AWI7rstoJH8oZRPsQ"
   ```

5. **Push Schema:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. **Test Locally:**
   ```bash
   pnpm dev
   # Visit http://localhost:3000
   ```

7. **Deploy to Azure Static Web Apps:**
   - Use same connection string in Azure env variables
   - FREE hosting + FREE database = $0/month! 🎉

---

## Alternative: Railway PostgreSQL

### Why Railway?
- ✅ $5/month credit (FREE for 500 hours/month)
- ✅ PostgreSQL
- ✅ Very easy setup
- ✅ Good for students

### Setup:
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. "New Project" → "Provision PostgreSQL"
4. Copy `DATABASE_URL` from Variables tab
5. Use in your `.env.local`

---

## Alternative: Neon PostgreSQL

### Why Neon?
- ✅ FREE tier (3GB storage)
- ✅ Serverless PostgreSQL
- ✅ Auto-scales to zero

### Setup:
1. Go to [neon.tech](https://neon.tech)
2. Sign up with GitHub
3. Create project → Copy connection string
4. Use in `.env.local`

---

## Cost Comparison

| Provider | Free Tier | Best For |
|----------|-----------|----------|
| **Supabase** | 500MB, unlimited projects | **BEST - Full features** |
| **Railway** | $5 credit (~500 hours/month) | Easy setup |
| **Neon** | 3GB storage | Larger databases |
| **MongoDB Atlas** | 512MB | If you want NoSQL |
| **Azure PostgreSQL** | $15/month (uses your $100 credit) | Production apps |

---

## 🎯 My Recommendation: Use Supabase

**Why:**
1. ✅ Truly free forever (no credit card)
2. ✅ PostgreSQL - your schema works as-is
3. ✅ 500MB is plenty for student projects
4. ✅ Built-in dashboard to view data
5. ✅ Can add Supabase Auth/Storage later if needed
6. ✅ Perfect for portfolios

**Setup time:** 5 minutes
**Cost:** $0/month forever

---

## Quick Start with Supabase

```bash
# 1. Sign up at supabase.com (use GitHub)
# 2. Create project, copy connection string
# 3. Update .env.local with DATABASE_URL
# 4. Run:

npx prisma generate
npx prisma db push
pnpm dev

# 5. Deploy to Azure Static Web Apps (FREE)
# 6. Done! $0/month total cost 🎉
```

---

## Next Steps

1. **Choose:** Supabase (recommended) or Railway/Neon
2. **Sign up** and create project (5 min)
3. **Copy DATABASE_URL** to `.env.local`
4. **Run** `npx prisma db push`
5. **Test** locally
6. **Deploy** to Azure Static Web Apps

**Result:** FREE hosting + FREE database = Perfect for students! 💚

Let me know which one you choose and I'll help with any issues!
