import React, { useState, useContext } from 'react';
import Item from './item';
import axios from 'axios';
import jsonpath from 'jsonpath';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { SettingsContext } from '../../Settings';

export class Article {
  id;
  title;
  text;
  imageSrc;
  date;
  baseUri;
}

const Medium = ({item}) => {
  const { title, url, fields, use_proxy } = item;

  const settings = useContext(SettingsContext);

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  React.useEffect(() => {

    if (settings === null) return;

    let fullUrl = url;
    if (use_proxy) {
      fullUrl = (settings.proxy_server ?? "") + url;
    }

    axios(fullUrl).then((response) => {
      let articles = [];
      for (let i = 0; i < response.data.length; ++i) {
        const element = response.data[i];
        let newArticle = {};

        for (const [key, value] of Object.entries(fields)) {
          if (key === 'baseUri' && value !== '-') {
            newArticle[key] = value;
            continue;
          }
          if (value === '-') continue;
          newArticle[key] = jsonpath.query(element, value);
        }
        articles.push(newArticle);
      }

      setArticles(articles);
      setIsLoading(false);
      setError("");
    }).catch(() => {
      setError("Unable to fetch news");
      setIsLoading(false);
    });
  }, [url, fields, settings, use_proxy]);

  const items = articles.map(article => <Item key={article.id} article={article} />);

  return <div className='medium'>
    <div className='main-area-title'>{title}</div>
    {isLoading ? <LoadingSpinner /> : error ? <div className="error">{error}</div> : <div>
      {items}
    </div>}
  </div>;
};

export default Medium;