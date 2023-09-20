import { useState } from "react";
import Currency from "./Currency";
import "./Currency.scss";
import { getBestPrecisionForValue } from "./functions";

type Params = {
  currency: string;
  amount: number;
  amountStr?: string;
  showFlag?: boolean;
  showCode?: boolean;
  precision?: number
  reducedSize?: boolean;
  onValueChange?: (value: number) => void;
  loading?: boolean;
  editable?: boolean;
};

export function CurrencyAmount(params: Params) {

  const [amountStr, setAmount] = useState<string>(params.amount.toString());

  function doClick() {

    if (!params.onValueChange) return;

    const v = prompt("enter value", params.amount.toString());
    if (v) {
      let vv = parseFloat(v);
      if (!isNaN(vv)) {
        params.onValueChange(vv);
      }
    }
  }

  const precision = params.precision ?? getBestPrecisionForValue(params.amount);
  let value = params.amount;
  let strVal = value.toFixed(precision);
  let sufix = "";

  let maxChars = 15;
  let extraSpace = 0;
  if (params.reducedSize) extraSpace += 5;
  if (params.showCode) extraSpace += 2;
  if (params.showFlag) extraSpace += 2;

  let len = strVal.length + extraSpace;

  if (len > maxChars) {
    if (value < 1) {
      strVal = "~0";
      sufix = "";
    } else {
      strVal = "many";
      sufix = "";
    }
  }

  if (value <= 0) {
    strVal = "?"
    sufix = ""
  }

  const className = "exchage-rates-currency-amount-value value-len-" + len + (params.loading ? " value-loading" : "");

  function doChanveValue(val: string) {
    setAmount(val)

    let valNr = parseFloat(val);
    if (isNaN(valNr)) valNr = -1;
    if (params.onValueChange) {
      params.onValueChange(valNr)
    }
  }

  return (
    <div className={"exchage-rates-currency-amount"}>
      {params.editable ?
        <input className={className} value={amountStr} onChange={($e)=> doChanveValue($e.target.value)} maxLength={7}></input> :
        <span className={className} onClick={doClick}>{strVal + sufix}</span>
      }
      <Currency code={params.currency} showFlag={params.showFlag} showCode={params.showCode}></Currency>

    </div>
  );
}
