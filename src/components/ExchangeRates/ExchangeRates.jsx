import React, { useState } from "react";
import axios from "axios";
import { useLocalStorage } from "@uidotdev/usehooks";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import CurrencyValue from "./CurrencyValue";
import { getBestprecissionForValue, getDefaultCurrency } from "./functions";

import './ExchangeRates.scss';

const requestURL = "https://min-api.cryptocompare.com/data/price?fsym={BASE_CURRENCY}&tsyms={CURRENCIES}"

const ExchangeRates = ({currencies}) => {
  const [rates, setRates] = useState([]);
  const [baseCurrency, setBaseCurrency] = useLocalStorage("base-currency", getDefaultCurrency());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  React.useEffect(() => {
    axios(requestURL.replace("{BASE_CURRENCY}", baseCurrency).replace('{CURRENCIES}', currencies.join(",")))
      .then((response) => {
        let rates = [];

        for (let i = 0; i < currencies.length; i++) {
          const currency = currencies[i];
          if (!response.data[currency]) {
            rates.push({ currency, rate: -1 });
            continue;
          };
          const rate = response.data[currency];
          rates.push({ currency, rate });
        }

        setRates(rates);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError("Unable to fetch rates data. " + err);
        setIsLoading(false);
      });
  }, [baseCurrency, currencies]);

  let items = rates.map((item) => {
    return <CurrencyValue selected={item.currency === baseCurrency} 
      key={item.currency} value={item.rate} currency={item.currency} 
      onSelect={(c)=>setBaseCurrency(c)}
      precission={getBestprecissionForValue(item.rate)} clickable/>
  });

  return (
    <div id="exchange-rates">
      <div className="main-area-title">
        <span>Exchange Rates</span>
      </div>

      {isLoading ? 
        <LoadingSpinner/> : error ? <div className="error">{error}</div> :
        <div>
          <div className="exchange-rates-wrapper">
            <div className="exchage-rates-results" >
              {items}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ExchangeRates;
