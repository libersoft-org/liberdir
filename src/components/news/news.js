import React from 'react';
import Medium from './medium';

import news from './sources.json'

const News = () => {
  return <div id='news'>
    {news.map((item) => {
        return <Medium title={item.title} />;
    })}
  </div>;
};

export default News;