const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  mapboxToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN
};

if (!config.apiBaseUrl)
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');

if (!config.mapboxToken)
  throw new Error('NEXT_PUBLIC_MAPBOX_TOKEN is not defined');

export default config;
