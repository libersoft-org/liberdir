import React, { useState } from 'react';
import axios from 'axios';
import ForecastTile from './ForecastTile';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import './weather.scss';

const requestURL = 'https://api.open-meteo.com/v1/forecast?latitude=45.8969&longitude=18.8643&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin';

const descriptions = require('./descriptions.json');

function CtoF(c) {
  let f = 0;
  f = (c * (9 / 5)) + 32;
  return f;
}

const Weather = ({maxDays}) => {

  const [forecasts, setForecasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  React.useEffect(() => {
    axios(requestURL).then((response) => {
      let forecasts = [];
      const owi_code_regexp = /.*\/(.*)@.*/gm

      for (let i = 0; i < response.data.daily.time.length; i++) {
        if (i >= (maxDays ?? 3)) break;
        const weathercode = response.data.daily.weathercode[i];
        const title = new Date(response.data.daily.time[i]).toLocaleString('en-us', {  weekday: 'long' });
        const image = descriptions[weathercode].day.image;
        const owi_code = descriptions[weathercode].day.image.replace(owi_code_regexp, '$1');

        forecasts.push({
          time: response.data.daily.time[i],
          temp_min: response.data.daily.temperature_2m_min[i],
          temp_max: response.data.daily.temperature_2m_max[i],
          temp_min_f: CtoF(response.data.daily.temperature_2m_min[i]),
          temp_max_f: CtoF(response.data.daily.temperature_2m_max[i]),
          image: image,
          title: title,
          description: descriptions[weathercode].day.description,
          weathercode: weathercode,
          owi_code: owi_code
        })
      }

      setForecasts(forecasts);
      setIsLoading(false);
      setError("");
    }).catch((err) => {
      setError("Unable to fetch news" +err);
      setIsLoading(false);
    });
  }, [maxDays]);

  const items = forecasts.map(item => <ForecastTile key={item.time} forecast={item} />);

  return <div id='weather'>
        <div className='weather-title'>Weather in Liberland</div>

        {isLoading ? <LoadingSpinner /> : error ? <div className="error">{error}</div> : <div className='weater-tiles'>
      {items}
    </div>}

  </div>;
};

export default Weather;