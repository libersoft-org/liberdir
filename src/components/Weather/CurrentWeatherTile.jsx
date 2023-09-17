import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocalStorage } from 'usehooks-ts'

const CurrentWeatherTile = ({forecast}) => {

  const defaultTemperatureUnit = navigator.language === 'en-US' ? 'f' : 'c';

  const [temperatureUnit, setTemperatureUnit] = useLocalStorage("temperature-unit", defaultTemperatureUnit);

  function toggleUnit() {
    if (temperatureUnit === "f")
      setTemperatureUnit("c") 
    else 
      setTemperatureUnit("f")
  }

  return <div className='current-weather-tile'>
      <FontAwesomeIcon className='weather-icon' icon={forecast.icon} size="1x" />
      <div className='weather-temperature'>{temperatureUnit === 'f' ? forecast.temp_max_f.toFixed(0) : forecast.temp_max.toFixed(0)}</div>
      <div className='weather-temperature-unit'>
      <span className="weather-temperature-unit-switch" onClick={toggleUnit}>°{temperatureUnit === "f" ? "F" : "C"}</span>
      </div>
  </div>;
};

export default CurrentWeatherTile;