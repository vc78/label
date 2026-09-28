// Gemini AI Service for LABEL by SAHITHI NANDAN
import { products } from '../data/products';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

const SYSTEM_PROMPT = `
You are the elite "AI Haute Couture Stylist" for LABEL by SAHITHI NANDAN, a luxury Indian ethnic wear and bespoke bridal atelier founded by Sahithi Garlapati.

Your personality:
- Warm, sophisticated, welcoming, knowledgeable about royal Indian textiles, drape aesthetics, color harmonies, and haute couture styling.
- You provide tailored styling advice for Indian weddings (Haldi, Mehendi, Sangeet, Wedding, Reception), festive occasions (Diwali, Eid, Puja), and luxury evening events.
- Whenever recommending looks, reference relevant pieces from our signature collection:
${products.map(p => `- "${p.name}" (ID: ${p.id}, Category: ${p.category}, Price: ₹${p.price}, Fabric: ${p.fabric || 'Pure Handcrafted Silk/Organza'}, Tag: ${p.tag || 'Exclusive'})`).join('\n')}

Guidelines:
1. Provide personalized outfit suggestions based on the user's occasion, color preference, skin tone, or silhouette needs.
2. Emphasize our bespoke custom-tailoring services, master-craftsman hand embroidery, and worldwide shipping.
3. Suggest complementary accessories (e.g. Polki jewelry, Kundan chokers, juttis, potli bags, subtle makeup palettes).
4. Keep responses concise, elegantly formatted with bullet points, and encouraging.
5. Offer to connect them directly with Sahithi on WhatsApp (+91 9000164752) for customized bespoke sizing.
`;

export const askGeminiStylist = async (userMessage, conversationHistory = []) => {
  try {
    const contents = [
      {
        role: 'user',
        parts: [{ text: `${SYSTEM_PROMPT}\n\nClient query: Hello!` }]
      },
      {
        role: 'model',
        parts: [{ text: `Namaste! Welcome to LABEL by SAHITHI NANDAN. I am your personal AI Couture Stylist. Whether you are curating a bridal trousseau, attending a gala, or seeking a handcrafted festive ensemble, I am delighted to assist you. How may I style you today? ✨` }]
      },
      ...conversationHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      })),
      {
        role: 'user',
        parts: [{ text: userMessage }]
      }
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
            topP: 0.95
          }
        })
      }
    );

    if (!response.ok) {
      // Fallback try with 2.0-flash or return helpful fallback
      const errorData = await response.json().catch(() => ({}));
      console.warn('Gemini API request note:', errorData);
      
      // Try alternate model endpoint if needed
      const altResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents, generationConfig: { temperature: 0.7, maxOutputTokens: 600 } })
        }
      ).catch(() => null);

      if (altResponse && altResponse.ok) {
        const altData = await altResponse.json();
        return altData.candidates?.[0]?.content?.parts?.[0]?.text || getStylistFallback(userMessage);
      }

      return getStylistFallback(userMessage);
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply || getStylistFallback(userMessage);
  } catch (err) {
    console.error('Error contacting Gemini Stylist:', err);
    return getStylistFallback(userMessage);
  }
};

const getStylistFallback = (query) => {
  const q = (query || '').toLowerCase();
  if (q.includes('haldi') || q.includes('yellow')) {
    return "✨ For a vibrant Haldi ceremony, I highly recommend our **Sunny Yellow Tissue Saree** or **Marigold Handloom Kurta Set**. Pair it with fresh floral jewelry, delicate pearl earrings, and comfortable juttis. Would you like custom measurements tailored for your height?";
  }
  if (q.includes('sangeet') || q.includes('reception') || q.includes('party')) {
    return "✨ For an enchanting Sangeet or Reception evening, our **Midnight Zardozi Lehengas** and **Deep Wine Velvet Ensembles** create a breathtaking impression under the chandeliers. We can also customize the blouse neckline and sleeve silhouette for you!";
  }
  if (q.includes('bridal') || q.includes('wedding')) {
    return "✨ Congratulations on your special milestone! Sahithi personally oversees our **Bridal Trousseau Ensembles**, combining pure heritage handloom silks with intricate metallic zardozi embroidery. We offer virtual 1-on-1 video consultations to curate your complete wedding wardrobe.";
  }
  return "✨ Welcome to LABEL by SAHITHI NANDAN! Our atelier specializes in custom-made haute couture, luxury silks, and bespoke festive wear. Share your upcoming occasion, favorite color palette, or silhouette preference, and I'll handpick the perfect ensemble for you!";
};
