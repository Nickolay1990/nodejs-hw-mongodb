import 'dotenv/config';

export const getEnvVar = (value, defValue) => {
  const envValue = process.env[value];
  if (envValue) {
    return envValue;
  }
  if (defValue) {
    return defValue;
  }
  throw new Error(`Missing: process.env['${value}'].`);
};
