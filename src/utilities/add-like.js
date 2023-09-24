import clientPromise from '@/utilities/client-promise';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function addLike(animalInfo) {
  const db = (await clientPromise).db('PetAdoptionUsers');
  const session = await getServerSession(authOptions);

  if (!session) redirect('/signin?callbackUrl=/account');
  else {
    const userCursor = await db.collection('users').findOne({ 'email' : session.user.email });

    if (userCursor.likedAnimals) {
      for (let i = 0; i < userCursor.likedAnimals.length; i++) {
        if (userCursor.likedAnimals[i].id === animalInfo.id) {
          await db.collection('users').findOneAndUpdate(
            { 'email' : session.user.email },
            { $pull: { 'likedAnimals' : animalInfo } }
          )
          return 'Removed from likes';
        }
        else if (userCursor.likedAnimals[i].id !== animalInfo.id && i === userCursor.likedAnimals.length - 1) {
          await db.collection('users').findOneAndUpdate(
            { 'email' : session.user.email },
            { $push: { 'likedAnimals' : animalInfo } }
          )
          return 'Added to likes';
        }
      }
    }
    else {
      await db.collection('users').findOneAndUpdate(
        { 'email' : session.user.email },
        { $set: { 'likedAnimals' : [ animalInfo ] } }
      )
      return 'Added to likes';
    }
  }
}