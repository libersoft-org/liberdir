import logo from './logo.svg';
import './App.css';
import News from './components/news/news';

function App() {
  return (
    <div>
      <div id="header">
        <div className="inside">
          LiberDir
        </div>
      </div>
      <div id="content">
        <div className="inside">
          <News />
        </div>
      </div>
    </div>
  );
}

export default App;
