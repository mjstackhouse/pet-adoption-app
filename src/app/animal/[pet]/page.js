import fetchData from '../../../utilities/fetch-data';
import checkLiked from '@/utilities/check-liked';
import LikeButton from '@/components/like-button';
import SignInButtonPopup from '@/components/signin-button-popup';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Bree_Serif } from 'next/font/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX, faEnvelope, faPhone, faXmark } from '@fortawesome/free-solid-svg-icons';
import AnimalPhotoGallery from '@/components/animal-photo-gallery';
import Link from 'next/link';
import BackToSearchBtn from '@/components/back-to-search-btn';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default async function PetPage({ params }) {

  let userLikes;

  const session = await getServerSession(authOptions);

  if (session) userLikes = await checkLiked();

  const data = await fetchData(params.pet);

  console.log('data.animal.description: ', await data.animal.photos);

  return (
    <div className='flex flex-wrap items-center content-center max-w-[900px]'>
      <div className='relative mx-4 sm:mx-0'>
        <div className='flex flex-wrap bg-white rounded-b-3xl px-4 sm:px-8 py-4 sm:py-8 mb-4'>
          <BackToSearchBtn />
          <div className='basis-full text-center pb-4 mb-4 border-b-[1px]'>
            <h1 className={`${bree.className} basis-full font-bold text-3xl sm:text-4xl mb-4 leading-snug tracking-wide`}>{await data.animal.name.toUpperCase()}</h1>
            <div className='flex justify-start bg-local w-full h-[50vh] mb-2 sm:mb-4'>
              {/* { await data.animal.photos.length > 0 ? data.animal.photos.map((element) => {
                return <img src={element.large !== null ? element.large : null} className='basis-full w-full shadow-lg mx-4 my-4 object-cover' />
              }) : <img src='https://pet-adoption-app.s3.us-west-1.amazonaws.com/no-photo-image.jpg' className='basis-full w-full shadow-lg my-4 object-cover' /> } */}
              { await data.animal.photos.length > 0 ? <AnimalPhotoGallery photos={data.animal.photos} /> : <img src='https://pet-adoption-app.s3.us-west-1.amazonaws.com/no-photo-image.jpg' className='basis-full w-full shadow-lg my-4 object-cover' /> }
            </div>
            <p className='text-left sm:text-center'><span className='font-bold tracking-wider'>About Me</span></p>
            { await data.animal.description !== null ? <p className='text-left sm:text-center'>{data.animal.description}</p> : null }
          </div>
          <div className='basis-full sm:basis-1/2 flex flex-wrap pb-4 mb-4 border-b-[1px]'>
              <p className='basis-full'><span className='font-bold tracking-wider'>Breed </span>- </p>
              <p className='indent-2 basis-full'><span className='italic'>Primary:</span> {await data.animal.breeds.primary}</p>
              {await data.animal.breeds.secondary !== null ? <p className='indent-2'><span className='italic'>Secondary:</span> {data.animal.breeds.secondary}</p> : null}
              <p className='basis-full'><span className='font-bold tracking-wider'>Age </span>- {await data.animal.age}</p>
              <p className='basis-full'><span className='font-bold tracking-wider'>Sex </span>- {await data.animal.gender}</p>
              <p className='basis-full'><span className='font-bold tracking-wider'>Size </span>- {await data.animal.size}</p>
          </div>
          <div className='basis-full sm:basis-1/2 flex flex-wrap pb-4 mb-4 border-b-[1px]'>
            <p className='font-bold tracking-wider'>Attributes</p>
            { await data.animal.attributes.spayed_neutered === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-green align-text-bottom' icon={faCheck} />Spayed/Neutered</p> : data.animal.attributes.spayed_neutered !== null ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-red align-text-bottom' icon={faXmark} />Spayed/Neutered</p> : null }
            { await data.animal.attributes.house_trained === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-green align-text-bottom' icon={faCheck} />House-trained</p> : data.animal.attributes.house_trained !== null ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-red align-text-bottom' icon={faXmark} />House-trained</p> : null }
            { await data.animal.attributes.declawed === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-green align-text-bottom' icon={faCheck} />Declawed</p> : data.animal.attributes.declawed !== null ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-red align-text-bottom' icon={faXmark} />Declawed</p> : null }
            { await data.animal.attributes.special_needs === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-green align-text-bottom' icon={faCheck} />Special needs</p> : data.animal.attributes.special_needs !== null ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-red align-text-bottom' icon={faXmark} />Special needs</p> : null }
            { await data.animal.attributes.shots_current === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-green align-text-bottom' icon={faCheck} />Shots current</p> : data.animal.attributes.shots_current !== null ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-red align-text-bottom' icon={faXmark} />Shots current</p> : null }
          </div>
          { await data.animal.environment.children !== null || data.animal.environment.dogs !== null || data.animal.environment.cats !== null ? 
          <div className='basis-full sm:basis-1/2 flex flex-wrap pb-4 mb-4 border-b-[1px]'>
            <p className='font-bold tracking-wider'>Environment -</p>
            { await data.animal.environment.children === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-green align-text-bottom' icon={faCheck} />Good with children</p> : data.animal.environment.children !== null ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-red align-text-bottom' icon={faXmark} />Good with children</p> : null }
            { await data.animal.environment.dogs === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-green align-text-bottom' icon={faCheck} />Good with dogs</p> : data.animal.environment.dogs !== null ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-red align-text-bottom' icon={faXmark} />Good with dogs</p> : null }
            { await data.animal.environment.cats === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-green align-text-bottom' icon={faCheck} />Good with cats</p> : data.animal.environment.cats !== null ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-red align-text-bottom' icon={faXmark} />Good with cats</p> : null }
          </div>
          : null}
          <div className='basis-full sm:basis-1/2 pb-4 mb-4 border-b-[1px]'>
            <p className='font-bold tracking-wider'>Contact -</p>
            { await data.animal.contact.email !== null ? <a href={`mailto:${data.animal.contact.email}`} className='w-full text-ellipsis whitespace-nowrap overflow-hidden'><FontAwesomeIcon className='inline h-[1rem] mr-2' icon={faEnvelope} />{data.animal.contact.email}</a> : null }
            { await data.animal.contact.phone !== null ? <p className='w-full'><FontAwesomeIcon className='inline h-[1rem] mr-2' icon={faPhone} />{data.animal.contact.phone}</p> : null}
          </div>
        </div>
        <div className='sticky bottom-[1rem] sm:bottom-[4rem] flex items-center justify-end'>
          <SignInButtonPopup parameters={params} />
          <LikeButton parameters={params} animalId={data.animal.id} liked={ userLikes !== undefined ? (userLikes.includes(data.animal.id) === true ? true : false) : false } />        
        </div>
      </div>
    </div>
  )
}