let tokenObj2;

async function fetchToken() {
  const tokenResponse = await fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${process.env.PET_FINDER_API_KEY}&client_secret=${process.env.PET_FINDER_SECRET}`,
    cache: 'no-store',
    // next: { revalidate: 3600 }
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

  // Retrieve type of animal in city/state
  if ([...args].length === 4) {
    dataResponse = await fetch(`https://api.petfinder.com/v2/animals?type=${args[0]}&location=${args[2]}, ${args[1]}&page=${args[3]}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${await tokenObj2.access_token}`
      }
    });
  }
  // Retrieve all breed options
  else if ([...args].length === 1 && alphaRegex.test(args[0])) {
    dataResponse = await fetch(`https://api.petfinder.com/v2/types/${args[0]}/breeds`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${await tokenObj2.access_token}`
      }
    });
  }
  // Retrieve filtered animal results
  else if ([...args].length === 5) {
    if (typeof args[4] === 'object') {
      const queryKeys = Object.keys(args[4]).slice();
      const queryValues = Object.values(args[4]).slice();

      let queryParams = '';

      for (let i = 0; i < queryKeys.length; i++) {
        queryParams += `&${queryKeys[i]}=${queryValues[i]}`;
      }

      dataResponse = await fetch(`https://api.petfinder.com/v2/animals?type=${args[0]}&location=${args[2]}, ${args[1]}&page=${args[3]}${queryParams}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${await tokenObj2.access_token}`
          }
        });
      }
      else {
        dataResponse = await fetch(`https://api.petfinder.com/v2/animals?type=${args[0]}&location=${args[2]}, ${args[1]}&page=${args[3]}&limit=${args[4]}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${await tokenObj2.access_token}`
          }
        });
      }
  }
  // Retrieve single animal
  else if ([...args].length === 1 && alphaRegex.test(args[0]) === false) {
    dataResponse = await fetch(`https://api.petfinder.com/v2/animals/${args[0]}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${await tokenObj2.access_token}`
      }
    });
  }
  // Retrieve all animal types
  else {
    dataResponse = await fetch('https://api.petfinder.com/v2/types', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${await tokenObj2.access_token}`
      }
    });
  }

  if (await !dataResponse.ok) {
    if (dataResponse.status === 404) {
      console.log('404');
      return 'Not found';
    }
    else if (dataResponse.status === 401) {
      console.log('401');
      return 'Not found';
    }
    else if (dataResponse.status === 400) {
      console.log('400');
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