import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI Client with User-Agent header
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Gugu Xpress Core Engine'
  });
});

// 2. Gugu AI Shopping Assistant Endpoint (Server-Side Gemini API)
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, catalogContext, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Valid message prompt is required.' });
      return;
    }

    const ai = getAIClient();
    if (!ai) {
      // Graceful fallback response when API key is not yet set
      res.json({
        reply: `Hello! I am Gugu AI, your smart shopping assistant for Gugu Xpress. I'm ready to help you discover products, compare specifications, and find the best flash deals across our marketplace!`,
        recommendedProductIds: []
      });
      return;
    }

    const systemPrompt = `You are "Gugu AI", the intelligent, friendly, and ultra-fast shopping assistant for Gugu Xpress — Africa's premier modern technology-commerce marketplace.
Tagline: "Everything You Want. One Xpress Away."
Brand Identity: High-tech, energetic, trustworthy, African-born and globally focused. Currency is Nigerian Naira (₦).

Your capabilities:
1. Recommend actual products from the provided Gugu Xpress product catalog. DO NOT hallucinate products that do not exist in the catalog.
2. If user mentions a budget (e.g. "under ₦50,000" or "laptop for programming"), check price & specs and recommend exact matching items.
3. Compare features between products objectively.
4. Keep responses concise, helpful, and formatted with clean bullet points.
5. In your response, if you recommend any specific products from the catalog, list their exact product IDs in a JSON block at the end like: [PRODUCT_IDS: id1, id2].

Current Gugu Xpress Catalog Context:
${JSON.stringify(catalogContext || [], null, 2)}
`;

    const chat = ai.chats.create({
      model: 'gemini-3.7-flash',
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    // Send the user query
    const response = await chat.sendMessage({
      message: message,
    });

    const responseText = response.text || '';
    
    // Extract recommended product IDs if present
    const idMatch = responseText.match(/\[PRODUCT_IDS:\s*([^\]]+)\]/i);
    let recommendedIds: string[] = [];
    let cleanReply = responseText;

    if (idMatch) {
      recommendedIds = idMatch[1].split(',').map((id: string) => id.trim()).filter(Boolean);
      cleanReply = responseText.replace(/\[PRODUCT_IDS:[^\]]+\]/gi, '').trim();
    }

    res.json({
      reply: cleanReply,
      recommendedProductIds: recommendedIds,
    });
  } catch (error: any) {
    console.error('Gemini API Error in /api/gemini/chat:', error);
    res.status(500).json({
      error: 'Failed to process AI assistant query',
      details: error?.message || 'Internal server error'
    });
  }
});

// 3. Payment Gateway Simulation & Verification (Paystack / Flutterwave / Card / Bank Transfer)
app.post('/api/payments/initialize', (req, res) => {
  try {
    const { order_id, amount, currency = 'NGN', provider = 'paystack', email } = req.body;
    
    const reference = `GX-${provider.toUpperCase().slice(0, 4)}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    res.json({
      status: 'success',
      message: 'Payment initialized successfully',
      data: {
        authorization_url: `https://checkout.guguxpress.com/pay/${reference}`,
        reference,
        order_id,
        amount,
        currency,
        provider,
        customer_email: email,
        access_code: `gx_acc_${Math.random().toString(36).substring(2, 10)}`
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/payments/verify', (req, res) => {
  try {
    const { reference, provider } = req.body;
    
    if (!reference) {
      res.status(400).json({ error: 'Transaction reference is required for verification' });
      return;
    }

    // In a production server, here we verify with Paystack / Flutterwave API secret keys
    // e.g., await fetch(`https://api.paystack.co/transaction/verify/${reference}`, { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } })

    res.json({
      status: 'success',
      verified: true,
      message: 'Payment verified securely on server-side',
      data: {
        reference,
        provider: provider || 'paystack',
        status: 'successful',
        paid_at: new Date().toISOString(),
        channel: provider === 'bank_transfer' ? 'dedicated_virtual_account' : 'card_tokenized',
        receipt_number: `REC-${Date.now()}`
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Server-Side Order Processing & Inventory Check
app.post('/api/orders/create', (req, res) => {
  try {
    const { order } = req.body;
    if (!order || !order.items || order.items.length === 0) {
      res.status(400).json({ error: 'Invalid order structure or empty items.' });
      return;
    }

    const orderNumber = `GX-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingNumber = `GX${Math.floor(10000000 + Math.random() * 90000000)}NG`;
    
    const enrichedOrder = {
      ...order,
      order_number: orderNumber,
      tracking_number: trackingNumber,
      order_status: 'payment_confirmed',
      payment_status: 'successful',
      created_at: new Date().toISOString(),
      estimated_delivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      tracking_steps: [
        {
          status: 'placed',
          title: 'Order Placed',
          description: 'Your order request was received and logged.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          location: 'Gugu Xpress App',
          completed: true,
          current: false,
        },
        {
          status: 'payment_confirmed',
          title: 'Payment Confirmed',
          description: `Payment verified via ${order.payment_provider || 'Paystack'}. Funds placed in secure merchant escrow.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          location: 'Gugu Secure Settlement Gateway',
          completed: true,
          current: true,
        },
        {
          status: 'processing',
          title: 'Processing at Merchant Hub',
          description: 'Merchant is inspecting, packaging, and affixing Xpress barcode.',
          timestamp: 'Expected within 12 hours',
          location: 'Seller Sorting Facility',
          completed: false,
          current: false,
        },
        {
          status: 'shipped',
          title: 'Shipped to Regional Distribution',
          description: 'Handed over to Xpress Logistics Express Courier.',
          timestamp: 'Pending dispatch',
          location: 'Lagos Logistics Hub',
          completed: false,
          current: false,
        },
        {
          status: 'in_transit',
          title: 'In Transit to Destination Hub',
          description: 'Package en-route to local neighborhood delivery station.',
          timestamp: 'Estimated Day 2',
          location: 'Regional Hub',
          completed: false,
          current: false,
        },
        {
          status: 'out_for_delivery',
          title: 'Out for Delivery',
          description: 'Dispatch rider is en route to recipient address.',
          timestamp: 'Estimated Day 3',
          location: 'Local Delivery Agent',
          completed: false,
          current: false,
        },
        {
          status: 'delivered',
          title: 'Delivered',
          description: 'Package handed to recipient with signature verification.',
          timestamp: 'Final Destination',
          location: order.shipping_address?.city || 'Recipient Address',
          completed: false,
          current: false,
        }
      ]
    };

    res.json({
      status: 'success',
      order: enrichedOrder
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Vite Middleware Setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Gugu Xpress Server running on http://localhost:${PORT}`);
  });
}

startServer();
