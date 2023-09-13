import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocalStorage } from "@uidotdev/usehooks";

const ForecastTile = ({forecast}) => {

  const defaultTemperatureUnit = navigator.language === 'en-US' ? 'f' : 'c';

  const [temperatureUnit, setTemperatureUnit] = useLocalStorage("temperature-unit", defaultTemperatureUnit);

  function changeUnit(unit) {
    setTemperatureUnit(unit)
  }

  return <div className='weater-tile'>
    <div className='weater-info'>
 
    <div>
      <FontAwesomeIcon className='weater-icon' icon={forecast.icon} size="3x" />
      <div class="weater-description">{forecast.description}</div>
    </div>
    <div className='weater-temperatures'>
      <div className='weater-temperature'>
        <div className='weater-temperature-max'><span className='weater-temperature-label'>H:</span>{temperatureUnit === 'f' ? forecast.temp_max_f.toFixed(0) : forecast.temp_max.toFixed(0)}</div>
        <div className='weater-temperature-min'><span className='weater-temperature-label'>L:</span>{temperatureUnit === 'f' ? forecast.temp_min_f.toFixed(0) : forecast.temp_min.toFixed(0)}</div>
        <div className='weater-temperature-unit'>
          <span className={`weater-temperature-unit-switch ${temperatureUnit === "f" ? "selected" : ""}`} onClick={() => changeUnit('f')}>°F</span>
          <span className={`weater-temperature-unit-switch ${temperatureUnit !== "f" ? "selected" : ""}`} onClick={() => changeUnit('c')}>°C</span >
        </div>
      </div>
    </div>
    </div>
    <div className='weater-title'>
      {forecast.title} 
    </div>

  </div>;
};

export default ForecastTile;