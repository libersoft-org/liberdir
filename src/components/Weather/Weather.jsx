import React, { useState } from 'react';
import axios from 'axios';
import ForecastTile from './ForecastTile';
import CurrentWeatherTile from './CurrentWeatherTile';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import './weather.scss';

const requestURL = 'https://api.open-meteo.com/v1/forecast?latitude=45.8969&longitude=18.8643&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin';
const requestURLCurrent = 'https://api.open-meteo.com/v1/forecast?latitude=45.8969&longitude=18.8643&current_weather=true&timezone=Europe%2FBerlin';

const descriptions = require('./descriptions.json');

function convertCtoF(c) {
  let f = 0;
  f = (c * (9 / 5)) + 32;
  return f;
}

const Weather = ({maxDays, current}) => {

  const [forecasts, setForecasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  React.useEffect(() => {
    axios(current ? requestURLCurrent : requestURL).then((response) => {
      let forecasts = [];

      if (current) {

        const weathercode = response.data.current_weather.weathercode;
        const icon = descriptions[weathercode].icon;
        forecasts.push({
          time: response.data.current_weather.time,
          temp_min: response.data.current_weather.temperature,
          temp_max: response.data.current_weather.temperature,
          temp_min_f: convertCtoF(response.data.current_weather.temperature),
          temp_max_f: convertCtoF(response.data.current_weather.temperature),
          title: "",
          description: descriptions[weathercode].day.description,
          icon: icon,
        })

      } else {

        for (let i = 0; i < response.data.daily.time.length; i++) {
          if (i >= (maxDays ?? 3)) break;
          const weathercode = response.data.daily.weathercode[i];
          const title = new Date(response.data.daily.time[i]).toLocaleString('en-us', {  weekday: 'long' });
          const icon = descriptions[weathercode].icon;
          forecasts.push({
            time: response.data.daily.time[i],
            temp_min: response.data.daily.temperature_2m_min[i],
            temp_max: response.data.daily.temperature_2m_max[i],
            temp_min_f: convertCtoF(response.data.daily.temperature_2m_min[i]),
            temp_max_f: convertCtoF(response.data.daily.temperature_2m_max[i]),
            title: title,
            description: descriptions[weathercode].day.description,
            icon: icon,
          })
        }
      }

      setForecasts(forecasts);
      setIsLoading(false);
      setError(null);
    }).catch((err) => {
      setError("Unable to fetch weather data. " + err);
      setIsLoading(false);
    });
  }, [maxDays]);

  let items = [];

  if (current && forecasts.length == 1) {
    items = forecasts.map(item => <CurrentWeatherTile key={item.time} forecast={item} />);
  } else {
    items = forecasts.map(item => <ForecastTile key={item.time} forecast={item} />);
  }

  return <div id='weather'>
        {!current && <div className='main-area-title'>Weather in Liberland</div>}
        {isLoading ? <LoadingSpinner small={current} /> : error ? <div className="error">{error}</div> : <div className='weather-tiles'>
      {items}
    </div>}

  </div>;
};

export default Weather;