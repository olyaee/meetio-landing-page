# Meetio Landing Page

A modern React application for Meeting Intelligence and Workflow Automation.

## Development

**Local Development**

Clone this repository and start the development environment:

```bash
npm install
npm run dev
```

The development server runs on http://localhost:8080

## Commands

- `npm run dev` - Starts the development server
- `npm run build` - Creates the production build
- `npm run build:dev` - Creates the development build
- `npm run lint` - Runs ESLint
- `npm run preview` - Previews the built application

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Animation**: Framer Motion, CSS Animations
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## Project Structure

```
src/
├── components/          # React components
├── pages/              # Page components
├── lib/                # Utility functions
└── styles/             # Global styles
```

## Deployment

### Netlify (Recommended)

This project is configured for Netlify deployment with `netlify.toml`.

**Option 1: Deploy via Netlify UI**
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account and select this repository
4. Build settings are auto-detected from `netlify.toml`
5. Click "Deploy site"

**Option 2: Deploy via CLI**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

### Custom Domain (Namecheap)

1. In Netlify: Site settings → Domain management → Add custom domain
2. In Namecheap: Domain List → Manage → Advanced DNS
3. Add these DNS records:

| Type  | Host | Value                          |
|-------|------|--------------------------------|
| A     | @    | 75.2.60.5                      |
| CNAME | www  | your-site-name.netlify.app     |

4. Back in Netlify, verify DNS and provision SSL certificate

### Manual Build

Run `npm run build` to create the production build in the `dist/` folder.

## Video Hosting (Cloudinary)

Demo videos are hosted on [Cloudinary](https://cloudinary.com/) (account: `dvxnhjnfy`). Videos are served with automatic quality optimization (`q_auto`).

## Email Setup (EmailJS)

The contact form uses [EmailJS](https://www.emailjs.com/) to send emails.

### Environment Variables

Create a `.env` file with:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID=your_autoreply_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

For Netlify, add these in: **Site Settings** → **Environment Variables**

### Email Templates

Template HTML files are in `docs/`:
- `1-notification-to-founders.html` - Notification sent to founders
- `2-autoreply-to-user.html` - Auto-reply sent to user

### DNS Records Required (for custom domain emails)

Add these TXT records in your DNS provider:

| Type | Host | Value |
|------|------|-------|
| TXT | @ | `v=spf1 include:_spf.google.com ~all` |
| TXT | google._domainkey | (DKIM key from Google Workspace Admin) |

Enable DKIM in: **Google Admin** → **Apps** → **Google Workspace** → **Gmail** → **Authenticate email**
