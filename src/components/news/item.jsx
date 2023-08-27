import React from 'react';
import './item.css'
import RelativeTime from '../general/RelativeTime';

const Item = ({ article }) => {
  return <div className='item'>
    {article.imageSrc && 
      <img className='image' src={article.imageSrc} alt="news_image" />
    }
    {article.link ?
      <a href={article.link} target='_blank' className='title' dangerouslySetInnerHTML={{ __html: article.title }}></a>
      :
      <div className='title' dangerouslySetInnerHTML={{ __html: article.title }}></div>
    }
    <div className='time'>
      <RelativeTime time={article.date}></RelativeTime>
    </div>
    <div className='description' dangerouslySetInnerHTML={{ __html: article.text }}>
    </div>
  </div>;
};

export default Item;