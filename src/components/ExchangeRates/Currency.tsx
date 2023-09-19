import "./Currency.scss";

type Params = {
  code: string;
  showFlag?: boolean;
  showCode?: boolean;
};

export default function Currency(params: Params) {
  return (
    <div className="exchage-rates-currency">
      {params.showCode && (
        <span className="exchage-rates-currency-code">{params.code}</span>
      )}
      {params.showFlag && (
        <span
          className={`exchage-rates-currency-flag ${params.code.toLowerCase()}`}
        >
          {params.code}
        </span>
      )}
    </div>
  );
}
