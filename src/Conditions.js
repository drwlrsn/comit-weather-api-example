import React, { useState } from 'react';

const styles = {
  conditions: {
    fontSize: 18,
  },
};

const getWeather = (conditions) => conditions.weather[0].description;
const getTemp = (conditions) => conditions.main.temp;

const toCelcius = (t) => t - 273.15;
const toFahrenheit = (t) => ((t - 273.15) * 9) / 5 + 32;

export const Conditions = ({ conditions }) => {
  const [units, setUnits] = useState('m');
  return (
    <div>
      <label htmlFor="units">
        Change units
      <select id="units" defaultValue='m' onChange={(e) => setUnits(e.currentTarget.value)}>
        <option value="m">
          Metric
        </option>
        <option value="f">Fahrenheit</option>
      </select>
      </label>
      <dl style={styles.conditions}>
        <dd>Weather</dd>
        <dt>{getWeather(conditions)}</dt>
        <dd>Temperature</dd>
        <dt>
          {units === 'm'
            ? toCelcius(getTemp(conditions))
            : toFahrenheit(getTemp(conditions))}
        </dt>
      </dl>
    </div>
  );
};
