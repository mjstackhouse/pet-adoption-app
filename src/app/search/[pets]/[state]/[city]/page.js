import fetchData from '../../../../../utilities/fetch-data';
import checkLiked from '@/utilities/check-liked';
import Link from 'next/link';
import SwipeButton from '@/components/swipe-button';
import LikeButton from '@/components/like-button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SignInButtonPopup from '@/components/signin-button-popup';
import ChangePageButton from '@/components/change-page-button';

export default async function Pets({ params, searchParams }) {
  let userLikes;

  console.log('params: ', params);
  console.log('searchParams: ', searchParams);

  const data = await fetchData(params.pets, params.state, params.city, searchParams.hasOwnProperty('page') ? searchParams.page : 1);
  const session = await getServerSession(authOptions);

  if (session) userLikes = await checkLiked();

  return (
    <div className='h-[90vh] h-[90svh] flex flex-wrap flex-col items-center'>
      <div id='pet-links-container' className='w-[100vw] flex items-center text-black overflow-hidden self-start shadow-md rounded-b-3xl z-10'>
        { await data.animals.map((element) => {
          return <div className='relative self-start sm:basis-1/3 md:my-8'><div className='flex flex-wrap w-[100vw] justify-center items-center sm:h-[25vh] text-center'>
                    <LikeButton animalId={element.id} liked={ userLikes !== undefined ? (userLikes.includes(element.id) === true ? true : false) : false } />
                    <SignInButtonPopup />
                    <Link href={`/animal/${element.id}`} className='basis-full p-4 flex flex-wrap bg-white items-center'>
                      <div className='basis-full'>
                        <img src={element.primary_photo_cropped !== null ? element.primary_photo_cropped.medium : 'https://pet-adoption-app.s3.us-west-1.amazonaws.com/no-photo-image.jpg'} className='object-cover h-[60vh] m-auto border-2 border-pink'></img>
                      </div>
                      <div className='justify-self-start mx-auto'>
                        <div className={`font-bold ${element.name.length >= 22 ? 'text-base sm:text-xl' : 'text-xl sm:text-3xl'}`}>{element.name.toUpperCase()}</div>
                        <div>{element.breeds.primary}{element.breeds.secondary !== null ? ` Mix` : ''}</div>
                        <div>{element.age} {element.gender} {element.species}</div>
                      </div>
                    </Link>
                  </div></div>;
        })}
        <div className='w-[100vw] flex'>
          <ChangePageButton parameters={params} searchParameters={searchParams} />
        </div>
      </div>
      <SwipeButton />
      {/* <ChangePageButton parameters={params} searchParameters={searchParams} /> */}
    </div>
  )
}