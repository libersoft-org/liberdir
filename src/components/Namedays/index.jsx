import React, { useState } from 'react';
import nameday from './nameday.json';

import './namedays.scss';

const Namedays = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const countries = {
    'cz': 'Czech', 
    'hr': 'Croatia',
    'hu': 'Hungary',
    'pl': 'Poland',
    'sk': 'Slovakia',
    'us': 'United States',
  }
      
  const items = Object.keys(countries).map((key, index) => {
    return <div key={index} className='namedays-row'>
      <div>{key}</div>
      <div>{nameday[today.getMonth() + 1][today.getDate() + 1][key]}</div>
      <div>{nameday[tomorrow.getMonth() + 1][tomorrow.getDate() + 1][key]}</div>
    </div>
  });

  return <div id='namedays'>
    <div className='main-area-title'>Namedays</div>
    <div className='namedays-wrapper'>
      <div className='namedays-row namedays-header'>
        <div></div>
        <div>Today</div>
        <div>Tomorrow</div>
      </div>
      {items}
    </div>
  </div>;
};

export default Namedays;