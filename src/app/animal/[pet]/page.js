import fetchData from '../../../utilities/fetch-data';
import { Bree_Serif } from 'next/font/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { faEvernote } from '@fortawesome/free-brands-svg-icons';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default async function PetPage({ params }) {
  console.log('params', params);

  const data = await fetchData(params.pet);

  console.log('dog data', await data.animal);

  return (
    <div className='flex flex-wrap items-center content-center max-w-[900px]'>
      <div className='mx-4 sm:mx-0'>
        <div className='bg-white rounded-b-3xl px-4 sm:px-8 py-4 sm:py-8 mb-4'>
          <h1 className={`${bree.className} text-center basis-full font-bold text-3xl sm:text-6xl mb-4 leading-snug tracking-wide sm:mb-2`}>{await data.animal.name.toUpperCase()}</h1>
          <div className='basis-full text-center mb-4'>
            <img className='mx-auto mb-2' src={await data.animal.photos[0].medium} />
            { await data.animal.description !== null ? <p>{data.animal.description}</p> : null }
          </div>
          <div className='basis-full flex flex-wrap mb-4'>
            {/* <div className='basis-1/2'> */}
              <p className='basis-full'><span className='font-bold tracking-wider'>Breed: </span></p>
              <p className='indent-2'>Primary: {await data.animal.breeds.primary}</p>
              {await data.animal.breeds.secondary !== null ? <p className='indent-2'>Secondary: {data.animal.breeds.secondary}</p> : null}
              <p className='basis-full'><span className='font-bold tracking-wider'>Age: </span>{await data.animal.age}</p>
              <p className='basis-full'><span className='font-bold tracking-wider'>Sex: </span>{await data.animal.gender}</p>
              <p className='basis-full'><span className='font-bold tracking-wider'>Size: </span>{await data.animal.size}</p>
            {/* </div> */}
            {/* <div className='basis-1/2'>
              { data.animal.attributes.spayed_neutered === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faCheck} />Spayed/Neutered</p> : <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faX} />Spayed/Neutered</p> }
              { data.animal.attributes.house_trained === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faCheck} />House-trained</p> : <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faX} />House-trained</p>}
              { data.animal.attributes.special_needs === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faCheck} />Special needs</p> : <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faX} />Special needs</p>}
              { data.animal.attributes.shots_current === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faCheck} />Shots current</p> : <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faX} />Shots current</p>}
            </div> */}
          </div>
          <div className='basis-full flex flex-wrap mb-4'>
            <p className='font-bold tracking-wider'>Attributes -</p>
            { await data.animal.attributes.spayed_neutered === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faCheck} />Spayed/Neutered</p> : <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faX} />Spayed/Neutered</p> }
            { await data.animal.attributes.house_trained === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faCheck} />House-trained</p> : <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faX} />House-trained</p>}
            { await data.animal.attributes.special_needs === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faCheck} />Special needs</p> : <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faX} />Special needs</p>}
            { await data.animal.attributes.shots_current === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faCheck} />Shots current</p> : <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faX} />Shots current</p>}
          </div>
          { await data.animal.environment.children !== null || data.animal.environment.dogs !== null || data.animal.environment.cats !== null ? 
          <div className='basis-full flex flex-wrap mb-4'>
            <p className='font-bold tracking-wider'>Environment -</p>
            { await data.animal.environment.children === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faCheck} />Good with children</p> : <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faX} />Good with children</p> }
            { await data.animal.environment.dogs === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faCheck} />Good with dogs</p> : <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faX} />Good with dogs</p>}
            { await data.animal.environment.cats === true ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faCheck} />Good with cats</p> : <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faX} />Good with cats</p>}
          </div>
          : null}
          <div className='basis-full flex flex-wrap mb-4'>
            <p className='font-bold tracking-wider'>Contact -</p>
            { await data.animal.contact.email !== null ? <a href={`mailto:${data.animal.contact.email}`} className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faEnvelope} />{data.animal.contact.email}</a> : null }
            { await data.animal.contact.phone !== null ? <p className='basis-full'><FontAwesomeIcon className='inline h-[1.25rem] mr-2' icon={faPhone} />{data.animal.contact.phone}</p> : null}
          </div>
        </div>
      </div>
    </div>
  )
}