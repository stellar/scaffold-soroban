import BigNumber from "bignumber.js";

export const truncateString = (str: string) =>
  str ? `${str.slice(0, 5)}…${str.slice(-5)}` : "";

export const stroopToXlm = (
  stroops: BigNumber | string | number,
): BigNumber => {
  if (stroops instanceof BigNumber) {
    return stroops.dividedBy(1e7);
  }
  return new BigNumber(Number(stroops) / 1e7);
};

export const xlmToStroop = (lumens: BigNumber | string): BigNumber => {
  if (lumens instanceof BigNumber) {
    return lumens.times(1e7);
  }
  // round to nearest stroop
  return new BigNumber(Math.round(Number(lumens) * 1e7));
};

export const formatTokenAmount = (amount: BigNumber, decimals: number) => {
  let formatted = amount.shiftedBy(-decimals).toFixed(decimals).toString();

  // Trim trailing zeros
  while (formatted[formatted.length - 1] === "0") {
    formatted = formatted.substring(0, formatted.length - 1);
  }

  if (formatted.endsWith(".")) {
    formatted = formatted.substring(0, formatted.length - 1);
  }
  return formatted;
};
