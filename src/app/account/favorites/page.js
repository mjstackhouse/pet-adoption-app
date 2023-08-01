import fetchData from '@/utilities/fetch-data';
import checkLiked from '@/utilities/check-liked';
import fetchLiked from '@/utilities/fetch-liked';
import fetchLikedArr from '@/utilities/fetch-liked-arr';
import Link from 'next/link';
import SwipeButton from '@/components/swipe-button';
import LikeButton from '@/components/like-button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function FavoritesPage() {
  let userLikes;
  
  const likedAnimalsInfoArr = await fetchLikedArr();

  console.log('await fetchLikedArr(): ', await fetchLikedArr());

  // const likedAnimalsInfoArr = await likedAnimalsInfo.slice();
  console.log('likedAnimalsInfoArr: ', likedAnimalsInfoArr);
  const session = await getServerSession(authOptions);

  if (session) userLikes = await checkLiked();

  // Fetch the user's likedAnimals from the database
  // Then fetch each of those animals from the PetFinder API

  return (
    <div className='h-[90vh] h-[90svh] flex flex-wrap items-center'>
      <div id='pet-links-container' className='h-[77vh] h-[77svh] flex items-center text-black overflow-hidden'>
        {await likedAnimalsInfoArr.map((element) => {
          return <div className='relative self-start sm:basis-1/3 md:my-8'><div className='flex flex-wrap w-[100vw] items-center sm:h-[25vh] text-center'>
                    <LikeButton animalId={element.animal.id} liked={ userLikes !== undefined ? (userLikes.includes(element.animal.id) === true ? true : false) : false } />
                    <Link href={`/search/${element.animal.id}`} className='basis-full p-4 shadow-md rounded-b-3xl flex flex-wrap bg-white items-center'>
                      <div className='basis-full'>
                        <img src={element.animal.primary_photo_cropped !== null ? element.animal.primary_photo_cropped.medium : 'https://pet-adoption-app.s3.us-west-1.amazonaws.com/no-photo-image.jpg'} className='object-cover h-[400px] m-auto'></img>
                      </div>
                      <div className='justify-self-start mx-auto'>
                        <div className={`font-bold ${element.animal.name.length >= 22 ? 'text-base sm:text-xl' : 'text-xl sm:text-3xl'}`}>{element.animal.name.toUpperCase()}</div>
                        <div>{element.animal.breeds.primary}{element.animal.breeds.secondary !== null ? ` Mix` : ''}</div>
                        <div>{element.animal.age} {element.animal.gender} {element.animal.species}</div>
                      </div>
                    </Link>
                  </div></div>;
        })}
      </div>
    </div>
  )
}