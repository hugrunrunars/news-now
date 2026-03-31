import { stripHtml, getCache, putCache } from './utils';

export async function fetchTag(tag, gKey) {
  const fields = 'trailText,body,thumbnail';
  const base   = 'https://content.guardianapis.com/search';
  const params = tag.section
    ? `section=${tag.section}&show-fields=${fields}&page-size=12&order-by=newest&api-key=${gKey}`
    : `q=${encodeURIComponent(tag.query || tag.name)}&show-fields=${fields}&page-size=12&order-by=newest&api-key=${gKey}`;

  const res = await fetch(`${base}?${params}`);
  if (!res.ok) throw new Error(`Guardian API returned ${res.status} — check your API key.`);
  const { response } = await res.json();

  return (response.results || []).map(r => ({
    id:        r.id,
    title:     r.webTitle,
    trail:     stripHtml(r.fields?.trailText || ''),
    body:      stripHtml(r.fields?.body || '').slice(0, 3500),
    section:   r.sectionName,
    published: r.webPublicationDate,
    url:       r.webUrl,
    tagId:     tag.id,
    tagName:   tag.name,
    tagColor:  tag.color,
    thumbnail: r.fields?.thumbnail || null,
    status:    'pending',
    summary:   null,
    full:      null,
  }));
}

export async function rewriteArticle(article, aiKey, maxRetries = 3) {
  const cached = getCache()[article.id];
  if (cached) return cached;

  const prompt = `You are a news translator and simplifier. Translate and rewrite the following news article into simple, clear Icelandic (íslenska).

Rules:
- Write EVERYTHING in Icelandic — no English words at all
- Use short sentences (max 18 words each)
- No jargon or technical language
- Explain complex ideas in plain words
- Be accurate and factual

Respond in EXACTLY this format with no extra text:
TITILL: [Translated title in Icelandic]
SAMANTEKT: [2-3 sentences summarising the key point, in Icelandic]
HEILD: [Full article rewritten simply in Icelandic, 150-220 words]

Title: ${article.title}
Text: ${article.body || article.trail}`;

  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    if (attempt > 0) {
      const isRateLimit = lastError?.status === 429;
      const baseDelay = isRateLimit ? 15000 : 2000;
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise(r => setTimeout(r, delay));
    }

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${aiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.2, maxOutputTokens: 1024 },
          }),
        }
      );

      if (!res.ok) {
        const err = new Error(`Gemini API returned ${res.status}`);
        err.status = res.status;
        if (res.status >= 400 && res.status < 500 && res.status !== 429) throw err;
        lastError = err;
        continue;
      }

      const data = await res.json();
      const parts = data.candidates?.[0]?.content?.parts || [];
      const text = parts.filter(p => !p.thought).map(p => p.text).join('') || '';

      const tm = text.match(/TITILL:\s*([\s\S]*?)(?=SAMANTEKT:|$)/i);
      const sm = text.match(/SAMANTEKT:\s*([\s\S]*?)(?=HEILD:|$)/i);
      const fm = text.match(/HEILD:\s*([\s\S]*?)$/i);
      const result = {
        titleIS:  tm?.[1]?.trim() || article.title,
        summary:  sm?.[1]?.trim() || article.trail,
        full:     fm?.[1]?.trim() || text.trim(),
      };
      putCache(article.id, result);
      return result;
    } catch (err) {
      if (err.status && err.status >= 400 && err.status < 500 && err.status !== 429) throw err;
      lastError = err;
      if (attempt === maxRetries) throw lastError;
    }
  }
  throw lastError;
}
