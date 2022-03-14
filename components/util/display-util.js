export const priceCalculator = (
  amount: string | number,
  currencyType: string,
) => {
  let fixedPrice;
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  if (amount) {
    fixedPrice = Number(amount).toLocaleString('en', options);
  } else {
    fixedPrice = 0;
  }
  return `${currencyType}${fixedPrice}`;
};
