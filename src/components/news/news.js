import React from 'react';
import Medium from './medium';
import './news.css'

import news from './sources.json'

const News = () => {
  return <div id='news'>
    {news.map((item) => {
        return <Medium key={item.title} item={item} />;
    })}
  </div>;
};

export default News;