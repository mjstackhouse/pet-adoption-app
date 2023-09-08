'use client'

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';

export default function AnimalPhotoGallery({ photos }) {

  const [selectedImg, setSelectedImg] = useState(photos[0].large !== null ? photos[0].large : null);
  const [fullSelectedImg, setFullSelectedImg] = useState(photos[0].full !== null ? photos[0].full : null);

  useEffect(() => {
    $('.thumbnail-0').css('opacity', '0.5');
  }, [])

  function updateThumbnailOpacity(id) {
    $(`.${id}`).css('opacity', '0.5');
    
    const thumbnails = document.getElementsByClassName('thumbnail');

    for (let i = 0; i < thumbnails.length; i++) {
      if (thumbnails[i].id !== id) $(`.${thumbnails[i].id}`).css('opacity', '1.0');
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
    <div className='basis-full mx-auto flex flex-wrap sm:flex-nowrap'>
      <div className='h-[50vh] overflow-x-hidden overflow-y-auto hidden sm:flex flex-col'>
       { photos.map((element, index) => {
          return <button className='my-[0.5vh] mx-[1vh] h-[10vh] w-[10vh] overflow-hidden' onClick={(e) => { setSelectedImg(element.large); setFullSelectedImg(element.full); updateThumbnailOpacity(e.target.id) }}><img id={'thumbnail-' + index} src={element.small !== null ? element.small : null} className={`${'thumbnail-' + index} thumbnail w-full h-full object-cover hover:object-scale-down`}/></button>
        })
        }
      </div>
      <div className='h-[38vh] sm:h-[50vh] relative flex place-content-center grow bg-darker-gray'>
        <button onClick={() => fullscreenImg()}>
          <img id='selected-img' src={selectedImg} className='mx-auto object-contain h-[38vh] sm:h-[50vh] relative z-10' />
        </button>
      </div>
      <div id='selected-img-fullscreen' className='flex place-items-center bg-white fixed top-0 left-0 w-screen h-screen hidden z-40'>
        <button id='close-btn' className='fixed top-0 left-0 md:top-[2.5vh] md:left-[2.5vw] mt-4 ml-4 mb-4' onClick={() => closeImg()}>
          <FontAwesomeIcon icon={faXmark} className='h-[2rem] text-black hover:text-darker-gray' />
        </button>
        <div className='w-screen h-[calc(97.5vh-10rem)] md:w-[calc(97.5vw-9rem)] md:h-[calc(97.5vh-3rem)] flex flex-wrap xl:flex-nowrap m-auto place-content-center'>
          <div className='overflow-x-hidden overflow-y-auto hidden xl:flex flex-col'>
            { photos.map((element, index) => {
                return <button className='my-[1vh] mx-[1.5vh] h-[15vh] w-[15vh] max-h-full max-w-full overflow-hidden' onClick={(e) => { setSelectedImg(element.large); setFullSelectedImg(element.full); updateThumbnailOpacity(e.target.id) }}><img id={'thumbnail-' + index} src={element.small !== null ? element.small : null} className={`${'thumbnail-' + index} thumbnail w-full h-full object-cover hover:object-scale-down`}/></button>
              })
            }
          </div>
          {/* h-[calc(97.5vh-10rem-16vh)] xl:h-[calc(97.5vh-10rem)] */}
          <span className='h-[calc(97.5vh-10rem-16vh)] xl:h-auto grow bg-darker-gray'>
            <span className='h-full m-auto flex place-content-center'>
              <img src={fullSelectedImg} className='mx-auto object-contain max-h-full' />
            </span>
          </span>
          <div className='overflow-x-auto overflow-y-hidden basis-full place-content-center flex xl:hidden flex-row mx-auto'>
            { photos.map((element, index) => {
                return <button className='my-[2vh] mx-[1vh] h-[15vh] w-[15vh] max-h-full max-w-full overflow-hidden' onClick={(e) => { setSelectedImg(element.large); setFullSelectedImg(element.full); updateThumbnailOpacity(e.target.id) }}><img id={'thumbnail-' + index} src={element.small !== null ? element.small : null} className={`${'thumbnail-' + index} thumbnail w-full h-full object-cover hover:object-scale-down`}/></button>
              })
            }
          </div>
        </div>
      </div>
      <div className='h-[12vh] overflow-x-auto overflow-y-hidden flex sm:hidden flex-row mx-auto'>
       { photos.map((element, index) => {
          return <button className='my-[1vh] mx-[0.5vh] h-[10vh] w-[10vh] overflow-hidden' onClick={(e) => { setSelectedImg(element.large); setFullSelectedImg(element.full); updateThumbnailOpacity(e.target.id) }}><img id={'thumbnail-' + index} src={element.small !== null ? element.small : null} className={`${'thumbnail-' + index} thumbnail w-full h-full object-cover hover:object-scale-down`}/></button>
        })
        }
      </div>
    </div>
  )
}