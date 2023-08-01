import fetchData from '../../../../../utilities/fetch-data';
import checkLiked from '@/utilities/check-liked';
import Link from 'next/link';
import SwipeButton from '@/components/swipe-button';
import LikeButton from '@/components/like-button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SignInButtonPopup from '@/components/signin-button-popup';

export default async function Pets({ params }) {
  let userLikes;

  const data = await fetchData(params.pets, params.state, params.city);
  const session = await getServerSession(authOptions);

  if (session) userLikes = await checkLiked();

  // Find way to pass already fetched data down to the individual pet pages to avoid re-fetching

  // console.log('data.animals: ', await data.animals);

  return (
    <div className='h-[90vh] h-[90svh] flex flex-wrap flex-col items-center'>
      <div id='pet-links-container' className='w-[100vw] flex items-center text-black overflow-hidden self-start shadow-md rounded-b-3xl z-10'>
        { await data.animals.map((element) => {
          return <div className='relative self-start sm:basis-1/3 md:my-8'><div className='flex flex-wrap w-[100vw] justify-center items-center sm:h-[25vh] text-center'>
                    <LikeButton animalId={element.id} liked={ userLikes !== undefined ? (userLikes.includes(element.id) === true ? true : false) : false } />
                    <SignInButtonPopup />
                    <Link href={`/search/${params.state}/${params.city}/${params.pets}/${element.id}`} className='basis-full p-4 flex flex-wrap bg-white items-center'>
                      {/* <div className='bg-center bg-no-repeat bg-cover h-[100%]' style={{ backgroundImage: `url('${element.primary_photo_cropped !== null ? element.primary_photo_cropped.small : ''}')` }}></div> */}
                      {/* <div className='basis-full h-[65vh] h-[65svh] w-fit relative overflow-hidden'>
                        <img src={element.primary_photo_cropped !== null ? element.primary_photo_cropped.small : 'https://pet-adoption-app.s3.us-west-1.amazonaws.com/no-photo-image.jpg'} className='w-[300px] absolute top-[-9999px] right-[-9999px] bottom-[-9999px] left-[-9999px] m-auto'></img>
                      </div> */}
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
      </div>
      <SwipeButton />
    </div>
  )
}