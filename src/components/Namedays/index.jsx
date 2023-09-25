import React, { useState } from 'react';
import axios from 'axios';

import './namedays.scss';

const urls = [
    'https://nameday.abalin.net/api/V1/today',
    'https://nameday.abalin.net/api/V1/tomorrow',
]


const Namedays = () => {
  const [names, setNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  React.useEffect(() => {
    const requests = urls.map((url) => axios.get(url));
    const countries = {
        'cz': 'Czech', 
        'hr': 'Croatia',
        'hu': 'Hungary',
        'pl': 'Poland',
        'sk': 'Slovakia',
        'us': 'United States',
    }
    
    axios.all(requests).then((responses) => {
      let items = {};
      for (const response of responses) {
        for (const [key, value] of Object.entries(countries)) {
          if (!(value in items)) {
            items[value] = [];
          }
          items[value].push(response.data.nameday[key]);
        }
      }
    
      setNames(items);
      setIsLoading(false);
      setError("");
    }).catch(() => {
      setError("Unable to fetch news");
      setIsLoading(false);
    });
  }, [urls]);
    

    const items = Object.keys(names).map((key, index) => {
        return <div key={index} className='namedays-row'>
            <div>{key}</div>
            {names[key].map((value, idx) => <div key={idx}>{value}</div>)}
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