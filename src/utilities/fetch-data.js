let tokenObj2;

async function fetchToken() {
  const tokenResponse = await fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${process.env.PET_FINDER_API_KEY}&client_secret=${process.env.PET_FINDER_SECRET}`,
    next: { revalidate: 3600 }
  });

  if (!tokenResponse.ok) {
    console.error('tokenResponse: ', await tokenResponse);
    throw new Error('Failed to fetch token');
  } 

  const tokenObj1 = await tokenResponse.json();

  return tokenObj1;
}

export default async function fetchData(...args) {
  const alphaRegex = /[A-Za-z]/;

  tokenObj2 = await fetchToken();

  let dataResponse;

  // Type of animal in city/state
  if (alphaRegex.test(args[0]) === true) {
      dataResponse = await fetch(`https://api.petfinder.com/v2/animals?type=${args[0]}&location=${args[2]}, ${args[1]}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${await tokenObj2.access_token}`
        }
    });
  }
  else {
    dataResponse = await fetch(`https://api.petfinder.com/v2/animals/${args[0]}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${await tokenObj2.access_token}`
      }
    });
  }

  if (await !dataResponse.ok) {
    if (dataResponse.status === 404) {
      return 'Not found';
    }
    else {
      console.error('dataResponse: ', await dataResponse);
      throw new Error('Failed to fetch data');
    } 
  }
    
  const data = await dataResponse.json();

  return await data;
}