'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Bree_Serif } from 'next/font/google';
import $ from 'jquery';

const bree = Bree_Serif({ weight: '400', subsets: ['latin'] });

export default function ChangePageButtons({ parameters, searchParameters, dataLength }) {

  // MAYBE USE STATE TO CHANGE THE BUTTONS' DISPLAY VALUES IN THEIR CLASSES
  
  const router = useRouter();

  const [changePageBtnHeader, setChangePageBtnHeader] = useState('Continue looking by clicking below');
  const [nextPageNum, setNextPageNum] = useState(searchParameters.hasOwnProperty('page') ? Number(searchParameters.page) + 1 : 2);
  const [previousPageNum, setPreviousPageNum] = useState(searchParameters.hasOwnProperty('page') ? Number(searchParameters.page) - 1 : 0);
  
  const [prevBtnSearchParams, setPrevBtnSearchParams] = useState({});
  const [nextBtnSearchParams, setNextBtnSearchParams] = useState({});

  useEffect(() => {
    
    createNewSearchParams('previous');
    createNewSearchParams('next');

    scrollToStart();

    if (searchParameters.hasOwnProperty('page') && searchParameters.page !== '1') {
      $('#previous-page-button').css('display', 'inline-block');
    }
    else {
      $('#previous-page-button').css('display', 'none');
    }

    if (dataLength < 20) {
      $('#next-page-button').css('display', 'none');
      setChangePageBtnHeader('No more results matching those filters');
    }
    else {
      if (Object.keys(searchParameters).includes('page')) {
        $('#previous-page-button').css('display', 'inline-block');
      }
      $('#next-page-button').css('display', 'inline-block');
      setChangePageBtnHeader('Continue looking by clicking below');
    }

    document.getElementById('update-filters-btn').addEventListener('click', () => {
      setPreviousPageNum(0);
      setNextPageNum(2);
    })
  }, [searchParameters, dataLength]);

  function scrollToStart() {
    const petLinksContainer = document.getElementById('pet-links-container');
    petLinksContainer.scrollTo({
      top: 0,
      left: 0
    })
  }

  function createNewSearchParams(buttonType) {
    if (Object.keys(searchParameters).length > 0
    && (Object.keys(searchParameters).includes('breed') || Object.keys(searchParameters).includes('age') || Object.keys(searchParameters).includes('size'))) {

      const queryKeys = Object.keys(searchParameters).slice();
      const queryValues = Object.values(searchParameters).slice();

      let queryParams = {};

      for (let i = 0; i < queryKeys.length; i++) {
        if (queryValues[i] !== '') {
          queryParams[queryKeys[i]] = queryValues[i];
        }
      }

      if (buttonType === 'previous') {
        if (Object.keys(searchParameters).includes('page')) {
          if (previousPageNum !== Number(searchParameters.page) - 1) {
            setPreviousPageNum(Number(searchParameters.page) - 1);
            queryParams.page = Number(searchParameters.page) - 1;
          }
          else {
            queryParams.page = previousPageNum;
          }

          if (queryParams.page === 1) delete queryParams.page;
        }
        else {
          queryParams.page = 0;
        }
        setPrevBtnSearchParams(queryParams);
      }
      else if (buttonType === 'next') {
        if (Object.keys(searchParameters).includes('page')) {
          if (nextPageNum !== Number(searchParameters.page) + 1) {
            setNextPageNum(Number(searchParameters.page) + 1);
            queryParams.page = Number(searchParameters.page) + 1;
          }
          else {
            queryParams.page = nextPageNum;
          }
        }
        else {
          queryParams.page = 2;
        }
        setNextBtnSearchParams(queryParams);
      }
      // setNewSearchParams(queryParams);
    }
    else {

      let queryParams = {};

      if (buttonType === 'previous') {
        if (Object.keys(searchParameters).includes('page')) {
          if (previousPageNum !== Number(searchParameters.page) - 1) {
            setPreviousPageNum(Number(searchParameters.page) - 1);
            queryParams.page = Number(searchParameters.page) - 1;
          }
          else {
            queryParams.page = previousPageNum;
          }

          if (queryParams.page === 1) delete queryParams.page;
        }
        else {
          queryParams.page = 0;
        }

        if (!(Object.keys(queryParams).includes('page'))) setPrevBtnSearchParams('');
        else setPrevBtnSearchParams(queryParams);
      }
      else if (buttonType === 'next') {
        if (Object.keys(searchParameters).includes('page')) {
          if (nextPageNum !== Number(searchParameters.page) + 1) {
            setNextPageNum(Number(searchParameters.page) + 1);
            queryParams.page = Number(searchParameters.page) + 1;
          }
          else {
            queryParams.page = nextPageNum;
          }
        }
        else {
          queryParams.page = 2;
        }
        setNextBtnSearchParams(queryParams);
      }
    }
  }
  
  // Currently, if any filters are selected and then the next/previous buttons are used, the page number query overwrites the filters, which it shouldn't do.
  // The page numbers are not getting reset when filters are added; they *need* to be reset for what is now a new search.

  return (
    <div className='w-full sm:w-[900px] xl:w-[960px] xl:px-8 flex flex-wrap place-items-center text-center mx-4 sm:mx-auto my-4 sm:my-0'>
      <div className='basis-full flex justify-center'>
        <Link id='previous-page-button' href={ prevBtnSearchParams !== '' ? { query: prevBtnSearchParams } : `/search/${parameters.pets}/${parameters.state}/${parameters.city}` } passHref shallow onClick={() => { setPreviousPageNum(previousPageNum - 1); setNextPageNum(nextPageNum - 1); }} className='max-w-[50%] font-bold tracking-wider hover:bg-darker-gray hover:underline underline-offset-4 bg-white border-2 text-black px-4 py-2 mr-2 sm:mt-8 sm:mb-8 rounded-3xl hover:shadow-md mb-4'>
          Previous page
        </Link>
        <Link id='next-page-button' href={{ query: nextBtnSearchParams }} passHref shallow onClick={() => { setNextPageNum(nextPageNum + 1); setPreviousPageNum(previousPageNum + 1); } } className='max-w-[50%] font-bold tracking-wider hover:bg-darker-gray hover:underline underline-offset-4 bg-white border-2 text-black px-4 py-2 ml-2 sm:mt-8 sm:mb-8 rounded-3xl hover:shadow-md mb-4'>
          Next page
        </Link>
      </div>
    </div>
  )
}