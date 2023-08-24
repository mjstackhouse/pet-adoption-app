import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

export default function Loading() {
  return (
    <div id='loading-icon' className='flex items-center justify-center h-[90vh] animate-spin'><FontAwesomeIcon icon={faCircleNotch} className='h-[2rem] text-blue' /></div>
  )
}