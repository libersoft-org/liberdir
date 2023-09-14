export function getDefaultCurrency() {
  const defaultCurrency = navigator.language === "en-US" ? "USD" : "EUR";
  return defaultCurrency;
}
