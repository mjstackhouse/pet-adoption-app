import fetchData from '../../../../../utilities/fetch-data';
import checkLiked from '@/utilities/check-liked';
import Link from 'next/link';
import SwipeButton from '@/components/swipe-button';
import LikeButton from '@/components/like-button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SignInButtonPopup from '@/components/signin-button-popup';
import ChangePageButton from '@/components/change-page-button';
import SearchFiltersButton from '@/components/search-filters-button';
import { Bree_Serif } from 'next/font/google';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default async function Pets({ params, searchParams }) {
  let userLikes;
  let data;

  console.log('params: ', params);
  console.log('searchParams: ', searchParams);

  if (searchParams.breed || searchParams.age || searchParams.size) {
    data = await fetchData(params.pets, params.state, params.city, searchParams.hasOwnProperty('page') ? searchParams.page : 1, searchParams);
    // console.log('data: ', await data);
  }
  else {
    data = await fetchData(params.pets, params.state, params.city, searchParams.hasOwnProperty('page') ? searchParams.page : 1);
    // console.log('data: ', await data);
  }
  
  const breedData = await fetchData(params.pets);
  const session = await getServerSession(authOptions);

  if (session) userLikes = await checkLiked();

  return (
    <div className='relative h-[90vh] h-[90svh] md:h-auto xl:w-[1280px] flex flex-wrap flex-col xl:flex-row items-center xl:justify-center xl:mx-auto'>
      <SearchFiltersButton breeds={breedData} />
      <div id='pet-links-container' className='relative xl:self-end w-[100vw] md:max-w-[900px] xl:max-w-[960px] xl:w-[960px] my-auto flex md:flex-wrap items-center text-black overflow-hidden self-start rounded-b-3xl md:rounded-b-none z-10 md:z-0'>
        { await data.animals.length > 0 ? await data.animals.map((element) => {
          return <div className='relative self-start md:basis-1/3 xl:basis-auto xl:w-[315px] md:p-4'><div className='flex flex-wrap bg-white md:flex-col w-[100vw] md:w-auto justify-center items-center md:h-[45vh] text-center hover:shadow-md rounded-b-3xl md:rounded-b-0 rounded-none md:rounded-3xl'>
                    <LikeButton parameters={params} animalId={element.id} liked={ userLikes !== undefined ? (userLikes.includes(element.id) === true ? true : false) : false } />
                    <SignInButtonPopup parameters={params} />
                    <Link href={`/animal/${element.id}`} className='basis-full p-4 flex flex-wrap bg-transparent items-center'>
                      <div className='basis-full'>
                        <img src={element.primary_photo_cropped !== null ? element.primary_photo_cropped.medium : 'https://pet-adoption-app.s3.us-west-1.amazonaws.com/no-photo-image.jpg'} className='object-cover h-[60vh] mb-2 md:mb-0 md:h-[30vh] m-auto border-2 border-pink'></img>
                      </div>
                      <div className='justify-self-start mx-auto'>
                        <div className={`font-bold mx-auto text-ellipsis whitespace-nowrap overflow-hidden w-[85vw] md:w-[175px] lg:w-[200px] ${element.name.length >= 22 ? 'text-base md:text-xl' : 'text-xl md:text-3xl'}`}>{element.name.toUpperCase()}</div>
                        <div className='mx-auto text-ellipsis whitespace-nowrap overflow-hidden w-[85vw] md:w-[175px] lg:w-[200px]'>{element.breeds.primary}{element.breeds.secondary !== null ? ` Mix` : ''}</div>
                        <div>{element.age} {element.gender} {element.species}</div>
                      </div>
                    </Link>
                  </div></div>;
        }) : <div className='h-full m-auto text-center'>
                <h1 className={`${bree.className} font-bold text-3xl md:text-4xl leading-snug tracking-wide mb-2`}>Sorry, no animals found matching those filters.</h1>
                <p className='basis-full text-base md:text-lg'>Try changing the filters.</p>
              </div> }
        { data.animals.length > 0 ? <div className='w-[100vw] flex'>
          <ChangePageButton parameters={params} searchParameters={searchParams} />
        </div> : '' }
      </div>
      { data.animals.length > 0 ? <SwipeButton /> : '' }
      {/* <SearchFiltersButton breeds={breedData} /> */}
    </div>
  )
}