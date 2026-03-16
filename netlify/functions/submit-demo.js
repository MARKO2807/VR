/**
 * Netlify Function: proxy form submission so POST reaches Netlify Forms
 * when the SPA redirect would otherwise return 404 for POST to /
 */
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const formName = 'demo-request';
  const body = event.body || ''; // already URL-encoded from the client

  // Forward to Netlify Forms (same site root)
  const siteUrl = process.env.URL || process.env.DEPLOY_PRIME_URL || 'https://localhost';
  const formAction = `${siteUrl.replace(/\/$/, '')}/`;

  try {
    const response = await fetch(formAction, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.includes('form-name=') ? body : `form-name=${formName}&${body}`,
    });

    return {
      statusCode: response.ok ? 200 : response.status,
      body: response.ok ? 'OK' : await response.text(),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
