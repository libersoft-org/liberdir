const CurrencyValue = ({currency, value, precission = 2, clickable, selected, onSelect}) => {

    function onClick() {
        if (!clickable) return;
        if (onSelect) {
            onSelect(currency);
        }
    }

    return (
        <div className="exchage-rates-currency-value-wrapper">
            <div className={`exchage-rates-currency-value ${clickable ? 'pointer': ''} ${selected ? 'exchage-rates-currency-value-selected': ''}`}
                onClick={onClick}
            >
                <span className={"exchage-rates-currency-value-number precission-" + precission}>{
                    value === -1 ? "-" : value.toFixed(precission)}
                </span>
                <span className="exchage-rates-currency-value-currency">{currency}</span> 
                <div class="currency-flag currency-flag-usd"></div>
                <span className={`exchage-rates-currency-value-icon ${currency.toLowerCase()}`}>{currency}</span>
            </div>
        </div>
    );
  };
  
  export default CurrencyValue;
  