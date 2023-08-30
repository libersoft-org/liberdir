import React from 'react';
import './item.css'
import RelativeTime from '../general/RelativeTime';

const getTextContentOnly = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const walker = document.createTreeWalker(
        doc.body, 
        NodeFilter.SHOW_TEXT, 
        null, 
        false
    );
    const texts = [];
    let node;
    while(node = walker.nextNode()) {
        texts.push(node.nodeValue);
    }
    return texts;
}

const Item = ({article}) => {
  const {title, relationsCdn, published, perex, titleUri} = article;
  
  return <div className='item'>
    {relationsCdn && relationsCdn.fileUrl && <div>
      <img className='image' src={relationsCdn.fileUrl} alt="news_image" />
    </div>}
    <div className='title'>
      <a href={`https://liberland.org/en/news/${titleUri}`}>
        {title}
      </a>
    </div>
    <div className='time'>
      <RelativeTime time={article.created}></RelativeTime>
    </div>
    <div className='description' >
      {getTextContentOnly(perex)}
    </div>
  </div>;
};

export default Item;