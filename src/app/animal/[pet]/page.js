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
  
  let description;

  if (await data.animal.description !== null) {
    description = data.animal.description.replace('&amp;#39;', "'");
  }

  return (
    <div className='mx-auto flex flex-wrap items-center content-center sm:max-w-[600px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1100px]'>
      <div className='relative mx-4 sm:mx-0'>
        <div className='flex flex-wrap bg-white px-4 sm:px-8 py-4 sm:py-8 min-h-[calc(100svh-160px)] min-h-[calc(100vh-160px)] sm:min-h-[calc(100svh-180px)] sm:min-h-[calc(100vh-180px)]'>
          <BackToSearchBtn />
          <div className='basis-full xl:basis-1/2 text-center mb-0 sm:mb-4 flex flex-col'>
            <div className='flex justify-start bg-local w-full h-[50vh] xl:h-auto grow mb-2 sm:mb-4'>
              { await data.animal.photos.length > 0 ? <AnimalPhotoGallery photos={data.animal.photos} /> : <div className='w-full'><div className='basis-full overflow-hidden w-full h-[50vh] flex items-center justify-center bg-gray relative'><div className='absolute inset-0 flex items-center justify-center'><p className='basis-full bg-black py-2 text-white font-bold tracking-wider drop-shadow-lg'>No Photos Available</p></div><img src='/no-photos-img-2.jpg'/></div></div> }
            </div>
          </div>
          <div className='basis-full xl:basis-1/2 xl:pl-8'>
            <div className='basis-full text-center border-b-[1px] border-darker-gray pb-4 mb-4'>
              <h1 className={`${bree.className} text-darker-purple basis-full font-bold text-3xl sm:text-4xl mb-2 sm:mb-4 leading-snug tracking-wide text-left`}>{await data.animal.name.toUpperCase()}</h1>
              { await data.animal.description !== null ? <div className='mb-4'><p className='text-left'><span className='font-bold tracking-wider text-left'>About Me</span></p><p id='animal-description' className='text-left relative'>{description}</p></div> : null }
              { await data.animal.description !== null ? <div className='basis-full text-left'><Link className='font-bold tracking-wider underline underline-offset-4 hover:text-darker-purple' href={data.animal.url} target='_blank'>Learn more about <span className='text-darker-purple'>{data.animal.name}</span> on petfinder.com</Link></div> : null }
            </div>
            <div className='basis-full sm:basis-1/2 flex flex-wrap pb-4 mb-4 border-b-[1px] border-darker-gray'>
                <p className='basis-full'><span className='font-bold tracking-wider'>Breed </span>- </p>
                <p className='indent-2 basis-full'><span>Primary:</span> {await data.animal.breeds.primary}</p>
                {await data.animal.breeds.secondary !== null ? <p className='indent-2'><span>Secondary:</span> {data.animal.breeds.secondary}</p> : null}
                <p className='basis-full'><span className='font-bold tracking-wider'>Age </span>- {await data.animal.age}</p>
                <p className='basis-full'><span className='font-bold tracking-wider'>Sex </span>- {await data.animal.gender}</p>
                <p className='basis-full'><span className='font-bold tracking-wider'>Size </span>- {await data.animal.size}</p>
            </div>
            <div className='basis-full sm:basis-1/2 flex flex-wrap pb-4 mb-4 border-b-[1px] border-darker-gray'>
              <p className='font-bold tracking-wider'>Attributes</p>
              { await data.animal.attributes.spayed_neutered === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-green align-text-bottom' icon={faCheck} />Spayed/Neutered</p> : data.animal.attributes.spayed_neutered !== null ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-red align-text-bottom' icon={faXmark} />Spayed/Neutered</p> : null }
              { await data.animal.attributes.house_trained === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-green align-text-bottom' icon={faCheck} />House-trained</p> : data.animal.attributes.house_trained !== null ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-red align-text-bottom' icon={faXmark} />House-trained</p> : null }
              { await data.animal.attributes.declawed === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-green align-text-bottom' icon={faCheck} />Declawed</p> : data.animal.attributes.declawed !== null ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-red align-text-bottom' icon={faXmark} />Declawed</p> : null }
              { await data.animal.attributes.special_needs === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-green align-text-bottom' icon={faCheck} />Special needs</p> : data.animal.attributes.special_needs !== null ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-red align-text-bottom' icon={faXmark} />Special needs</p> : null }
              { await data.animal.attributes.shots_current === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-green align-text-bottom' icon={faCheck} />Shots current</p> : data.animal.attributes.shots_current !== null ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-red align-text-bottom' icon={faXmark} />Shots current</p> : null }
            </div>
            { await data.animal.environment.children !== null || data.animal.environment.dogs !== null || data.animal.environment.cats !== null ? 
            <div className='basis-full sm:basis-1/2 flex flex-wrap pb-4 mb-4 border-b-[1px] border-darker-gray'>
              <p className='font-bold tracking-wider'>Environment</p>
              { await data.animal.environment.children === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-green align-text-bottom' icon={faCheck} />Good with children</p> : data.animal.environment.children !== null ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-red align-text-bottom' icon={faXmark} />Good with children</p> : null }
              { await data.animal.environment.dogs === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-green align-text-bottom' icon={faCheck} />Good with dogs</p> : data.animal.environment.dogs !== null ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-red align-text-bottom' icon={faXmark} />Good with dogs</p> : null }
              { await data.animal.environment.cats === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-green align-text-bottom' icon={faCheck} />Good with cats</p> : data.animal.environment.cats !== null ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] w-[1rem] mr-2 text-red align-text-bottom' icon={faXmark} />Good with cats</p> : null }
            </div>
            : null}
            <div className='basis-full sm:basis-1/2 pb-4 mb-4 border-b-[1px] border-darker-gray'>
              <p className='font-bold tracking-wider'>Contact</p>
              { await data.animal.contact.email !== null ? <a href={`mailto:${data.animal.contact.email}`} className='w-full text-ellipsis whitespace-nowrap overflow-hidden hover:underline underline-offset-4 group'><FontAwesomeIcon className='inline h-[1rem] mr-2 group-hover:scale-125 transition-all' icon={faEnvelope} />{data.animal.contact.email}</a> : null }
              { await data.animal.contact.phone !== null ? <div className='w-full'><p className='group'><FontAwesomeIcon className='inline h-[1rem] mr-2 group-hover:scale-125 transition-all' icon={faPhone} />{data.animal.contact.phone}</p></div> : null}
            </div>
            <span className='hidden xl:block'><LikeButton parameters={params} animalId={data.animal.id} liked={ userLikes !== undefined ? (userLikes.includes(data.animal.id) === true ? true : false) : false } /></span>
          </div>
        </div>
        <div className='fixed bottom-[1rem] left-0 right-0 sm:bottom-[90px] flex items-center justify-center z-40 xl:hidden'>
          <LikeButton parameters={params} animalId={data.animal.id} liked={ userLikes !== undefined ? (userLikes.includes(data.animal.id) === true ? true : false) : false } />        
        </div>
      </div>
    </div>
  )
}