'use client'

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';

export default function AnimalPhotoGallery({ photos }) {

  const [selectedImg, setSelectedImg] = useState(photos[0].large !== null ? photos[0].large : null);

  useEffect(() => {
    $('#thumbnail-0').css('opacity', '0.5');
  }, [])

  function updateThumbnailOpacity(id) {
    $(`#${id}`).css('opacity', '0.5');
    
    const thumbnails = document.getElementsByClassName('thumbnail');

    for (let i = 0; i < thumbnails.length; i++) {
      if (thumbnails[i].id !== id) $(`#${thumbnails[i].id}`).css('opacity', '1.0');
    }
  }

  function fullscreenImg() {
    $('html').css('overflow', 'hidden');
    $('#selected-img-fullscreen').css('display', 'flex');
  }

  function closeImg() {
    $('html').css('overflow-y', 'visible');
    $('#selected-img-fullscreen').css('display', 'none');
  }

  return (
    <div className='basis-full mx-auto flex flex-wrap'>
      <div className='w-full mx-auto h-[38vh] relative bg-gray'>
        <button onClick={() => fullscreenImg()}>
          <img id='selected-img' src={selectedImg} className='mx-auto object-contain h-[34vh] m-[2vh] shadow-lg relative z-10' />
        </button>
        <div id='selected-img-fullscreen' className='flex place-items-center bg-black fixed top-0 left-0 w-screen h-screen hidden z-40'>
          <button id='close-btn' className='fixed top-0 left-0 md:top-[2.5vh] md:left-[2.5vw] mt-4 ml-4 mb-4' onClick={() => closeImg()}>
            <FontAwesomeIcon icon={faXmark} className='h-[2rem] text-white hover:text-darker-gray' />
          </button>
          <img src={selectedImg} className='m-auto object-contain h-[75vh] relative z-10' />
        </div>
        {/* <img src='/pink-bg-shape-1.svg' className='absolute top-0 left-0 mx-auto object-contain w-full h-[38vh]' /> */}
      </div>
      <div className='basis-full mx-auto h-[12vh] bg-darker-gray overflow-x-auto overflow-y-hidden'>
       { photos.map((element, index) => {
          return <button className='my-[1vh] mx-[0.5vh] h-[10vh] w-[10vh] overflow-hidden' onClick={(e) => { setSelectedImg(element.large); updateThumbnailOpacity(e.target.id) }}><img id={'thumbnail-' + index} src={element.small !== null ? element.small : null} className='thumbnail w-full h-full object-cover hover:object-scale-down'/></button>
          })
        }
      </div>
    </div>
  )
}