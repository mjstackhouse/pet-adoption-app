export default async function loadAuto() {
  let autocomplete;
  let customLocation;

  const script = document.createElement('script');

  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places&callback=initAutocomplete`;
  script.async = true;
  script.id = 'google-script';

  document.head.appendChild(script);

  const googleScript = document.getElementById('google-script');

  googleScript.addEventListener('load', () => {
    const google = window.google;

    // if (fetched === false) {
    //   fetchData();
    //   setFetched(true);
    // }
    // setApiLoaded(true);
  })

  window.initAutocomplete = function() {
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'), {
        types: ['(cities)'],
        fields: ['geometry'],
        componentRestrictions: { country: ['us', 'ca', 'mx'] }
      });
    
    autocomplete.addListener('place_changed', onPlaceSelected);
  }

  function onPlaceSelected() {
    const place = autocomplete.getPlace();

    if (!place.geometry) {
      // document.getElementById('invalid-location-feedback').innerText = 'Please select a valid location';
      document.getElementById('autocomplete').oninput = () => {
        // document.getElementById('invalid-location-feedback').innerText = '';
      }
    }
    else {
      customLocation = place.geometry.location;
    }
  }
}