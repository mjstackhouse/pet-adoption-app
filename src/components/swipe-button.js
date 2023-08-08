'use client'

import { useRef, useEffect } from 'react';
import $ from 'jquery';

export default function SwipeButton() {

  const scrollCount = useRef(1);

  useEffect(() => {
    if (document) {
      if (document.getElementById('change-page-button')) {
        const changePageButton = document.getElementById('change-page-button');
        changePageButton.addEventListener('click', () => {
          scrollCount.current = 1;
          $('#previous-button').attr('disabled', 'true');
          $('#next-button').attr('disabled', null);
        })
        $('#previous-button').attr('disabled', 'true');
        $('#next-button').attr('disabled', null);
      }
    }
  }, []);
  
  
  function scrollRight() {
    const htmlElement= document.querySelector(':root');
    const htmlWidth = htmlElement.clientWidth;
    const petLinksContainer = document.getElementById('pet-links-container');

    petLinksContainer.scrollTo({
      top: 0,
      left: htmlWidth * scrollCount.current,
      behavior: 'smooth'
    });

    const fullScrollWidth = htmlWidth * 19;
    const scrollPosition = petLinksContainer.scrollLeft;

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
      left: (htmlWidth * scrollCount.current) - (htmlWidth * 2),
      behavior: 'smooth'
    })

    const fullScrollWidth = htmlWidth * 19;
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
    <div id='swipe-button-container' className='bg-gray grow my-auto w-[100vw] flex items-center'>
      <button id='previous-button' className='font-bold tracking-wider basis-1/2 bg-blue hover:bg-darker-blue disabled:bg-darker-gray ml-4 mr-4 text-black shadow-md px-4 py-2 rounded-3xl' onClick={scrollLeft}>Previous</button>
      <button id='next-button' className='font-bold tracking-wider basis-1/2 bg-blue hover:bg-darker-blue disabled:bg-darker-gray mr-4 ml-4 text-black shadow-md px-4 py-2 rounded-3xl' onClick={scrollRight}>Next</button>
    </div>
  )
}