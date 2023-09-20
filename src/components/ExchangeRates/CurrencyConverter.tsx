import React, { useState } from "react";
import axios from "axios";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useLocalStorage } from "usehooks-ts";
import CurrencyTile from "./CurrencyTile";

// more info https://github.com/fawazahmed0/currency-api
const requestURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/{BASE_CURRENCY}.min.json";

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
      requestURL.replace("{BASE_CURRENCY}", source.toLowerCase())
    )
      .then((response) => {
        const sourceLC = source.toLowerCase();
        const targetLC = target.toLowerCase();
        setReloading(false);
        if (!response.data[sourceLC] || !response.data[sourceLC][targetLC]) {
          setIsLoading(false);
          setError("no rates found for " + source + " to " + target);
          setConvertedValue(-1);
          return;
        }

        const rate = response.data[sourceLC][targetLC];
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
              onSelect={(v) => { 
                if (source !== v) {
                  setReloading(true); 
                  setSource(v);
                }
              }}
              onValueChange={(v) => { 
                if (value !== v) {
                  setReloading(true); 
                  setValue(v) 
                }
              }} editable></CurrencyTile>
            <CurrencyTile currency={target} value={convertedValue} currencyList={params.currencies}
              onSelect={(v) => {
                if (target !== v) {
                  setReloading(true);
                  setTarget(v);
                }
              }} loading={reloading}></CurrencyTile>
          </div>

        </>)}
    </div>
  );
}
