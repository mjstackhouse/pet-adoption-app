import clientPromise from '@/utilities/client-promise';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function addLike(animalId) {
  const db = (await clientPromise).db('PetAdoptionUsers');
  const session = await getServerSession(authOptions);

  if (!session) redirect('/signin?callbackUrl=/account');
  else {
    console.log('session.user: ', session.user);

    const userCursor = await db.collection('users').findOne({ 'email' : session.user.email });

    console.log('userCursor: ', userCursor);

    if (userCursor.likedAnimals) {
      if (userCursor.likedAnimals.includes(animalId) === true) {
        await db.collection('users').findOneAndUpdate(
          { 'email' : session.user.email },
          { $pull: { 'likedAnimals' : animalId } }
        )
        return 'Removed from likes';
      }
      else {
        await db.collection('users').findOneAndUpdate(
          { 'email' : session.user.email },
          { $push: { 'likedAnimals' : animalId } }
        )
        return 'Added to likes';
      }
    }
    else {
      await db.collection('users').findOneAndUpdate(
        { 'email' : session.user.email },
        { $set: { 'likedAnimals' : [ animalId ] } }
      )
      return 'Added to likes';
    }
  }
}