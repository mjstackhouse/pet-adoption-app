async function fetchToken() {
  const tokenResponse = await fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${process.env.PET_FINDER_API_KEY}&client_secret=${process.env.PET_FINDER_SECRET}`,
    cache: 'no-store'
  });

  if (!tokenResponse.ok) {
    console.error('tokenResponse: ', await tokenResponse);
    throw new Error('Failed to fetch token');
  } 

  const tokenObj = await tokenResponse.json();

  console.log('tokenObj: ', await tokenObj);

  return tokenObj;
}

export default async function fetchData(...args) {
  const alphaRegex = /[A-Za-z]/;
  const tokenObj = await fetchToken();

  let dataResponse;

  // console.log('param: ', param);
  // console.log('alphaRegex.test(param): ', alphaRegex.test(param));

  if (alphaRegex.test(args[0]) === true) {
      console.log(`https://api.petfinder.com/v2/animals?type=${args[0]}&location="${args[2]}, ${args[1]}"`);

      dataResponse = await fetch(`https://api.petfinder.com/v2/animals?type=${args[0]}&location=${args[2]}, ${args[1]}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${await tokenObj.access_token}`
        },
        cache: 'no-store'
    });
  }
  else {
    console.log('in the fetchData else');

    dataResponse = await fetch(`https://api.petfinder.com/v2/animals/${args[0]}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${await tokenObj.access_token}`
      },
      cache: 'no-store'
    });
  }

  if (await !dataResponse.ok) {
    console.error('dataResponse: ', await dataResponse);
    // console.log('dataResponse.invalid-params', await dataResponse['invalid-params']);
    throw new Error('Failed to fetch data');
  } 

  const data = await dataResponse.json();

  // console.log('data: ', await data);

  return await data;
}