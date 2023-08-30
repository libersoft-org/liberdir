import React, { useState } from 'react';
import Item from './item';
import axios from 'axios';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Medium = (prop) => {
  const {title, url} = prop.item;

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  React.useEffect(() => {
    axios(url).then((response) => {
      setArticles(response.data);
      setIsLoading(false);
      setError(false);
    }).catch(() => {
      setError("Unable to fetch news");
      setIsLoading(false);
   });
  }, []);

  return <>
    <div className='medium'>{title}</div>
    {isLoading ? <LoadingSpinner /> : error ? <div className="error">{error}</div> : articles.map((item) => {
      return <Item key={item.title} data={item}/>
    })}
  </>;
};

export default Medium;