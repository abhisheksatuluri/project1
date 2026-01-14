# X Persona Blueprint

> Decode any X (Twitter) account in seconds. Get a detailed personality & writing blueprint. Then chat with their AI persona.

![X Persona Blueprint](./public/og-image.png)

## What It Does

**X Persona Blueprint** analyzes any public X account and generates a comprehensive writing style analysis:

- **Profile Snapshot**: Writing tone, typical length, emoji usage, formatting habits
- **Core Themes**: 3-5 recurring topics the account focuses on
- **Belief System**: What they consistently push vs. avoid
- **Tweet Formulas**: Structural patterns that drive engagement
- **Why It Works**: Hooks, psychology, and audience alignment
- **Example Tweets**: AI-generated examples in the same style
- **Conversational AI**: Chat with an assistant trained on the generated persona (Phase 2)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **AI**: Hugging Face Inference API (Mistral-7B-Instruct)
- **Data**: Nitter RSS (public, no auth required)
- **Hosting**: Vercel (free tier compatible)

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Hugging Face API key (free at [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens))

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/x-persona-blueprint.git
cd x-persona-blueprint

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Add your Hugging Face API key to .env.local
# HUGGINGFACE_API_KEY=hf_your_key_here

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Features

| Feature | Implementation |
|---------|---------------|
| **Conversational AI** | Chat with an assistant trained on the generated persona |
| **Dark mode** | Default via CSS custom properties + Tailwind |
| **Premium UI** | Card-based layout, gradient accents, glow effects |
| **Animations** | Staggered fade-in-up, shimmer loading, pulse glow |
| **Rate limiting** | 10 requests/minute per IP (in-memory) |
| **Demo fallback** | Pre-generated analysis for @tibo_maker, @levelsio |
| **AI analysis** | Mistral-7B-Instruct via Hugging Face Inference |
| **Sharing** | Web Share API + Twitter intent + clipboard fallback |

## Deployment

1. Push to GitHub
2. Import in [Vercel](https://vercel.com/new)
3. Add `HUGGINGFACE_API_KEY` in Environment Variables
4. Deploy!

## API Endpoints

### POST /api/analyze

Analyze an X account.

**Request:**
```json
{
  "username": "tibo_maker"
}
```

### POST /api/chat

Chat with the analyzed persona.

**Request:**
```json
{
  "username": "tibo_maker",
  "persona": { ... },
  "messages": [
    { "role": "user", "content": "How do I write like this?" }
  ]
}
```

**Response:**
```json
{
  "reply": "Based on the analysis, you should focus on..."
}
```

### GET /api/health

Health check endpoint.

## Limitations

- **Session Memory**: Chat history is stored client-side only and cleared on refresh.
- **Rate Limiting**: 10 requests per minute per IP.
- **Dependencies**: Depends on public Nitter instances for live data.
- **AI Limits**: Subject to Hugging Face Inference API free tier limits.

## License

MIT License
