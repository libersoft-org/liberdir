import React from 'react';

const ForecastTile = ({forecast}) => {

  return <div className='weater-tile'>
    <div className='weater-info'>
      <img src={forecast.image} className='weater-icon' alt={forecast.description} title={forecast.description}></img>
      <div className='weater-temperatures'>
        <div className='weater-temperature'>
          <div className='weater-temperature-max'>{ forecast.temp_max.toFixed(0)}</div>
          <div className='weater-temperature-min'>{forecast.temp_min.toFixed(0)}</div>
        </div>
        <div className='weater-temperature-f'>
          <div className='weater-temperature-max'>{ forecast.temp_max_f.toFixed(0)}</div>
          <div className='weater-temperature-min'>{forecast.temp_min_f.toFixed(0)}</div>
        </div>
      </div>

    </div>
    <div className='weater-title'>
      {forecast.title} 
    </div>

  </div>;
};

export default ForecastTile;