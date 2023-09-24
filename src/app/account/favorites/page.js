import fetchData from '@/utilities/fetch-data';
import checkLiked from '@/utilities/check-liked';
import fetchLiked from '@/utilities/fetch-liked';
import fetchLikedArr from '@/utilities/fetch-liked-arr';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
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
  const likedAnimalsInfoArr = await fetchLiked();

  console.log('likedAnimalsInfoArr: ', await likedAnimalsInfoArr);

  // if (likedAnimalsInfoArr !== 'No favorited animals') {
  //   likedAnimalsInfoArrFiltered = await likedAnimalsInfoArr.filter((element) => element !== 'Not found');
  // }

  // console.log('likedAnimalsInfoArrFiltered: ', likedAnimalsInfoArrFiltered);

  // console.log('typeof await fetchLikedArr(): ', typeof await fetchLikedArr());

  // const likedAnimalsInfoArr = await likedAnimalsInfo.slice();
  // console.log('likedAnimalsInfoArr: ', likedAnimalsInfoArr);
  
  // const session = await getServerSession(authOptions);

  // if (session) userLikes = await checkLiked();

  // Fetch the user's likedAnimals from the database
  // Then fetch each of those animals from the PetFinder API

  return (
    <div className='relative md:h-auto xl:w-[1280px] flex flex-wrap flex-col xl:flex-row items-center xl:justify-center xl:mx-auto'>
      <h1 className={`${bree.className} basis-full text-center font-bold text-3xl sm:text-4xl leading-loose tracking-wide pb-2 sm:pb-4 pt-2 sm:pt-8`}>
        Your Favorited Animals
      </h1>
      <div id='pet-links-container' className='relative gap-y-8 md:gap-x-8 py-8 px-8 xl:self-end w-[100vw] md:max-w-[768px] lg:max-w-[960px] xl:w-[960px] flex flex-wrap items-center overflow-x-hidden text-black self-start z-10 md:z-0'>
        { likedAnimalsInfoArr === 'No favorited animals' ? <div>No favorited animals</div> : await likedAnimalsInfoArr.map((element) => {
          return <div className='relative md:w-[336px] lg:w-[277px]'>
                    <div className='relative flex flex-wrap bg-white md:flex-col md:w-auto justify-center items-center min-h-[330px] md:max-h-[500px] text-center hover:shadow-md rounded-3xl overflow-y-hidden'>
                      <Link href={`/animal/${element.id}`} className='basis-full flex flex-wrap content-normal bg-transparent items-center group'>
                        <div className='self-start basis-full flex h-[60vh] md:h-[33vh] lg:h-[33vh] overflow-hidden relative'>
                          {element.info.photo === null ? <div className='absolute inset-0 flex items-center justify-center'><p className='basis-full bg-black py-2 text-white font-bold tracking-wider drop-shadow-lg'>No Photo Available</p></div> : null}
                          <img src={element.info.photo !== null ? element.info.photo.medium : '/no-photos-img-2.jpg'} className='grow object-cover object-center h-[60vh] md:h-[33vh] lg:h-[33vh] m-auto'></img>
                        </div>
                        <div className='justify-self-start mx-auto group-hover:underline underline-offset-4 py-4'>
                          <div className={`${bree.className} text-darker-purple font-bold mx-auto text-ellipsis whitespace-nowrap overflow-hidden w-[80vw] md:w-[175px] lg:w-[200px] text-3xl`}>{element.info.name.toUpperCase()}</div>
                          <div className='mx-auto text-ellipsis whitespace-nowrap overflow-hidden w-[80vw] md:w-[175px] lg:w-[200px]'>{element.info.breed}</div>
                          <div>{element.info.ageGenderSpecies}</div>
                        </div>
                      </Link>
                    </div>
                  </div>;
        })}
      </div>
      <div className='basis-full my-4 sm:my-8 py-4 text-center'>
        <Link href='/' className='font-bold tracking-wider bg-yellow hover:bg-darker-yellow text-black px-4 py-2 rounded-3xl hover:underline underline-offset-4 group'>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='h-[1rem] mr-2 group-hover:scale-125 transition-transform' />
          Continue looking for animals to adopt
        </Link>
      </div>
    </div>
  )
}