import { useState } from "react";
import { Dropdown, } from "react-bootstrap";
import Currency from "./Currency";

import './CurrencySelector.scss';

type Params = {
  currency: string;
  currencies: string[];
  onSelect?: (currency: string) => void;
};

export default function CurrencySelector(params: Params) {
  const [currency, setCurrency] = useState<string>(params.currency);

  function doSelect(c: any) {
    setCurrency(c);
    if (params.onSelect) {
      params.onSelect(c);
    }
  }

  let options = [];
  for (let i = 0; i < params.currencies.length; i++) {
    options.push(
      <Dropdown.Item key={params.currencies[i]} className={"currency-combo-option " + params.currencies[i]} eventKey={params.currencies[i]}>
        <Currency code={params.currencies[i]} showFlag showCode></Currency>
      </Dropdown.Item>
    );
  }

  return (
    <div className="exchange-rates-currency-selector">
      <Dropdown className="currency-dropdown" onSelect={(eventKey: any) => doSelect(eventKey)} >
        <Dropdown.Toggle variant="info">
          <Currency code={currency} showFlag showCode></Currency>
        </Dropdown.Toggle>
        <Dropdown.Menu>{options}</Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
