# Miguel AI Cloudflare

AI-powered chatbot about Miguel Lacanienta's professional profile, deployed on Cloudflare Pages with Workers.

## 🚀 Cloudflare Deployment

### Prerequisites
- Node.js 18+ installed
- Cloudflare account
- Wrangler CLI installed globally: `npm install -g wrangler`

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.dev.vars.example` to `.dev.vars`
   - Add your API keys to `.dev.vars`:
     ```
     GROQ_API_KEY=your_actual_groq_key
     GEMINI_API_KEY=your_actual_gemini_key
     MISTRAL_API_KEY=your_actual_mistral_key
     ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Test with Cloudflare Pages locally:**
   ```bash
   npm run preview
   ```

### Deploy to Cloudflare Pages

1. **Login to Cloudflare:**
   ```bash
   wrangler login
   ```

2. **Set environment variables in Cloudflare:**
   ```bash
   wrangler pages secret put GROQ_API_KEY
   wrangler pages secret put GEMINI_API_KEY
   wrangler pages secret put MISTRAL_API_KEY
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

### Automatic Deployment via Git

1. **Push to GitHub:**
   - Connect your repository to Cloudflare Pages
   - Configure build settings:
     - Build command: `npm run pages:build`
     - Build output directory: `.open-next/worker`

2. **Set environment variables in Cloudflare Dashboard:**
   - Go to Pages → Your Project → Settings → Environment Variables
   - Add `GROQ_API_KEY`, `GEMINI_API_KEY`, and `MISTRAL_API_KEY`

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Deployment:** Cloudflare Pages + Workers
- **AI Models:** Groq (Llama), Google Gemini, Mistral

## 📝 Features

- Interactive AI chatbot with multiple model options
- Animated 3D avatar
- Security features against prompt injection
- Mobile-responsive design
- QR code for easy sharing

## 🔒 Security

The chatbot includes built-in protection against prompt injection and other malicious inputs to ensure it stays on-topic.

## 📚 Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build Next.js application
- `npm run pages:build` - Build for Cloudflare Pages
- `npm run preview` - Preview Cloudflare Pages build locally
- `npm run deploy` - Deploy to Cloudflare Pages
