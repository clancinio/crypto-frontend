// BASE URL
const baseURL = "https://api.coingecko.com/api/v3";

// Topp 100 Coins
export const top100 = `${baseURL}/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
