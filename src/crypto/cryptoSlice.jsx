import { createSlice } from '@reduxjs/toolkit';

// Initial mock data for 6 assets with icon URLs
const initialState = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 93759.48, change1h: -0.43, change24h: 0.93, change7d: 11.17, marketCap: 186118902186, volume24h: 437459047, circulatingSupply: 19.85e6, maxSupply: 21e6, iconUrl: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579' },
  { id: 2, name: 'Ethereum', symbol: 'ETH', price: 3802.46, change1h: -0.60, change24h: -3.21, change7d: 13.68, marketCap: 217581729327, volume24h: 2354746907, circulatingSupply: 120.71e6, maxSupply: null, iconUrl: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880' },
  { id: 3, name: 'Tether', symbol: 'USDT', price: 1.00, change1h: 0.00, change24h: 0.00, change7d: -0.04, marketCap: 145320220085, volume24h: 228888007, circulatingSupply: 145.27e9, maxSupply: null, iconUrl: 'https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663' },
  { id: 4, name: 'XRP', symbol: 'XRP', price: 2.22, change1h: -0.46, change24h: -0.54, change7d: -6.18, marketCap: 130073814966, volume24h: 51341841, circulatingSupply: 58.39e9, maxSupply: 100e9, iconUrl: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731' },
  { id: 5, name: 'Binance Coin', symbol: 'BNB', price: 606.65, change1h: 0.00, change24h: -1.69, change7d: -3.73, marketCap: 847195647, volume24h: 1874281784, circulatingSupply: 146.8e6, maxSupply: 200e6, iconUrl: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850' },
  { id: 6, name: 'Solana', symbol: 'SOL', price: 151.51, change1h: -0.53, change24h: -1.26, change7d: -14.74, marketCap: 78381958631, volume24h: 4881674486, circulatingSupply: 517.31e6, maxSupply: null, iconUrl: 'https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422' },
];

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrices: (state) => {
      state.forEach((asset) => {
        const priceChange = (Math.random() * 2 - 1) * 0.01 * asset.price;
        asset.price = Math.max(0, asset.price + priceChange);
        asset.change1h = (Math.random() * 2 - 2).toFixed(2);
        asset.change24h = (Math.random() * 4 - 4).toFixed(2);
        asset.change7d = (Math.random() * 10 - 10).toFixed(2);
        asset.volume24h = Math.max(0, asset.volume24h + (Math.random() * 1000000 - 500000));
      });
    },
  },
});

export const { updatePrices } = cryptoSlice.actions;
export const selectCryptoData = (state) => state.crypto;
export default cryptoSlice.reducer;