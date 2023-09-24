import clientPromise from '@/utilities/client-promise';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function fetchLiked() {
  const db = (await clientPromise).db('PetAdoptionUsers');
  const session = await getServerSession(authOptions);

  if (!session) redirect('/signin?callbackUrl=/account/favorites');
  else {
    const userCursor = await db.collection('users').findOne({ 'email' : session.user.email });

    if (userCursor.likedAnimals) {
      return await userCursor.likedAnimals;
    }
    else {
      return 'No favorited animals';
    }
  }
}