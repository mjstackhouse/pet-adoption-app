import addLike from '@/utilities/add-like';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();

  const addResponse = await addLike(body.animalInfo);

  console.log('addResponse: ', await addResponse);

  return await addResponse;
}