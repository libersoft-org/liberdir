export function getDefaultCurrency() {
  const defaultCurrency = navigator.language === "en-US" ? "USD" : "EUR";
  return defaultCurrency;
}

export function getBestPrecisionForValue(v) {
  if (v === 1.0) return 0;
  if (v < 0) return 0;

  if (v > 1000) return 0;
  if (v > 100) return 1;


  if (v < 0.0000001) return 9;
  if (v < 0.000001) return 8;
  if (v < 0.00001) return 7;
  if (v < 0.0001) return 6;
  if (v < 0.001) return 5;
  if (v < 0.01) return 4;
  if (v < 0.1) return 3;
  return 2;
}
