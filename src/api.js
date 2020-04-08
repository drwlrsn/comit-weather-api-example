const mapBoxToken =
  'pk.eyJ1IjoiOW1pbGVsZWdhY3kiLCJhIjoiY2s4cDdtc3NjMDAxdzNmbzB3bmdvb2VvNiJ9.Aa6bLdB1zg93_sQQlJHAzw';

const owmToken = '974a6ef234a94f739a6cc8cb0c2a9aa5';

export const getAddress = (latitude, longitude) => {
  const reverseGeoCodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapBoxToken}`;
  return fetch(reverseGeoCodeURL).then((response) => response.json());
};

export const getCurrentConditions = (place, region) =>
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${place},${region}&appid=${owmToken}`,
  ).then((response) => response.json());
