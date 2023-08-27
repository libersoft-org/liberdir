import React from 'react';
import Item from './item';
import axios from 'axios';

import "./medium.css";

const Medium = (prop) => {
  const { title, url } = prop.item;

  const [articles, setArticles] = React.useState([]);

  React.useEffect(() => {
    //     const testURL = 'http://localhost:8088/https://api.liberland.org/news?lang=en&page=1&limit=2&order=-published';
    //     const myInit = {
    //   method: 'HEAD',
    //   mode: 'no-cors',
    //     };

    //     const myRequest = new Request(testURL, myInit);

    //     fetch(myRequest).then(function(response) {
    //       setArticles(response)
    //     }).then(function(response) {
    //       console.log(response);
    //     }).catch(function(e){
    //       console.log(e);
    //     });

    axios({
      method: 'get',
      url,
      withCredentials: false,
      mode: 'no-cors',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length",
      },
    }).then((response) => {
      setArticles(response.data);
    });
  }, [url]);

  const items = articles.map(article => <Item key={article.id} article={article} />);

  return <div className='medium'>
    <div className='medium-title'>{title}</div>
    <div>
      {items}
    </div>
  </div>;
};

export default Medium;