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
  let likedAnimalsInfoArrFiltered;

  // const likedAnimalsInfoArr = await fetchLikedArr();
  const likedAnimalsInfoArr = await fetchLikedArr();
  console.log('likedAnimalsInfoArr: ', await likedAnimalsInfoArr);

  if (likedAnimalsInfoArr !== 'No favorited animals') {
    likedAnimalsInfoArrFiltered = await likedAnimalsInfoArr.filter((element) => element !== 'Not found');
  }

  console.log('likedAnimalsInfoArrFiltered: ', likedAnimalsInfoArrFiltered);

  // console.log('typeof await fetchLikedArr(): ', typeof await fetchLikedArr());

  // const likedAnimalsInfoArr = await likedAnimalsInfo.slice();
  // console.log('likedAnimalsInfoArr: ', likedAnimalsInfoArr);
  const session = await getServerSession(authOptions);

  if (session) userLikes = await checkLiked();

  // Fetch the user's likedAnimals from the database
  // Then fetch each of those animals from the PetFinder API

  return (
    <div className='relative md:h-auto xl:w-[1280px] flex flex-wrap flex-col xl:flex-row items-center xl:justify-center xl:mx-auto'>
      <h1 className={`${bree.className} basis-full text-center font-bold text-3xl sm:text-4xl leading-loose tracking-wide py-2 sm:py-4`}>
        Your Favorited Animals
      </h1>
      <div id='pet-links-container' className='relative xl:self-end w-[100vw] md:max-w-[768px] lg:max-w-[960px] xl:w-[960px] my-auto flex flex-wrap items-center overflow-x-hidden text-black self-start rounded-3xl z-10 md:z-0'>
        { likedAnimalsInfoArr === 'No favorited animals' ? <div>No favorited animals</div> : await likedAnimalsInfoArrFiltered.map((element) => {
          return <div className='relative self-start md:basis-1/2 lg:basis-1/3 xl:basis-auto w-[100vw] xl:w-[315px] md:p-4'>
                    <div className='flex flex-wrap bg-white m-4 sm:m-0 md:flex-col md:w-auto justify-center items-center md:h-[45vh] text-center hover:shadow-md rounded-3xl'>
                      <Link href={`/animal/${element.id}`} className='basis-full p-4 flex flex-wrap bg-transparent items-center'>
                        <div className='basis-full'>
                          <img src={element.primary_photo_cropped !== null ? element.primary_photo_cropped.medium : 'https://pet-adoption-app.s3.us-west-1.amazonaws.com/no-photo-image.jpg'} className='object-cover h-[60vh] mb-2 md:mb-0 md:h-[30vh] m-auto border-2 border-pink'></img>
                        </div>
                        <div className='justify-self-start mx-auto'>
                          <div className={`${bree.className} font-bold mx-auto text-ellipsis whitespace-nowrap overflow-hidden w-[85vw] md:w-[175px] lg:w-[200px] ${element.name.length >= 22 ? 'text-base sm:text-xl' : 'text-xl sm:text-3xl'}`}>{element.name.toUpperCase()}</div>
                          <div className='mx-auto text-ellipsis whitespace-nowrap overflow-hidden w-[85vw] md:w-[175px] lg:w-[200px]'>{element.breeds.primary}{element.breeds.secondary !== null ? ` Mix` : ''}</div>
                          <div>{element.age} {element.gender} {element.species}</div>
                        </div>
                      </Link>
                    </div>
                  </div>;
        })}
      </div>
      <div className='basis-full my-4 sm:my-8 py-4 text-center'>
        <Link href='/' className='font-bold tracking-wider bg-blue hover:bg-darker-blue text-black px-4 py-2 rounded-3xl hover:underline underline-offset-4'>Continue looking for animals to adopt</Link>
      </div>
    </div>
  )
}