import React, { useState } from "react";
import axios from "axios";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useLocalStorage } from "usehooks-ts";
import CurrencyTile from "./CurrencyTile";

const requestURL =
  "https://min-api.cryptocompare.com/data/price?fsym={BASE_CURRENCY}&tsyms={CURRENCIES}";

type Params = {
  source: string;
  target: string;
  value?: number;
  currencies: string[];
};

export default function CurrencyConverter(params: Params) {
  const [convertedValue, setConvertedValue] = useState<number>(-1);
  const [value, setValue] = useLocalStorage<number>("currency-converter-value", params.value ?? 1);
  const [source, setSource] = useLocalStorage<string>("currency-converter-source", params.source);
  const [target, setTarget] = useLocalStorage<string>("currency-converter-target", params.target);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>();
  const [reloading, setReloading] = useState(false);


  React.useEffect(() => {

    axios(
      requestURL.replace("{BASE_CURRENCY}", source).replace("{CURRENCIES}", target)
    )
      .then((response) => {
        setReloading(false);
        if (!response.data[target]) {
          setIsLoading(false);
          setError("no rates found for " + source + " to " + target);
          setConvertedValue(-1);
          return;
        }

        const rate = response.data[target];
        setConvertedValue(rate * value);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError("Unable to fetch rates data. " + err);
        setIsLoading(false);
      });
  }, [value, source, target]);

  return (
    <div id="currency-converter">
      <div className="main-area-title">
        <span>Currency Converter</span>
      </div>

      {isLoading ? (<LoadingSpinner small={false} />) : (
        <>
          {error && (<div className="error">{error}</div>)}

          <div className="currency-converter-wrapper">
            <CurrencyTile currency={source} value={value} currencyList={params.currencies}
              onSelect={(v) => { setReloading(true); setSource(v) }}
              onValueChange={(v) => { setReloading(true); setValue(v) }} editable></CurrencyTile>
            <CurrencyTile currency={target} value={convertedValue} currencyList={params.currencies}
              onSelect={(v) => { setReloading(true); setTarget(v) }} loading={reloading}></CurrencyTile>
          </div>

        </>)}
    </div>
  );
}
