import axios from 'axios';

export const fetchConversionRate = async (
  baseCurrency: string,
  targetCurrency: string
): Promise<number> => {
  const response = await axios.get(
    `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
  );
  const rate = response.data.rates[targetCurrency];
  if (!rate) {
    throw new Error(`Conversion rate for ${targetCurrency} not found.`);
  }
  return rate;
};
