import Medium from './medium';
import './news.css'

var news = require('./sources.json');

const News = () => {
  return <div id='news'>
    {news.map((item, idx) => {
      return <Medium key={idx} item={item} />;
    })}
  </div>;
};

export default News;