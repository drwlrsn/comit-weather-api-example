const mapBoxToken =
  'pk.eyJ1IjoiOW1pbGVsZWdhY3kiLCJhIjoiY2s4cDdtc3NjMDAxdzNmbzB3bmdvb2VvNiJ9.Aa6bLdB1zg93_sQQlJHAzw';

export const getAddress = (latitude, longitude) => {
  const reverseGeoCodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapBoxToken}`;
  return fetch(reverseGeoCodeURL).then((response) => response.json());
};