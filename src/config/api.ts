/**
 * API Configuration
 * Centralized configuration for The Dog API
 */

const API_KEY = import.meta.env.VITE_DOG_API_KEY;

if (!API_KEY) {
  throw new Error('VITE_DOG_API_KEY is not defined in environment variables');
}

export const API_CONFIG = {
  BASE_URL: 'https://api.thedogapi.com/v1',
  API_KEY,
  HEADERS: {
    'x-api-key': API_KEY,
    'Content-Type': 'application/json',
  },
} as const;
