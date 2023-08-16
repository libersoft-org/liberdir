import React from 'react';
import './item.css'

const Item = () => {
  return <div className='item'>
    <div>
      <img className='image' src={process.env.PUBLIC_URL + '/placeholder.jpg'} alt="news_image" />
    </div>
    <div className='title'>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit
    </div>
    <div className='time'>
      10 minutes ago
    </div>
    <div className='description'>
      Sed convallis magna eu sem. Integer tempor. Phasellus et lorem id felis nonummy placerat. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo. Mauris dictum facilisis augue. Temporibus autem
    </div>
  </div>;
};

export default Item;