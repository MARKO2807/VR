# Form 404 and ERR_INTERNET_DISCONNECTED

## 1. `/.netlify/functions/submit-demo` → 404

**What it means:** The browser is calling your form handler, but Netlify doesn’t have that function deployed.

**Why it happens:** Netlify only deploys **serverless functions** when it builds from your **full repo** (Git or Netlify CLI). If you only upload the **`dist`** folder (e.g. drag-and-drop), the `netlify/functions/` folder never gets deployed, so the function URL returns 404.

**What to do:**

- **Deploy from Git (recommended)**  
  - Connect the site to your GitHub repo in Netlify.  
  - Netlify will run `npm run build`, publish `dist`, and deploy `netlify/functions/`.  
  - After the next push, the function will be live and the 404 will go away.

- **Or use Netlify CLI** (from the project root, not just uploading `dist`):  
  `npx netlify deploy --prod`  
  That deploys both the built site and the functions.

- Do **not** rely on drag-and-drop of only the `dist` folder if you want the form to work.

---

## 2. `net::ERR_INTERNET_DISCONNECTED`

**What it means:** Your machine lost internet (Wi‑Fi drop, no connection, etc.) at the moment of the request.

**Why it happens:** This is a **browser/network error**, not a bug in your code or Netlify. The request never reached the server.

**What to do:** Check your connection and try again. If it keeps happening, check your network or try another network.

---

## Summary

| Error | Cause | Fix |
|-------|--------|-----|
| 404 on `/.netlify/functions/submit-demo` | Function not deployed (e.g. only `dist` uploaded) | Deploy via **Git** or **Netlify CLI** so `netlify/functions/` is deployed. |
| `ERR_INTERNET_DISCONNECTED` | No internet on your device when submitting | Fix connection and resubmit. |
