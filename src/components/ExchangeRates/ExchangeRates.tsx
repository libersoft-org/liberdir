import React, { useState } from "react";
import axios from "axios";
import { useLocalStorage } from 'usehooks-ts'

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import CurrencyTile from "./CurrencyTile";
import { getDefaultCurrency } from "./functions";

import './ExchangeRates.scss';

const requestURL = "https://min-api.cryptocompare.com/data/price?fsym={BASE_CURRENCY}&tsyms={CURRENCIES}"

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
      currency={item.currency} onSelect={(c: string) => { setReloading(true); setBaseCurrency(c) }}
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
