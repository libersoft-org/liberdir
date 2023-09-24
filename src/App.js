import './App.css';
import React, { useState } from "react";
import axios from "axios";
import ExchangeRates from './components/ExchangeRates/ExchangeRates';
import CurrencyConverter from './components/ExchangeRates/CurrencyConverter';
import Namedays from './components/Namedays';
import News from './components/news/news';
import Weather from './components/Weather/Weather';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import DanubeForecast from './components/DanubeForecast/DanubeForecast';
import { Settings, SettingsContext } from './Settings';

library.add(fas)

const currencies = ["EUR", "BTC", "ETH", "USD", "CZK", "RSD", "HUF", "GBP", "XRP"];

function App() {
  const [settings, setSettings] = useState(null);

  React.useEffect(() => {
    axios("settings.json")
      .then((response) => {
        setSettings(response.data)
    })
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
    <div>
      <div id='header'>
        <div className='inside'>
          <a className='logo' href='/'>LiberDir</a>
          <span className='spacer'></span>
          <div className='weather'>
            <Weather current/>
          </div>
        </div>
      </div>
      <div id='content'>
        <div className='inside main-content'>
          <div className='main-content-column'><News /></div>
          <div className='main-content-column'>
            <Weather maxDays={3}/>
            <DanubeForecast></DanubeForecast>
            <ExchangeRates currencies={currencies}/>
            <CurrencyConverter source="BTC" target="EUR" currencies={currencies}/>
            <Namedays />
          </div>
        </div>
      </div>
      <div id='footer'>
        <div className='inside'>
          <a href='/'>LiberDir.com</a>
          , 2023
        </div>
      </div>
    </div>
    </SettingsContext.Provider>
  );
}

export default App;
