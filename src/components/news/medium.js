import React, { useState } from 'react';
import Item from './item';
import axios from 'axios';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import "./medium.css";

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

  const items = articles.map(article => <Item key={article.id} article={article} />);

  return <div className='medium'>
    <div className='medium-title'>{title}</div>
    {isLoading ? <LoadingSpinner /> : error ? <div className="error">{error}</div> : <div>
      {items}
    </div>}
  </div>;
};

export default Medium;