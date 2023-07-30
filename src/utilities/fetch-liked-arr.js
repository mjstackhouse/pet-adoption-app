import fetchLiked from './fetch-liked';
import fetchData from './fetch-data';

export default async function fetchLikedArr() {
  let likedAnimalsInfo = [];
  const likedAnimalsIds = await fetchLiked();

  await likedAnimalsIds.forEach(async (element) => {
    likedAnimalsInfo.push(await fetchData(element));

    if (likedAnimalsInfo.length === await likedAnimalsIds.length) {
      return likedAnimalsInfo;
    }
  });
}