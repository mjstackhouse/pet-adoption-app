'use client'

import { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight, faCircleLeft, faCircleChevronRight, faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';

export default function SwipeButton({ dataLength }) {

  const [previousBtnDisabled, setPreviousButtonDisabled] = useState('true');
  const [nextBtnDisabled, setNextButtonDisabled] = useState(null);
  // $('#previous-button').attr('disabled', 'true');
  // $('#next-button').attr('disabled', null);
  
  const scrollCount = useRef(1);

  useEffect(() => {
    // console.log('useEffect dataLength: ', dataLength);

    if (document) {
      if (document.getElementById('next-page-button')) {
        const nextPageBtn = document.getElementById('next-page-button');
        const previousPageBtn = document.getElementById('previous-page-button');

        nextPageBtn.addEventListener('click', () => {
          scrollCount.current = 1;
          $('#previous-button').attr('disabled', 'true');
          $('#next-button').attr('disabled', null);
        })

        previousPageBtn.addEventListener('click', () => {
          scrollCount.current = 1;
          $('#previous-button').attr('disabled', 'true');
          $('#next-button').attr('disabled', null);
        })
        $('#previous-button').attr('disabled', 'true');
        $('#next-button').attr('disabled', null);
      }
      $('#previous-button').attr('disabled', 'true');
      $('#next-button').attr('disabled', null);
    }
  }, [dataLength]);
  
  
  function scrollRight() {
    const htmlElement= document.querySelector(':root');
    const htmlWidth = htmlElement.clientWidth;
    const petLinksContainer = document.getElementById('pet-links-container');

    petLinksContainer.scrollTo({
      top: 0,
      left: htmlWidth * scrollCount.current
    });

    const fullScrollWidth = htmlWidth * (dataLength);
    const scrollPosition = petLinksContainer.scrollLeft;

    // console.log('scrollPosition: ', scrollPosition);

    if (scrollPosition === fullScrollWidth) {
      $('#next-button').attr('disabled', 'true');
      // $('#pet-links-container').removeClass('shadow-md');
    }
    else {
      $('#next-button').attr('disabled', null);
      // $('#pet-links-container').addClass('shadow-md');
    } 

    $('#previous-button').attr('disabled', null);

    scrollCount.current = scrollCount.current + 1;
  }

  function scrollLeft() {
    const htmlElement = document.querySelector(':root');
    const htmlWidth = htmlElement.clientWidth;
    const petLinksContainer = document.getElementById('pet-links-container');

    petLinksContainer.scrollTo({
      top: 0,
      left: (htmlWidth * scrollCount.current) - (htmlWidth * 2)
    })

    const fullScrollWidth = htmlWidth * (dataLength);
    const scrollPosition = petLinksContainer.scrollLeft;

    if (scrollPosition < fullScrollWidth || scrollPosition === fullScrollWidth + htmlWidth) {
      $('#next-button').attr('disabled', null);
    }

    if (scrollPosition <= 375) $('#previous-button').attr('disabled', 'true');
    else $('#previous-button').attr('disabled', null);

    // $('#pet-links-container').addClass('shadow-md');

    if (scrollCount.current > 1) scrollCount.current = scrollCount.current - 1;
  }

  return (
    <div id='swipe-button-container' className='relative grow my-auto w-[100vw] flex items-center md:hidden z-0'>
      <span className='basis-1/2 text-left pl-8'>
        <button id='previous-button' className='font-bold tracking-wider basis-1/2 bg-blue active:bg-darker-blue disabled:bg-darker-gray text-black rounded-3xl px-4 py-2' onClick={scrollLeft}>
          Previous
          {/* <FontAwesomeIcon icon={faCircleChevronLeft} className='h-[3rem]'/> */}
        </button>
      </span>
      <span className='basis-1/2 text-right pr-8'>
        <button id='next-button' className='font-bold tracking-wider basis-1/2 bg-blue active:bg-darker-blue disabled:bg-darker-gray text-black rounded-3xl px-4 py-2' onClick={scrollRight}>
          Next
          {/* <FontAwesomeIcon icon={faCircleChevronRight} className='h-[3rem]'/> */}
        </button>
      </span>
    </div>
  )
}