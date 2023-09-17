import './App.css';
import ExchangeRates from './components/ExchangeRates/ExchangeRates';
import Namedays from './components/Namedays';
import News from './components/news/news';
import Weather from './components/Weather/Weather';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

function App() {
  return (
    <div>
      <div id='header'>
        <div className='inside'>
          <a className='logo'>LiberDir</a>
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
            <ExchangeRates currencies={["EUR", "BTC", "ETH", "USD", "CZK", "RSD", "HUF", "GBP", "XRP"]}/>
            <Namedays />
          </div>
        </div>
      </div>
      <div id='footer'>
        <div className='inside'>
          <a href=''>LiberDir.com</a>
          , 2023
        </div>
      </div>
    </div>
  );
}

export default App;
