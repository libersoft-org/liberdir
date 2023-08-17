import React from 'react';
import Medium from './medium';

import news from './sources.json'

const News = () => {
  return <div id='news'>
    {news.map((item) => {
        return <Medium item={item} />;
    })}
  </div>;
};

export default News;