import React, { useState } from "react";
import axios from "axios";
import { useLocalStorage } from 'usehooks-ts'

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import CurrencyTile from "./CurrencyTile";
import { getDefaultCurrency } from "./functions";

import './ExchangeRates.scss';

// more info https://github.com/fawazahmed0/currency-api
const requestURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/{BASE_CURRENCY}.min.json";

type ExchangeRatesParams = {
  currencies: string[];
}

type Rate = {
  rate: number;
  currency: string;
}

export default function ExchangeRates({ currencies }: ExchangeRatesParams) {
  const [rates, setRates] = useState<Rate[]>([]);
  const [baseCurrency, setBaseCurrency] = useLocalStorage("base-currency", getDefaultCurrency());
  const [isLoading, setIsLoading] = useState(true);
  const [reloading, setReloading] = useState(false);
  const [error, setError] = useState<string | null>();

  React.useEffect(() => {
    axios(requestURL.replace("{BASE_CURRENCY}", baseCurrency.toLowerCase()))
      .then((response) => {
        let rates = [];
        const data = response.data[baseCurrency.toLowerCase()];

        for (let i = 0; i < currencies.length; i++) {
          const currency = currencies[i];
          const currencyLC = currency.toLowerCase();
          if (!data[currencyLC]) {
            rates.push({ currency, rate: -1 });
            continue;
          };
          const rate = data[currencyLC];
          rates.push({ currency, rate });
        }

        setRates(rates);
        setIsLoading(false);
        setError(null);
        setReloading(false);
      })
      .catch((err) => {
        setError("Unable to fetch rates data. " + err);
        setIsLoading(false);
        setReloading(false);
      });
  }, [baseCurrency, currencies]);

  let items = rates.map((item) => {
    return <CurrencyTile selected={item.currency === baseCurrency} key={item.currency} value={item.rate}
      currency={item.currency} onSelect={(c: string) => { 
        if (baseCurrency !== c) {
          setReloading(true); 
          setBaseCurrency(c) 
        }
      }}
      clickable loading={reloading} />
  });

  return (
    <div id="exchange-rates">
      <div className="main-area-title">
        <span>Exchange Rates</span>
      </div>

      {isLoading ?
        <LoadingSpinner small={false} /> : error ? <div className="error">{error}</div> :
          <div>
            <div className="exchange-rates-wrapper">
              {items}
            </div>
          </div>
      }
    </div>
  );
};
