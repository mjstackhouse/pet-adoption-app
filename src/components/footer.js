import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/petadoptionapp-logo-2d.png';
import petfinderLogo from '../../public/petfinder-logo-white.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className='self-end h-[80px] sm:h-[90px] basis-full max-w-full bg-darker-gray flex place-content-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] relative z-30'>
      <div className='flex flex-row grow items-center justify-between mx-4 sm:mx-auto sm:max-w-[600px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1100px]'>
        <span className='text-black flex flex-wrap'>
          <Link href='/' className='mr-4 mb-[0.25rem] sm:mb-2'>
            <Image src={logo} className='h-[1rem] sm:h-[1.5rem] w-auto' />
          </Link>
          <span className='basis-full flex text-sm'>
            Powered by 
            <Link className='ml-[0.2rem] mt-[3.5px] sm:mt-[0.75px]' href='https://www.petfinder.com/'>
              <Image src={petfinderLogo} className='h-[1rem] sm:h-[1.5rem] w-auto hover:brightness-50 invert' />
            </Link>
          </span>
        </span>
        <span className='flex flex-nowrap'>
          <FontAwesomeIcon icon={faFacebook} className='h-[1.5rem] mr-4 text-black hover:text-blue hover:scale-125 transition-all' />
          <FontAwesomeIcon icon={faTwitter} className='h-[1.5rem] mr-4 text-black hover:text-blue hover:scale-125 transition-all' />
          <FontAwesomeIcon icon={faInstagram} className='h-[1.5rem] mr-4 text-black hover:text-blue hover:scale-125 transition-all' />
          <FontAwesomeIcon icon={faYoutube} className='h-[1.5rem] text-black hover:text-blue hover:scale-125 transition-all' />
        </span>
      </div>
    </footer>
  )
}