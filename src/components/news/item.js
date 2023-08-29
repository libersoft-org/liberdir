import React from 'react';
import './item.css'

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

const Item = (prop) => {
  const {title, relationsCdn, published, perex, titleUri} = prop.data;
  return <div className='item'>
    <div><img className='image' src={relationsCdn.fileUrl} alt="news_image" /></div>
    <div className='title'><a href={`https://liberland.org/en/news/${titleUri}`}>{title}</a></div>
    <div className='time'>{published}</div>
    <div className='description'>{getTextContentOnly(perex)}</div>
  </div>;
};

export default Item;