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
  
  const noPhotosImg = '/no-photos-img-2.jpg';

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

  if (session) {
    userLikes = await checkLiked();
  }

  return (
    <div id='search-results' className='relative md:h-auto xl:w-[1280px] flex flex-wrap flex-col xl:flex-row items-center xl:justify-center xl:mx-auto'>
      <SearchFiltersButton parameters={params} searchParameters={searchParams} breeds={breedData} />
      <div id='pet-links-container' className='relative gap-y-8 md:gap-x-8 py-8 px-8 w-[100vw] md:max-w-[768px] lg:max-w-[960px] xl:w-[960px] xl:min-h-[calc(100vh-180px)] flex flex-wrap items-center overflow-x-hidden text-black self-start z-10 md:z-0'>
        { await data.animals.length > 0 ? await data.animals.map((element) => {
          return <div key={data.animals.id} className='relative md:w-[336px] lg:w-[277px]'>
                  <div className='relative flex flex-wrap bg-white md:flex-col md:w-auto justify-center items-center min-h-[330px] md:max-h-[500px] text-center hover:shadow-md rounded-3xl overflow-y-hidden'>
                    <LikeButton parameters={params} animalInfo={{ id: element.id, info: { name: element.name, photo: element.primary_photo_cropped !== null ? element.primary_photo_cropped : null, breed: `${element.breeds.primary}${element.breeds.secondary !== null ? ' Mix' : ''}`, ageGenderSpecies: `${element.age} ${element.gender} ${element.species}`} }} liked={ userLikes !== undefined ? ((userLikes.filter((e) => e.id === element.id)).length > 0 ? true : false) : false } />
                    <Link href={`/animal/${element.id}`} className='basis-full flex flex-wrap content-normal bg-transparent items-center group'>
                      <div className='self-start basis-full flex h-[60vh] md:h-[33vh] lg:h-[33vh] overflow-hidden relative'>
                        {element.primary_photo_cropped === null ? <div className='absolute inset-0 flex items-center justify-center'><p className='basis-full bg-black py-2 text-white font-bold tracking-wider drop-shadow-lg'>No Photo Available</p></div> : null}
                        <img src={element.primary_photo_cropped !== null ? element.primary_photo_cropped.medium : noPhotosImg} alt={`${element.age.toLowerCase()} ${element.gender.toLowerCase()} ${element.breeds.primary.toLowerCase()}`} className='grow object-cover object-center h-[60vh] md:h-[33vh] lg:h-[33vh] m-auto' />
                      </div>
                      <div className='justify-self-start mx-auto group-hover:underline underline-offset-4 py-4'>
                        <div className={`${bree.className} text-darker-purple font-bold mx-auto text-ellipsis whitespace-nowrap overflow-hidden w-[80vw] md:w-[175px] lg:w-[200px] text-3xl`}>{element.name.toUpperCase()}</div>
                        <div className='mx-auto text-ellipsis whitespace-nowrap overflow-hidden w-[80vw] md:w-[175px] lg:w-[200px]'>{element.breeds.primary}{element.breeds.secondary !== null ? ` Mix` : ''}</div>
                        <div>{element.age} {element.gender} {element.species}</div>
                      </div>
                    </Link>
                  </div>
                </div>;
        }) : <div className='basis-full xl:min-h-[calc(100vh-180px-6rem)] m-auto text-center flex flex-wrap content-center'>
                <h1 className={`${bree.className} basis-full font-bold text-3xl md:text-4xl leading-snug tracking-wide mb-2`}>Sorry, no animals found matching those filters.</h1>
                <p className='basis-full text-base md:text-lg'>Try changing the filters.</p>
              </div> }
              <div className='w-[100vw] flex'><ChangePageButtons parameters={params} searchParameters={searchParams} dataLength={data.animals.length} /></div>
      </div>
    </div>
  )
}