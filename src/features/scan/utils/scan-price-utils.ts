export const displayScanPrice = (price?: string): string => {
  if (price !== 'unknown') {
    return `$${price}`;
  } else {
    return 'No price available';
  }
};
