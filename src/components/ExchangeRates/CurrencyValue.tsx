type CurrencyValueParams = {
    currency: string;
    value: number;
    precission?: number;
    clickable?: boolean;
    selected?: boolean;
    onSelect?: (currency: string) => void;
}

export default function CurrencyValue({ currency, value, precission = 2, clickable, selected, onSelect }: CurrencyValueParams) {

    function onClick() {
        if (!clickable) return;
        if (onSelect) {
            onSelect(currency);
        }
    }

    return (
        <div className="exchage-rates-currency-value-wrapper">
            <div className={`exchage-rates-currency-value 
                    ${clickable ? 'pointer' : ''} 
                    ${selected ? 'exchage-rates-currency-value-selected' : ''}`}
                onClick={onClick}
            >
                <span className={"exchage-rates-currency-value-number precission-" + precission}>
                    {value === -1 ? "-" : value.toFixed(precission)}
                </span>
                <span className="exchage-rates-currency-value-currency">{currency}</span>
                <span className={`exchage-rates-currency-value-icon ${currency.toLowerCase()}`}>{currency}</span>
            </div>
        </div>
    );
};
