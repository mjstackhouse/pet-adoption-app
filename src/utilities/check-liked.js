import clientPromise from '@/utilities/client-promise';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function checkLiked() {
  const db = (await clientPromise).db('PetAdoptionUsers');
  const session = await getServerSession(authOptions);

  // if (session) {
    console.log('session.user: ', session.user);

    const userCursor = await db.collection('users').findOne({ 'email' : session.user.email });

    if (userCursor.likedAnimals) {
      return userCursor.likedAnimals;
    }
  // }
}