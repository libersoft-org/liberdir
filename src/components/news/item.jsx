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

const Item = ({ article }) => {
  return <div className='item'>
    {article.imageSrc && 
      <img className='image' src={article.imageSrc} alt="news_image" />
    }
    {article.link ?
      <a href={(article.baseUri ?? '') + article.link} target='_blank' rel="noreferrer" className='title'>{getTextContentOnly(article.title)}</a>
      :
      <div className='title'>{getTextContentOnly(article.title)}</div>
    }
    <div className='time'>
      <RelativeTime time={article.date}></RelativeTime>
    </div>
    <div className='description'>
      {getTextContentOnly(article.text)}
    </div>
  </div>;
};

export default Item;