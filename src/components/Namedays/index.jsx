import React, { useState } from 'react';
import nameday from './nameday.json';

import './namedays.scss';

function isLeapYear(year = new Date()) {
	if (!(year instanceof Date) && typeof year !== 'number') {
		throw new TypeError(`Expected \`year\` to be of type \`Date\` or \`number\`, got \`${typeof year}\``);
	}

	year = year instanceof Date ? year.getFullYear() : year;
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

const Namedays = () => {
  if (isLeapYear(2024) && nameday[2][24]['hu'] == "Mátyás") {
    for (let i = 28; i >= 23; --i) {
      nameday[2][i+1]['hu'] = nameday[2][i]['hu'];
    }
    nameday[2][24]['hu'] = "";
  }

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