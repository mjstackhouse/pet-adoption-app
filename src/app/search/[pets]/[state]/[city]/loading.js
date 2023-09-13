import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

export default function Loading() {
  return (
    <div id='loading-icon' className='flex items-center justify-center h-[calc(100svh-80px)] h-[calc(100vh-80px)] sm:h-[calc(100svh-90px)] sm:h-[calc(100vh-90px)] animate-spin'>
      <FontAwesomeIcon icon={faCircleNotch} className='h-[2rem] text-blue' />
    </div>
  )
}