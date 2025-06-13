export const displayPrice = (price?: string): string => {
  if (price && price !== 'No price available') {
    return '$' + price;
  } else {
    return 'No price available';
  }
};
