# Deployment Guide

Your portfolio is production-ready and can be deployed in minutes. Here are the recommended deployment options.

## Option 1: GitHub Pages (Recommended - Free)

GitHub Pages is perfect for static portfolios and is completely free.

### Steps:

1. **Create a GitHub Repository**
   ```bash
   # In your Website directory
   git init
   git add .
   git commit -m "Initial commit: Production-ready portfolio"
   ```

2. **Push to GitHub**
   ```bash
   # Create a new repo on GitHub named "portfolio" or your-username.github.io
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Under "Folder", select **/ (root)**
   - Click **Save**
   - Wait 1-2 minutes for deployment

4. **Access Your Site**
   - Your site will be live at: `https://yourusername.github.io/your-repo-name/`
   - Or if repo is named `yourusername.github.io`: `https://yourusername.github.io/`

### Custom Domain (Optional)
- Add a file named `CNAME` with your domain (already exists if you have one)
- Configure DNS with your domain provider
- Enable HTTPS in GitHub Pages settings

---

## Option 2: Netlify (Excellent for Quick Deploys)

### Method A: Drag and Drop (Fastest)

1. Go to [netlify.com](https://www.netlify.com/)
2. Sign up (free account)
3. Drag the entire `public` folder to the deploy zone
4. Done! Your site is live

### Method B: Git Integration (Better for Updates)

1. Push your code to GitHub (see Option 1, steps 1-2)
2. Go to [app.netlify.com](https://app.netlify.com/)
3. Click "New site from Git"
4. Connect to GitHub
5. Select your repository
6. Configure:
   - **Base directory**: leave empty or set to `public`
   - **Build command**: leave empty (no build needed)
   - **Publish directory**: `public` or `.` (root)
7. Click "Deploy site"

Your site gets:
- Free HTTPS
- Custom domain support
- Automatic deploys on git push
- Form handling (if you add forms later)

---

## Option 3: Vercel (Great for Developers)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com/)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Other
   - **Build Command**: leave empty
   - **Output Directory**: `public` or `.`
6. Click "Deploy"

Vercel provides:
- Instant deploys
- Preview deployments for each commit
- Free SSL
- Custom domains
- Excellent performance

---

## Option 4: Any Static Host

Your site is pure HTML/CSS/JS with no build process, so it works on ANY static host:

- **AWS S3** + CloudFront
- **Azure Static Web Apps**
- **Firebase Hosting**
- **Cloudflare Pages**
- **Render**
- **Surge.sh**
- Traditional web hosting (cPanel, etc.)

### Generic Deployment Steps:

1. Upload the contents of the `public/` folder to your web host
2. Ensure `index.html` is in the root directory
3. Verify all file permissions allow reading
4. Access your domain

---

## Pre-Deployment Checklist

Before deploying, make sure you've:

- [ ] Updated all personal information in JSON files
- [ ] Changed email, phone, LinkedIn, GitHub links in [index.html](public/index.html#L193-L215)
- [ ] Tested all navigation works locally
- [ ] Checked all project pages load correctly
- [ ] Verified contact links work
- [ ] Tested on mobile viewport
- [ ] Run spell check on all content
- [ ] Removed any TODO comments from code

## After Deployment

### Test Your Live Site

1. **Check all pages load**
   - Home page
   - About page
   - All 4 project pages

2. **Test all links**
   - Navigation links
   - Contact links (email, phone, LinkedIn, GitHub)
   - Project cards link to detail pages
   - Back buttons work

3. **Mobile testing**
   - View on actual phone or use browser dev tools
   - Test navigation
   - Test contact buttons

4. **Performance check**
   - Run [PageSpeed Insights](https://pagespeed.web.dev/)
   - Should score 90+ on all metrics

5. **Accessibility check**
   - Run [WAVE](https://wave.webaim.org/)
   - Should have no major errors

### Share Your Portfolio

Add your portfolio URL to:
- LinkedIn profile
- GitHub profile README
- Resume
- Email signature
- Business cards
- Cover letters

---

## Updating Your Site

### After Initial Deployment:

1. **Make changes locally**
   - Edit JSON files for content
   - Add new project pages as needed
   - Test changes locally

2. **Commit and push**
   ```bash
   git add .
   git commit -m "Update: Added new project"
   git push
   ```

3. **Automatic deployment**
   - GitHub Pages: Redeploys automatically (1-2 min)
   - Netlify/Vercel: Redeploys instantly on push
   - Manual hosts: Re-upload changed files

---

## Custom Domain Setup

### If you have a custom domain (e.g., casselwilliams.com):

#### GitHub Pages:
1. Add `CNAME` file to repository root with your domain
2. In GitHub Settings → Pages, enter custom domain
3. Configure DNS:
   - Add A records to GitHub's IPs
   - Or add CNAME record pointing to `yourusername.github.io`

#### Netlify/Vercel:
1. Go to Domain Settings in dashboard
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate automatically provisioned

### DNS Configuration Example:
```
Type   Name    Value
A      @       185.199.108.153
A      @       185.199.109.153
A      @       185.199.110.153
A      @       185.199.111.153
CNAME  www     yourusername.github.io
```

(IP addresses for GitHub Pages - check current IPs in GitHub docs)

---

## Troubleshooting

### Issue: 404 on GitHub Pages
- **Solution**: Check that repo name matches or use `yourusername.github.io`
- Verify `index.html` is in repository root or `public/` as configured

### Issue: Links broken after deployment
- **Solution**: Use relative paths (you already do this correctly)
- Check that file names match exactly (case-sensitive on Linux servers)

### Issue: Styles not loading
- **Solution**: Verify CSS path is correct relative to HTML
- Check browser console for 404 errors

### Issue: Changes not appearing
- **Solution**:
  - GitHub Pages: Wait 1-2 minutes, clear browser cache
  - Netlify/Vercel: Should be instant, check build logs
  - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

## Recommended: GitHub Pages

For a portfolio site, **GitHub Pages is the best choice**:

✅ Completely free
✅ No credit card required
✅ Reliable (backed by Microsoft)
✅ Automatic HTTPS
✅ Easy to update (just git push)
✅ Custom domain support
✅ No storage limits for reasonable sites
✅ Shows on your GitHub profile

---

## Need Help?

- **GitHub Pages**: [docs.github.com/pages](https://docs.github.com/pages)
- **Netlify**: [docs.netlify.com](https://docs.netlify.com/)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)

---

## Your Site is Ready! 🚀

Everything is configured correctly for deployment. Just choose your hosting platform and follow the steps above. Your professional portfolio will be live in minutes!

**Good luck with your job search!** 💼
