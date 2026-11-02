import dotenv from 'dotenv';

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 3000),
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
  EBAY_APP_ID: process.env.EBAY_APP_ID || '',
  AMAZON_API_KEY: process.env.AMAZON_API_KEY || '',
};
