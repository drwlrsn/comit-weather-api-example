import React, { useState, useEffect } from 'react';
import { getAddress, getCurrentConditions } from './api';

const findPlace = (feature) => feature.place_type.indexOf('place') > -1;
const findRegion = (feature) => feature.place_type.indexOf('region') > -1;

const getCurrentPosition = () =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject),
  );

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '50%',
    alignContent: 'middle',
    margin: '0 auto',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  weatherInput: {
    fontSize: 24,
    padding: 8,
    marginBottom: 18,
  },
  button: {
    fontSize: 24,
  },
};

export const Weather = () => {
  const [location, setLocation] = useState(null);
  const [locationDetectionFailed, setLocationDetectionFailed] = useState(true);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = new Map(Array.from(formData.entries()))
    const [place, region] = data.get('place').replace(' ', '').split(',');
    getCurrentConditions(place, region).then(console.log)
  }

  useEffect(() => {
    const f = async () => {
      try {
        const position = await getCurrentPosition();
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const geoData = await getAddress(latitude, longitude);
        const place = geoData.features.find(findPlace).text;
        const region = geoData.features.find(findRegion).text;
        setLocation({ place, region });
        setLocationDetectionFailed(false);
      } catch (_) {
        setLocationDetectionFailed(true);
      }
    };

    f();
  }, []);
  return (
    <form style={styles.container} onSubmit={handleSubmit}>
      <input
        name="place"
        style={styles.weatherInput}
        type="text"
        placeholder="Tuscon, AZ"
        value={location ? `${location.place}, ${location.region}` : ''}
      />
      <button style={styles.button} type="submit">
        Get current conditions
      </button>
    </form>
  );
};
