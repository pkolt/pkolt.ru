import type Decimal from 'decimal.js';

export const getResistance = (batteryVoltage: Decimal, ledVoltage: Decimal, ledCurrent: Decimal): Decimal => {
  return batteryVoltage.minus(ledVoltage).div(ledCurrent.div(1000));
};

export const getPower = (resistance: Decimal, ledCurrent: Decimal): Decimal => {
  return ledCurrent.div(1000).pow(2).mul(resistance);
};

export const validateNumber = (value: null | number): boolean => typeof value === 'number' && value > 0;
