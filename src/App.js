import './App.css';
import News from './components/news/news';
import Weather from './components/Weather/Weather';

function App() {
  return (
    <div>
      <div id='header'>
        <div className='inside'>
          <a className='logo'>LiberDir</a>
        </div>
      </div>
      <div id='content'>
        <div className='inside main-content'>
          <div className='main-content-column'><News /></div>
          <div className='main-content-column'><Weather maxDays={3}/></div>
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
