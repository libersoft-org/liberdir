import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocalStorage } from 'usehooks-ts'

const ForecastTile = ({forecast}) => {

  const defaultTemperatureUnit = navigator.language === 'en-US' ? 'f' : 'c';

  const [temperatureUnit, setTemperatureUnit] = useLocalStorage("temperature-unit", defaultTemperatureUnit);

  function changeUnit(unit) {
    setTemperatureUnit(unit)
  }

  return <div className='weather-tile'>
    <div className='weather-info'>
 
    <div>
      <FontAwesomeIcon className='weather-icon' icon={forecast.icon} size="3x" />
      <div className="weather-description">{forecast.description}</div>
    </div>
    <div className='weather-temperatures'>
      <div className='weather-temperature'>
        <div className='weather-temperature-max'><span className='weather-temperature-label'>H:</span>{temperatureUnit === 'f' ? forecast.temp_max_f.toFixed(0) : forecast.temp_max.toFixed(0)}</div>
        <div className='weather-temperature-min'><span className='weather-temperature-label'>L:</span>{temperatureUnit === 'f' ? forecast.temp_min_f.toFixed(0) : forecast.temp_min.toFixed(0)}</div>
        <div className='weather-temperature-unit'>
          <span className={`weather-temperature-unit-switch ${temperatureUnit === "f" ? "selected" : ""}`} onClick={() => changeUnit('f')}>°F</span>
          <span className={`weather-temperature-unit-switch ${temperatureUnit !== "f" ? "selected" : ""}`} onClick={() => changeUnit('c')}>°C</span >
        </div>
      </div>
    </div>
    </div>
    <div className='weather-title'>
      {forecast.title} 
    </div>

  </div>;
};

export default ForecastTile;