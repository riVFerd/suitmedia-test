// API route for fetching Suitmedia API to avoid CORS issue
export async function GET(request: Request) {
  const baseUrl = 'https://suitmedia-backend.suitdev.com/api/ideas';

  const url = new URL(request.url);
  const queryParams = url.searchParams;

  const response = await fetch(`${baseUrl}?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  if (response.ok) {
    return response;
  }

  return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
    headers: {
      'Content-Type': 'application/json'
    },
    status: response.status
  });
}