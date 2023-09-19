import { CurrencyAmount } from "./CurrencyAmount";
import "./Currency.scss";
import CurrencySelector from "./CurrencySelector";

type Params = {
  currency: string;
  value: number;
  precision?: number;
  clickable?: boolean;
  selected?: boolean;
  onSelect?: (currency: string) => void;
  currencyList?: string[];
  onValueChange?: (value: number) => void;
  loading?: boolean;
  editable?: boolean;
};

export default function CurrencyTile(params: Params) {
  function onClick() {
    if (!params.clickable) return;
    if (params.onSelect) {
      params.onSelect(params.currency);
    }
  }

  function onSelectCurrency(c: string) {
    if (params.onSelect) {
      params.onSelect(c);
    }
  }


  return (
    <div className="">
      <div
        className={`exchage-rates-currency-tile 
                    ${params.clickable ? "pointer" : ""} 
                    ${params.selected
            ? "exchage-rates-currency-tile-selected"
            : ""
          }`}
        onClick={onClick}
      >
        <CurrencyAmount amount={params.value} currency={params.currency}
          showFlag={!params.currencyList} onValueChange={params.onValueChange}
          showCode={!params.currencyList} precision={params.precision}
          reducedSize={!!params.currencyList} loading={params.loading} editable={params.editable}></CurrencyAmount>
        {params.currencyList &&
          <CurrencySelector currencies={params.currencyList} currency={params.currency} onSelect={(v) => onSelectCurrency(v)}></CurrencySelector>}
      </div>
    </div>
  );
}
