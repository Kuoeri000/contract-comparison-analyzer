# Contract Deviation Analyzer

A full-stack SaaS application that compares a standard contract against a counterparty's version using OpenAI, identifying deviations and assessing legal/business risk.

## Features

- Side-by-side contract input with character counts
- AI-powered deviation analysis via OpenAI
- Executive summary with overall risk score (0–100)
- Detailed deviation list with risk levels and recommendations
- Clean, modern UI built with React and Tailwind CSS

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 19, Vite, Tailwind CSS v4     |
| Backend  | Node.js, Express 5                  |
| AI       | OpenAI API (structured JSON output) |

## Prerequisites

- **Node.js** 18 or later
- **OpenAI API key** — [Get one here](https://platform.openai.com/api-keys)

## Setup

### 1. Install dependencies

```bash
npm run install:all
```

Or install each package separately:

```bash
npm install              # root (concurrently)
npm install --prefix server
npm install --prefix client
```

### 2. Configure environment variables

Copy the example env file and add your OpenAI API key:

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_MODEL=gpt-4o-mini
PORT=3001
```

### 3. Start the development servers

```bash
npm run dev
```

This starts both servers concurrently:

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3001

The Vite dev server proxies `/api` requests to the Express backend automatically.

### 4. Use the app

1. Open http://localhost:5173
2. Paste your **Standard Contract** and **Counterparty Contract** (or click "Load sample data")
3. Click **Analyze Deviations**
4. Review the executive summary, risk score, and deviation details

## API

### `POST /api/compare-contracts`

Compares two contract texts and returns structured analysis.

**Request body:**

```json
{
  "standardContract": "Your standard contract text...",
  "counterpartyContract": "Counterparty's contract text..."
}
```

**Response:**

```json
{
  "executiveSummary": "Summary of key differences...",
  "overallRiskScore": 65,
  "deviations": [
    {
      "category": "Liability",
      "standardClause": "Liability capped at 12 months fees",
      "counterpartyClause": "Liability capped at $50,000",
      "riskLevel": "high",
      "recommendation": "Negotiate to restore fee-based cap..."
    }
  ]
}
```

### `GET /api/health`

Health check endpoint. Returns `{ "status": "ok" }`.

## Project Structure

```
contract-deviation-analyzer/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── api/             # API client functions
│   │   ├── components/      # UI components
│   │   ├── App.jsx          # Main app with routing logic
│   │   └── index.css        # Tailwind styles
│   └── vite.config.js       # Dev server + API proxy
├── server/                  # Express backend
│   ├── index.js             # API server + OpenAI integration
│   └── .env.example         # Environment variable template
├── package.json             # Root scripts
└── README.md
```

## Scripts

| Command              | Description                          |
|----------------------|--------------------------------------|
| `npm run dev`        | Start frontend + backend (dev mode)  |
| `npm run dev:client` | Start frontend only                  |
| `npm run dev:server` | Start backend only                   |
| `npm run build`      | Build frontend for production        |
| `npm run start`      | Start backend in production mode     |

## Production

Build the frontend and serve it alongside the API:

```bash
npm run build
npm run start
```

For production deployment, consider serving the `client/dist` folder from Express or using a reverse proxy (nginx, etc.).

## License

MIT
