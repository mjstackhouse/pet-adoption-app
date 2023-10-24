'use client'

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';

export default function AnimalPhotoGallery({ photos, altInfo }) {

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
    <div className='w-full max-w-[calc(100vw-4rem)] xl:max-w-[calc(550px-2rem)] mx-auto flex flex-wrap sm:flex-nowrap xl:flex-wrap xl:place-content-start'>
      <div className='h-[50vh] gap-y-[1vh] overflow-x-hidden overflow-y-auto hidden sm:flex flex-col xl:hidden'>
       { photos.map((element, index) => {
          return <button key={index} className='mx-[1vh] h-[10vh] w-[10vh] overflow-hidden' onClick={(e) => { setSelectedImg(element.large); setFullSelectedImg(element.full); updateThumbnailOpacity(e.target.id) }}><img id={'thumbnail-' + index} src={element.small !== null ? element.small : null} alt={`${altInfo}`} className={`${'thumbnail-' + index} thumbnail w-full h-full object-cover hover:object-scale-down`}/></button>
        })
        }
      </div>
      <div className='h-[38vh] sm:h-[50vh] relative flex place-content-center grow bg-darker-blue'>
        <button className='w-full m-auto flex place-content-center' onClick={() => fullscreenImg()}>
          <img id='selected-img' src={selectedImg} alt={`${altInfo}`} className='mx-auto object-contain h-[38vh] sm:h-[50vh] max-h-full grow relative z-10' />
        </button>
      </div>
      <div id='selected-img-fullscreen' className='flex place-items-center bg-white fixed inset-0 w-screen h-screen hidden z-50'>
        <button id='close-btn' className='fixed top-0 left-0 md:top-[2.5vh] md:left-[2vw] mt-4 ml-4 mb-4' onClick={() => closeImg()}>
          <FontAwesomeIcon icon={faXmark} className='h-[2rem] text-black hover:text-darker-gray' />
        </button>
        <div className='w-screen h-[calc(97.5vh-10rem)] md:w-[calc(97.5vw-9rem)] md:h-[calc(97.5vh-3rem)] flex flex-wrap xl:flex-nowrap m-auto place-content-center'>
          <div id='fullscreen-thumbnails-column' className='mr-[1.5vh] h-full w-[16.5vh] gap-y-[1.5vh] overflow-x-hidden overflow-y-auto whitespace-nowrap hidden xl:flex flex-col'>
            { photos.map((element, index) => {
                return <button key={index} className='h-[15vh] w-[15vh] overflow-hidden' onClick={(e) => { setSelectedImg(element.large); setFullSelectedImg(element.full); updateThumbnailOpacity(e.target.id) }}><img id={'thumbnail-' + index} src={element.small !== null ? element.small : null} alt={`${altInfo}`} className={`${'thumbnail-' + index} thumbnail w-full h-full object-cover hover:object-scale-down`}/></button>
              })
            }
          </div>
          <span className='h-[calc(97.5vh-10rem-16vh)] xl:h-auto xl:w-full max-w-full bg-darker-gray flex'>
            <span className='grow max-w-full max-h-full m-auto flex place-content-center'>
              <img src={fullSelectedImg} alt={`${altInfo}`} className='grow mx-auto max-w-full max-h-full object-contain' />
            </span>
          </span>
          <div id='fullscreen-thumbnails-row' className='w-full gap-x-[2vh] flex overflow-x-auto overflow-y-hidden place-content-center whitespace-nowrap xl:hidden'>
            { photos.map((element, index) => {
                return <button key={index} className='my-[2vh] h-[15vh] w-[15vh] max-h-full max-w-full overflow-hidden' onClick={(e) => { setSelectedImg(element.large); setFullSelectedImg(element.full); updateThumbnailOpacity(e.target.id) }}><img id={'thumbnail-' + index} src={element.small !== null ? element.small : null} alt={`${altInfo}`} className={`${'thumbnail-' + index} thumbnail w-full h-full object-cover hover:object-scale-down`}/></button>
              })
            }
          </div>
        </div>
      </div>
      <div className='bg-white h-[12vh] w-full overflow-x-auto overflow-y-hidden whitespace-nowrap sm:hidden xl:block mx-auto'>
       { photos.map((element, index) => {
          return <button key={index} className='my-[1vh] mx-[0.5vh] h-[10vh] w-[10vh] overflow-hidden' onClick={(e) => { setSelectedImg(element.large); setFullSelectedImg(element.full); updateThumbnailOpacity(e.target.id) }}><img id={'thumbnail-' + index} src={element.small !== null ? element.small : null} alt={`${altInfo}`} className={`${'thumbnail-' + index} thumbnail w-full h-full object-cover hover:object-scale-down`}/></button>
        })
        }
      </div>
    </div>
  )
}