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
    <div className='h-[13vh] h-[13svh] max-w-[100vw] basis-full flex items-center'>
      <button className='basis-1/2 bg-blue ml-4 mr-2 text-black shadow-md px-4 py-2 rounded-3xl' onClick={scrollLeft}>Previous</button>
      <button className='basis-1/2 bg-blue mr-4 ml-2 text-black shadow-md px-4 py-2 rounded-3xl' onClick={scrollRight}>Next</button>
    </div>
  )
}