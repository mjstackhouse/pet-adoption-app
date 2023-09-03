import fetchData from '../../../../../utilities/fetch-data';
import checkLiked from '@/utilities/check-liked';
import Link from 'next/link';
import SwipeButton from '@/components/swipe-button';
import LikeButton from '@/components/like-button';
import SigninForm from '@/components/signin-form';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SignInButtonPopup from '@/components/signin-button-popup';
import ChangePageButtons from '@/components/change-page-buttons';
import SearchFiltersButton from '@/components/search-filters-button';
import { Bree_Serif } from 'next/font/google';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default async function Pets({ params, searchParams }) {
  let userLikes;
  let data;

  if (searchParams.breed || searchParams.age || searchParams.size) {
    data = await fetchData(params.pets, params.state, params.city, searchParams.hasOwnProperty('page') ? searchParams.page : 1, searchParams);
  }
  else {
    data = await fetchData(params.pets, params.state, params.city, searchParams.hasOwnProperty('page') ? searchParams.page : 1);
  }
  
  const breedData = await fetchData(params.pets);
  const session = await getServerSession(authOptions);

  if (session) userLikes = await checkLiked();

  return (
    <div id='search-results' className='relative h-[90vh] h-[90svh] md:h-auto xl:w-[1280px] flex flex-wrap flex-col xl:flex-row items-center xl:justify-center xl:mx-auto'>
      <SearchFiltersButton parameters={params} breeds={breedData} searchParameters={searchParams} />
      <div id='pet-links-container' className='relative xl:self-end w-[100vw] md:max-w-[768px] lg:max-w-[960px] xl:w-[960px] my-auto flex flex-wrap items-center overflow-x-hidden text-black self-start rounded-3xl z-10 md:z-0'>
        { await data.animals.length > 0 ? await data.animals.map((element) => {
          return <div id='pet-link' className='relative self-start md:basis-1/2 lg:basis-1/3 xl:basis-auto w-[100vw] xl:w-[315px] md:p-4'>
                  <div className='flex flex-wrap bg-white m-4 sm:m-0 md:flex-col md:w-auto justify-center items-center md:h-[45vh] text-center hover:shadow-md rounded-3xl'>
                    <LikeButton parameters={params} animalId={element.id} liked={ userLikes !== undefined ? (userLikes.includes(element.id) === true ? true : false) : false } />
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
                  </div>
                </div>;
        }) : <div className='h-full m-auto text-center'>
                <h1 className={`${bree.className} font-bold text-3xl md:text-4xl leading-snug tracking-wide mb-2`}>Sorry, no animals found matching those filters.</h1>
                <p className='basis-full text-base md:text-lg'>Try changing the filters.</p>
              </div> }
        { data.animals.length > 0 ? <div className='w-[100vw] flex'>
          <ChangePageButtons parameters={params} searchParameters={searchParams} dataLength={await data.animals.length} />
        </div> : '' }
      </div>
    </div>
  )
}