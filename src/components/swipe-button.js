'use client'

import { useRef } from 'react';

export default function SwipeButton() {

  const scrollCount= useRef(1);

  function scrollRight() {
    console.log('scroll');

    // const windowWidth = window.innerWidth;
    const htmlElement= document.querySelector(':root');
    const htmlWidth = htmlElement.clientWidth;
    console.log('htmlWidth: ', htmlWidth);
    const petLinksContainer = document.getElementById('pet-links-container');
    petLinksContainer.scrollTo({
      top: 0,
      left: htmlWidth * scrollCount.current,
      behavior: 'smooth'
    })
    scrollCount.current = scrollCount.current + 1;
  }

  function scrollLeft() {
    const htmlElement= document.querySelector(':root');
    const htmlWidth = htmlElement.clientWidth;
    console.log('htmlWidth: ', htmlWidth);
    const petLinksContainer = document.getElementById('pet-links-container');
    petLinksContainer.scrollTo({
      top: 0,
      left: (htmlWidth * scrollCount.current) - (htmlWidth * 2),
      behavior: 'smooth'
    })
    if (scrollCount.current > 1) scrollCount.current = scrollCount.current - 1;
  }

  return (
    <div id='swipe-button-container' className='bg-gray grow my-auto w-[100vw] flex items-center'>
      <button className='font-bold tracking-wide basis-1/2 bg-blue hover:bg-darker-blue ml-4 mr-4 text-black shadow-md px-4 py-2 rounded-3xl' onClick={scrollLeft}>Previous</button>
      <button className='font-bold tracking-wide basis-1/2 bg-blue hover:bg-darker-blue mr-4 ml-4 text-black shadow-md px-4 py-2 rounded-3xl' onClick={scrollRight}>Next</button>
    </div>
  )
}