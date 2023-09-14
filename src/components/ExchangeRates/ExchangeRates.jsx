import React, { useState } from "react";
import axios from "axios";
import { useLocalStorage } from "@uidotdev/usehooks";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import CurrencyValue from "./CurrencyValue";
import { getDefaultCurrency } from "./functions";

import './ExchangeRates.scss';

const requestURL =
  "https://api.exchangerate.host/latest?base={BASE_CURRENCY}&symbols={CURRENCIES}";

const ExchangeRates = ({currencies}) => {
  const [rates, setRates] = useState([]);
  const [baseCurrencyValue, setBaseCurrencyValue] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const [baseCurrency] = useLocalStorage("base-currency", getDefaultCurrency());

  React.useEffect(() => {
    axios(requestURL.replace("{BASE_CURRENCY}", baseCurrency).replace('{CURRENCIES}', currencies.join(",")))
      .then((response) => {
        let rates = [];

        let baseCurrencyValue = 1;

        for (let i = 0; i < currencies.length; i++) {
          const currency = currencies[i];
          if (currency === baseCurrency) continue;
          if (!response.data.rates[currency]) continue;
          const rate = response.data.rates[currency];
          if (rate < 0.3 && baseCurrencyValue < 100) {
            baseCurrencyValue = 100;
          }
          if (rate < 0.03 && baseCurrencyValue < 1000) {
            baseCurrencyValue = 1000;
          }
          rates.push({ currency, rate });
        }

        for (let i = 0; i < rates.length; i++) {
          rates[i].rate = rates[i].rate*baseCurrencyValue;
        }

        setRates(rates);
        setIsLoading(false);
        setError(null);
        setBaseCurrencyValue(baseCurrencyValue);
      })
      .catch((err) => {
        setError("Unable to fetch rates data. " + err);
        setIsLoading(false);
      });
  }, [baseCurrency, currencies]);

  let items = rates.map((item) => <CurrencyValue key={item.currency} value={item.rate} currency={item.currency} precission={2} clickable/>);

  return (
    <div id="exchange-rates">
      <div className="main-area-title">Exchange Rates</div>

      {isLoading ? 
        <LoadingSpinner/> : error ? <div className="error">{error}</div> :
        <div>
          <div className="exchange-rates-wrapper">
            <div className="exchage-rates-results">
            <CurrencyValue value={baseCurrencyValue} currency={baseCurrency} precission={0}/>
              {items}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ExchangeRates;
