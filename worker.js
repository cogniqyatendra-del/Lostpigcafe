export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Auth-Key",
    };

    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Allow only POST
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { 
        status: 405,
        headers: corsHeaders
      });
    }

    // Auth check
    const authHeader = request.headers.get('X-Auth-Key');
    if (authHeader !== env.AUTH_SECRET) {
      return new Response('Unauthorized', { 
        status: 401,
        headers: corsHeaders
      });
    }

    try {
      const { messages, systemInstruction, model, temperature = 1 } = await request.json();

      if (!messages?.length || !model) {
        return new Response('Missing messages or model', { 
          status: 400,
          headers: corsHeaders
        });
      }

      const payload = {
        contents: messages,
        systemInstruction,
        generationConfig: { temperature }
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        return new Response(
          `Gemini Error: ${errorText}`,
          { 
            status: response.status,
            headers: corsHeaders
          }
        );
      }

      return new Response(response.body, {
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });

    } catch (err) {
      return new Response(
        `Server Error: ${err.message}`,
        { 
          status: 500,
          headers: corsHeaders
        }
      );
    }
  }
};
