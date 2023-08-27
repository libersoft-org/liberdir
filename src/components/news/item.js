import React from 'react';
import './item.css'
import RelativeTime from '../general/RelativeTime';

const Item = ({article}) => {
  return <div className='item'>
    {article.relationsCdn && article.relationsCdn.fileUrl &&   <div>
      <img className='image' src={article.relationsCdn.fileUrl} alt="news_image" />
    </div>}
    <div className='title'>
      {article.title}
    </div>
    <div className='time'>
      <RelativeTime time={article.created}></RelativeTime>
    </div>
    <div className='description' dangerouslySetInnerHTML={{ __html:article.perex}}>
    </div>
  </div>;
};

export default Item;