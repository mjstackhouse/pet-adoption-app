export default async function fetchLocation(lat, lon) {
  const locationObj = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&location_type=APPROXIMATE&result_type=administrative_area_level_1|administrative_area_level_2&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`);
  const locationObjParsed = await locationObj.json();

  return await locationObjParsed;
}