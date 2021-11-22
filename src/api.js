// BASE URL
const baseURL = "https://api.coingecko.com/api/v3";

// Topp 100 Coins
export const top100 = `${baseURL}/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

// Get current data for a coin
export const assetData = (id) =>
  `${baseURL}/coins/${id}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
