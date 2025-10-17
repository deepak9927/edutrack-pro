# Cloud Deployment Guide for EduTrack Pro

## Option 1: Vercel (Recommended - Free Tier)

### Prerequisites
- GitHub account
- Vercel account (free at https://vercel.com)

### Step 1: Push to GitHub
```bash
# If you haven't initialized git yet:
git init
git add .
git commit -m "Initial commit - ready for deployment"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/edutrack-pro.git
git push -u origin main
```

### Step 2: Set Up Database (Vercel Postgres - Free Tier)
1. Go to https://vercel.com/dashboard
2. Click "Storage" → "Create Database" → "Postgres"
3. Select your project/create new
4. Copy the `DATABASE_URL` connection string

### Step 3: Deploy to Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure Environment Variables:
   ```
   DATABASE_URL=<your-vercel-postgres-url>
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=<generate-random-32-char-string>
   GEMINI_API_KEY=<your-api-key>
   ```
   
   **Generate NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

4. **Important Build Settings:**
   - Framework Preset: `Next.js`
   - Build Command: `prisma generate && pnpm build`
   - Install Command: `pnpm install`
   - Output Directory: `.next`

5. Click "Deploy"

### Step 4: Run Migrations
After deployment, open the Vercel project dashboard:
1. Go to Settings → Functions → Environment Variables
2. Verify `DATABASE_URL` is set
3. Go to the "Deployments" tab
4. Click on your deployment → "..." → "Redeploy"
5. Or use Vercel CLI:
   ```bash
   npm i -g vercel
   vercel login
   vercel env pull .env.production
   npx prisma migrate deploy
   ```

### Step 5: Test Your App
Visit `https://your-app-name.vercel.app` and test:
- Registration: `/auth/register`
- Login: `/auth/login`
- Wellness Analytics: `/wellness`

---

## Option 2: Railway (Alternative - Free $5/month credit)

### Quick Deploy
1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add Postgres plugin (free tier)
5. Set environment variables:
   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   NEXTAUTH_URL=${{RAILWAY_PUBLIC_DOMAIN}}
   NEXTAUTH_SECRET=<random-32-chars>
   ```
6. Deploy!

Railway auto-detects Next.js and runs builds correctly.

---

## Option 3: Render (Free Tier)

### Setup
1. Go to https://render.com
2. Create "New Web Service" from Git
3. Add PostgreSQL database (free tier)
4. Configure:
   - Build Command: `pnpm install && prisma generate && pnpm build`
   - Start Command: `pnpm start`
5. Add environment variables (same as above)
6. Deploy

---

## Environment Variables Reference

### Required for All Platforms
```bash
DATABASE_URL="postgresql://user:password@host:5432/dbname"
NEXTAUTH_URL="https://your-app-url.com"
NEXTAUTH_SECRET="<32-char-random-string>"
```

### Optional (for AI features)
```bash
GEMINI_API_KEY="your-gemini-key"
OPENAI_API_KEY="your-openai-key"
```

### Encoding Special Characters in DATABASE_URL
If your database password contains special characters, encode them:
- `@` → `%40`
- `:` → `%3A`
- `/` → `%2F`
- `#` → `%23`
- `?` → `%3F`

Example:
```
Password: Pass@123
Encoded: Pass%40123
Full URL: postgresql://user:Pass%40123@host:5432/db
```

---

## Post-Deployment Checklist

✅ Database connected (check logs for Prisma errors)  
✅ NextAuth session working (`/api/auth/session`)  
✅ Registration endpoint (`/api/auth/register`)  
✅ Login working  
✅ Wellness tracking enabled  
✅ Admin user created (run `pnpm create-admin` locally with production DB)

---

## Troubleshooting

### Build Fails: "Prisma Client not generated"
**Solution:** Ensure `postinstall` script in `package.json` runs `prisma generate`:
```json
"postinstall": "prisma generate"
```

### Database Connection Error
**Solution:** Check DATABASE_URL encoding and verify Postgres is accessible from deployment platform.

### NextAuth Session Issues
**Solution:** 
1. Verify `NEXTAUTH_URL` matches your actual deployment URL
2. Regenerate `NEXTAUTH_SECRET`
3. Check browser cookies aren't blocked

### 500 Error on API Routes
**Solution:** Check deployment logs:
- Vercel: Dashboard → Deployments → View Function Logs
- Railway: Project → Deployments → Logs
- Render: Dashboard → Logs

---

## Quick Deploy Button (Future)

Once pushed to GitHub, add this to your README:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/edutrack-pro)

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- Prisma Deploy Docs: https://www.prisma.io/docs/guides/deployment
