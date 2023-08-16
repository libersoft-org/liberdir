import React from 'react';
import Item from './item';

const Medium = (prop) => {
  return <>
    <div className='medium'>{prop.title}</div>
    <Item />
    <Item />
  </>;
};

export default Medium;