import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faHand, faPaw } from '@fortawesome/free-solid-svg-icons';

export default function Loading() {
  return (
    <div id='loading-icon' className='flex flex-wrap items-center content-center h-[calc(100svh-80px)] h-[calc(100vh-80px)] sm:h-[calc(100svh-90px)] sm:h-[calc(100vh-90px)]'>
      {/* <FontAwesomeIcon icon={faCircleNotch} className='h-[2rem] text-blue' /> */}
      <FontAwesomeIcon id='loading-hand' icon={faHand} className='basis-full h-[2rem] text-darker-blue ml-[0.75rem] rotate-180' />
      <FontAwesomeIcon id='loading-paw' icon={faPaw} className='basis-full h-[2rem] text-blue mr-[0.75rem]' />
    </div>
  )
}