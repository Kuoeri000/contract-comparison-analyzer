import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

const COMPARISON_SCHEMA = {
  type: 'object',
  properties: {
    executiveSummary: {
      type: 'string',
      description: 'A concise 2-4 sentence executive summary of key differences and their business impact.',
    },
    overallRiskScore: {
      type: 'number',
      description: 'Overall risk score from 0 (no risk) to 100 (critical risk) based on deviations from the standard contract.',
    },
    deviations: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            description: 'Contract section or clause category (e.g., Liability, Termination, Payment Terms).',
          },
          standardClause: {
            type: 'string',
            description: 'Brief summary of the standard contract position.',
          },
          counterpartyClause: {
            type: 'string',
            description: 'Brief summary of the counterparty contract position.',
          },
          riskLevel: {
            type: 'string',
            enum: ['low', 'medium', 'high', 'critical'],
            description: 'Risk level of this deviation.',
          },
          recommendation: {
            type: 'string',
            description: 'Actionable recommendation for addressing this deviation.',
          },
        },
        required: ['category', 'standardClause', 'counterpartyClause', 'riskLevel', 'recommendation'],
        additionalProperties: false,
      },
    },
  },
  required: ['executiveSummary', 'overallRiskScore', 'deviations'],
  additionalProperties: false,
};

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/compare-contracts', async (req, res) => {
  const { standardContract, counterpartyContract } = req.body;

  if (!standardContract?.trim() || !counterpartyContract?.trim()) {
    return res.status(400).json({
      error: 'Both standardContract and counterpartyContract are required.',
    });
  }

  const openai = getOpenAIClient();
  if (!openai) {
    return res.status(500).json({
      error: 'OpenAI API key is not configured. Set OPENAI_API_KEY in server/.env',
    });
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert contract analyst specializing in identifying deviations between a company's standard contract template and counterparty-proposed versions.

Analyze the two contracts thoroughly and identify all meaningful deviations. Focus on:
- Liability and indemnification changes
- Payment terms and pricing
- Termination and renewal clauses
- Intellectual property rights
- Confidentiality and data protection
- Warranties and representations
- Governing law and dispute resolution
- Insurance requirements
- Assignment and subcontracting rights

Be precise and actionable. The overallRiskScore should reflect the cumulative business and legal risk of accepting the counterparty version.`,
        },
        {
          role: 'user',
          content: `Compare these two contracts and identify all deviations.

## STANDARD CONTRACT
${standardContract}

## COUNTERPARTY CONTRACT
${counterpartyContract}`,
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'contract_comparison',
          strict: true,
          schema: COMPARISON_SCHEMA,
        },
      },
      temperature: 0.2,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response received from OpenAI');
    }

    const result = JSON.parse(content);
    res.json(result);
  } catch (error) {
    console.error('Contract comparison error:', error);
    const message = error?.message || 'Failed to analyze contracts';
    res.status(500).json({ error: message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
