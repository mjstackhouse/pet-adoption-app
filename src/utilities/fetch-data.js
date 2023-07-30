let tokenObj2;
let fetchTokenCount = 0;
let intervalId;

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

  const tokenObj1 = await tokenResponse.json();

  // console.log('tokenObj: ', await tokenObj);

  return tokenObj1;
}

export default async function fetchData(...args) {
  const alphaRegex = /[A-Za-z]/;

  // console.log('fetchTokenCount: ', fetchTokenCount);
  // console.log('intervalId: ', intervalId);

  if (fetchTokenCount === 0) {
    // console.log('fetchObjCount === 0');
    tokenObj2 = await fetchToken();
    fetchTokenCount += 1;
  }
  else {
    if (intervalId === undefined) {
      // console.log('setInterval');
      intervalId = setInterval(fetchToken, 3600000);
    }
  }

  // console.log('tokenObj: ', await tokenObj2);

  let dataResponse;

  // console.log('param: ', param);
  // console.log('alphaRegex.test(param): ', alphaRegex.test(param));

  // Type of animal in city/state
  if (alphaRegex.test(args[0]) === true) {
      // console.log(`https://api.petfinder.com/v2/animals?type=${args[0]}&location="${args[2]}, ${args[1]}"`);

      dataResponse = await fetch(`https://api.petfinder.com/v2/animals?type=${args[0]}&location=${args[2]}, ${args[1]}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${await tokenObj2.access_token}`
        }
        // cache: 'no-store'
    });
  }
  else {
    // console.log('in the fetchData else');

    dataResponse = await fetch(`https://api.petfinder.com/v2/animals/${args[0]}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${await tokenObj2.access_token}`
      }
      // cache: 'no-store'
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