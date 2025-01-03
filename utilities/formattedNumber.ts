const locale = Intl.NumberFormat().resolvedOptions().locale; // Get device locale
export const formattedPrice = (price: number, fraction = 2) => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  }).format(price);
};

export const unformattedPrice = (price: string) => {
  return Number(price.replace(/[^0-9]/g, ""));
};

export const stripDotAndComma = (price: string) => {
  return price.replace(/[.,]/g, "");
};
