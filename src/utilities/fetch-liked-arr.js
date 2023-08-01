import fetchLiked from './fetch-liked';
import fetchData from './fetch-data';

export default async function fetchLikedArr() {
  let likedAnimalsInfo = [];
  const likedAnimalsIds = await fetchLiked();

  let invalidIdCount = await likedAnimalsIds.length;

  await likedAnimalsIds.forEach(async (element) => {
    console.log('typeof element: ', typeof element);
    const data = await fetchData(element);

    if (data !== 'Not found') {
      likedAnimalsInfo.push(data);
      invalidIdCount -= 1;
    } 

    if (likedAnimalsInfo.length === await invalidIdCount) {
      console.log('likedAnimalsInfo: ', likedAnimalsInfo);
      return likedAnimalsInfo;
    }
  });
}