# Deploy to Netlify

## Option 1: Deploy from your computer (CLI)

1. **Build the site** (already done if you just ran it):
   ```bash
   npm run build
   ```

2. **Deploy with Netlify CLI** (you’re already logged in):
   ```bash
   npx netlify deploy --prod
   ```

3. When prompted:
   - **Publish directory:** press Enter (uses `dist` from `netlify.toml`)
   - If it asks to create a new site or link to one, choose as needed

4. Or use the script (build + deploy in one go):
   ```bash
   npm run deploy
   ```

---

## Option 2: Drag & drop (no CLI)

1. **Build the site:**
   ```bash
   npm run build
   ```

2. Open **https://app.netlify.com** and log in.

3. In the dashboard, find **“Sites”** and click **“Add new site”** → **“Deploy manually”**.

4. **Drag the `dist` folder** (inside `c:\Users\marko\Desktop\VR Web\dist`) onto the deploy area.

5. Netlify will publish the site and give you a URL (e.g. `random-name-123.netlify.app`).

---

## Option 3: Deploy from Git (for automatic deploys on push)

1. **Initialize Git and push to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. In **Netlify**: **Add new site** → **Import an existing project**.

3. Choose **GitHub** and select your repository.

4. Netlify will use `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

5. Click **Deploy**. Future pushes to `main` will trigger a new deploy.

---

## After deploy

- **Forms:** In Netlify go to **Forms** and you should see **demo-request**.
- **Custom domain:** Site settings → **Domain management** → add your domain.
- **HTTPS:** Enabled by default on Netlify.
