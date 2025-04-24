import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCryptoData, updatePrices } from '../crypto/cryptoSlice';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import '../style.css';

const CryptoTable = () => {
  const dispatch = useDispatch();
  const cryptoData = useSelector(selectCryptoData);
  const [priceHistory, setPriceHistory] = useState({});
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updatePrices());
    }, 2000);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    setPriceHistory((prevHistory) => {
      const newHistory = { ...prevHistory };
      cryptoData.forEach((asset) => {
        const existingHistory = newHistory[asset.symbol] || [];
        const updatedHistory = [...existingHistory, { price: asset.price }];
        newHistory[asset.symbol] = updatedHistory.slice(-30);
      });
      return newHistory;
    });
  }, [cryptoData]);

  const sortedData = [...cryptoData].sort((a, b) => {
    switch (sortOption) {
      case 'topGainer':
        return b.change7d - a.change7d;
      case 'topLoser':
        return a.change7d - b.change7d;
      case 'marketCap':
        return b.marketCap - a.marketCap;
      default:
        return a.id - b.id;
    }
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{
            padding: '6px 12px',
            fontSize: '14px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            cursor: 'pointer'
          }}
        >
          <option value="default">🔄 Default Order</option>
          <option value="topGainer">🟢 Top Gainer (7d)</option>
          <option value="topLoser">🔴 Top Loser (7d)</option>
          <option value="marketCap">💰 Highest Market Cap</option>
        </select>
      </div>

      <table className="crypto-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>1h %</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>
              Market Cap
              <span className="info-icon" title="Total value of all coins in circulation">i</span>
            </th>
            <th>
              Volume(24h)
              <span className="info-icon" title="Total trading volume in last 24 hours">i</span>
            </th>
            <th>
              Circulating Supply
              <span className="info-icon" title="Coins available in market right now">i</span>
            </th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((asset, index) => (
            <tr key={asset.id}>
              <td>{index + 1}</td>
              <td>
                <div className="coin-name">
                  <img src={asset.iconUrl} alt={`${asset.name} logo`} width="24" height="24" />
                  <strong>{asset.name}</strong> ({asset.symbol})
                </div>
              </td>
              <td>${asset.price.toFixed(2)}</td>
              <td className={asset.change1h >= 0 ? 'positive' : 'negative'}>{asset.change1h}%</td>
              <td className={asset.change24h >= 0 ? 'positive' : 'negative'}>{asset.change24h}%</td>
              <td className={asset.change7d >= 0 ? 'positive' : 'negative'}>{asset.change7d}%</td>
              <td>${asset.marketCap.toLocaleString()}</td>
              <td>
                <div className="volume-container">
                  <span>${asset.volume24h.toLocaleString()}</span>
                  <div className="small-volume-label">
                    {asset.symbol === 'BTC' && '467.81K BTC'}
                    {asset.symbol === 'ETH' && '13.05M ETH'}
                    {asset.symbol === 'USDT' && '92.25B USDT'}
                    {asset.symbol === 'XRP' && '2.30B XRP'}
                    {asset.symbol === 'BNB' && '3.08M BNB'}
                    {asset.symbol === 'SOL' && '32.25M SOL'}
                  </div>
                </div>
              </td>
              <td>{(asset.circulatingSupply / 1e6).toLocaleString()}M {asset.symbol}</td>
              <td>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <ResponsiveContainer width={100} height={30}>
                    <LineChart data={priceHistory[asset.symbol] || []}>
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke={getLineColor(priceHistory[asset.symbol])}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function getLineColor(data) {
  if (!data || data.length < 2) return '#00c853'; // default green
  return data[data.length - 1].price >= data[0].price ? '#00c853' : '#d32f2f';
}

export default CryptoTable;
