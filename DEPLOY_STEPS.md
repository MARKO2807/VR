# Steps to update the live site (new deploy)

## If your site is connected to GitHub on Netlify

Run these in the terminal (in your project folder):

```bash
# 1. Go to the project
cd "c:\Users\marko\Desktop\VR Web"

# 2. See what changed
git status

# 3. Stage all changes
git add .

# 4. Commit with a short message
git commit -m "Update site"

# 5. Push to GitHub (triggers Netlify deploy)
git push origin main
```

After step 5, Netlify will build and deploy. Wait 1–2 minutes, then check your live URL.

---

## If you deploy with Netlify CLI instead

```bash
cd "c:\Users\marko\Desktop\VR Web"
npm run deploy
```

(Log in with `npx netlify login` and link with `npx netlify link` if you haven’t already.)

---

## Quick one-liner (Git + Netlify connected)

```bash
cd "c:\Users\marko\Desktop\VR Web"; git add .; git commit -m "Update"; git push origin main
```
