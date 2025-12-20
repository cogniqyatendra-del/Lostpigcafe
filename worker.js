export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Key, X-Project-ID',
          'Access-Control-Max-Age': '86400'
        }
      });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    try {
      const body = await request.json();

      // Validate required fields
      if (!body.message) {
        return new Response(JSON.stringify({ error: 'Message field is required' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      // Select API key based on project ID
      const projectId = request.headers.get('X-Project-ID') || 'default';
      
      let GEMINI_API_KEY;
      
      switch(projectId) {
        case 'LOST_PIG_CAFE':
          GEMINI_API_KEY = env.GEMINI_API_KEY;
          break;
        case 'TEA_WEBSITE':
          GEMINI_API_KEY = env.API_KEY_TEA_WEBSITE;
          break;
        default:
          GEMINI_API_KEY = env.GEMINI_API_KEY; // Fallback to original key
      }
      
      if (!GEMINI_API_KEY) {
        return new Response(JSON.stringify({ 
          error: 'API key not configured for this project',
          projectId: projectId 
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      // Default to Gemini 2.5 Flash-Lite if model not specified
      const model = body.model || 'gemini-2.5-flash-lite';
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

      // Prepare request payload WITH system instruction
      const payload = {
        system_instruction: {
          parts: [{
            text: body.systemInstruction || ""
          }]
        },
        contents: [
          {
            parts: [
              {
                text: body.message
              }
            ]
          }
        ],
        generationConfig: {
          temperature: body.temperature || 0.7,
          topP: body.topP || 0.95,
          topK: body.topK || 64,
          maxOutputTokens: body.maxOutputTokens || 2048
        }
      };

      // Forward request to Gemini API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      // Handle API errors
      if (!response.ok) {
        return new Response(JSON.stringify({ error: data.error || 'Gemini API error' }), {
          status: response.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      // Extract text from response
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      return new Response(JSON.stringify({
        success: true,
        message: text,
        model: model,
        projectId: projectId
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Key, X-Project-ID'
        }
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: 'Internal server error', details: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
};