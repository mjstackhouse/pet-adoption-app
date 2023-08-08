import fetchData from '@/utilities/fetch-data';
import checkLiked from '@/utilities/check-liked';
import fetchLiked from '@/utilities/fetch-liked';
import fetchLikedArr from '@/utilities/fetch-liked-arr';
import Link from 'next/link';
import SwipeButton from '@/components/swipe-button';
import LikeButton from '@/components/like-button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Bree_Serif } from 'next/font/google';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default async function FavoritesPage() {
  let userLikes;
  
  // const likedAnimalsInfoArr = await fetchLikedArr();
  const likedAnimalsInfoArr = await fetchLikedArr();
  const likedAnimalsInfoArrFiltered = await likedAnimalsInfoArr.filter((element) => element !== 'Not found');

  console.log('likedAnimalsInfoArrFiltered: ', likedAnimalsInfoArrFiltered);

  // console.log('typeof await fetchLikedArr(): ', typeof await fetchLikedArr());

  // const likedAnimalsInfoArr = await likedAnimalsInfo.slice();
  // console.log('likedAnimalsInfoArr: ', likedAnimalsInfoArr);
  const session = await getServerSession(authOptions);

  if (session) userLikes = await checkLiked();

  // Fetch the user's likedAnimals from the database
  // Then fetch each of those animals from the PetFinder API

  return (
    <div className='flex flex-wrap items-center'>
      <h1 className={`${bree.className} basis-full text-center font-bold text-2xl xs:text-3xl leading-loose tracking-wide`}>
        Your Favorited Animals
      </h1>
      <div id='pet-links-container' className='flex flex-wrap flex-col sm:flex-row mx-auto justify-center items-center text-black overflow-hidden'>
        {await likedAnimalsInfoArrFiltered.map((element) => {
          return <div className='relative self-start sm:self-auto w-[100%] basis-full sm:basis-1/3 mx-auto mb-8 md:my-8'><div className='flex flex-wrap justify-center items-center text-center'>
                    {/* <LikeButton animalId={element.id} liked={ userLikes !== undefined ? (userLikes.includes(element.id) === true ? true : false) : false } /> */}
                    <Link href={`/animal/${element.id}`} className='basis-full p-4 shadow-md rounded-3xl flex flex-wrap bg-white items-center'>
                      <div className='basis-full'>
                        <img src={element.primary_photo_cropped !== null ? element.primary_photo_cropped.medium : 'https://pet-adoption-app.s3.us-west-1.amazonaws.com/no-photo-image.jpg'} className='object-cover h-[200px] m-auto rounded-3xl border-2 border-pink'></img>
                      </div>
                      <div className='justify-self-start mx-auto'>
                        <div className={`font-bold ${element.name.length >= 22 ? 'text-base sm:text-xl' : 'text-xl sm:text-2xl'}`}>{element.name.toUpperCase()}</div>
                        <div>{element.breeds.primary}{element.breeds.secondary !== null ? ` Mix` : ''}</div>
                        <div>{element.age} {element.gender} {element.species}</div>
                      </div>
                    </Link>
                  </div></div>;
        })}
      </div>
    </div>
  )
}