import fetchData from '@/utilities/fetch-data';
import { NextResponse } from 'next/server';

export async function POST(request) {
  // console.log('inside of api/data route handler');

  const body = await request.json();
  const data = await fetchData(body.type, body.state, body.city, 1, 50);
  const dataJSON = await JSON.stringify(await data);

  // console.log('/api/data dataJSON: ', await dataJSON);

  return new Response(await dataJSON);
}