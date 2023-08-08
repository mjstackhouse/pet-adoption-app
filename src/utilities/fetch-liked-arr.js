import fetchLiked from './fetch-liked';
import fetchData from './fetch-data';

export default async function fetchLikedArr() {
  let likedAnimalsInfo = [];
  const likedAnimalsIds = await fetchLiked();

  console.log('likedAnimalsIds: ', await likedAnimalsIds);

  // await likedAnimalsIds.forEach(async (element) => {
  //   // console.log('typeof element: ', typeof element);
  //   const data = await fetchData(element);

  //   // console.log('data.animal: ', data.animal);

  //   if (data !== 'Not found') {
  //     likedAnimalsInfo.push(data.animal);
  //   }
  //   else likedAnimalsInfo.push('Not found');

  //   if (likedAnimalsInfo.length === await likedAnimalsIds.length) {
  //     console.log('likedAnimalsInfo.isArray(): ', Array.isArray(likedAnimalsInfo));
  //     return likedAnimalsInfo;
  //   }
  // });

  if (likedAnimalsIds === 'No favorited animals') {
    return 'No favorited animals';
  }
  else {
    for (let i = 0; i < await likedAnimalsIds.length; i++) {
      const info = await (async () => {
        const data = await fetchData(await likedAnimalsIds[i]);
  
        if (data !== 'Not found') {
          likedAnimalsInfo.push(await data.animal);
        }
        else likedAnimalsInfo.push('Not found');
  
        if (likedAnimalsInfo.length === await likedAnimalsIds.length) {
          console.log('likedAnimalsInfo.isArray(): ', Array.isArray(likedAnimalsInfo));
          return likedAnimalsInfo;
        }
      })();
  
      if (info) return info;
    }
  }
}