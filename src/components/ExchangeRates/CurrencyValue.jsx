import { useLocalStorage } from "@uidotdev/usehooks";
import { getDefaultCurrency } from "./functions";

const CurrencyValue = ({currency, value, precission = 2, clickable}) => {

    const [_, setBaseCurrency] = useLocalStorage("base-currency", getDefaultCurrency());

    return (
        <div className="exchage-rates-currency-value">
            <span className="value">{value.toFixed(precission)}</span>
            {clickable ? 
            <>
                <span className="currency pointer" onClick={() => setBaseCurrency(currency)}>{currency}</span> 
                <span className={`icon pointer ${currency.toLowerCase()}`} onClick={() => setBaseCurrency(currency)}></span>
            </>
            :
            <>
                <span className="currency">{currency}</span> 
                <span className={`icon ${currency.toLowerCase()}`}></span>
            </>
            }
        </div>
    );
  };
  
  export default CurrencyValue;
  