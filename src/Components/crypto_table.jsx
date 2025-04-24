import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCryptoData, updatePrices } from '../crypto/cryptoSlice';
import '../style.css';

// Updated SevenDayChart component with enforced green curly line
const SevenDayChart = () => {
  
  const pathData = `
    M 0 15
    Q 15 5, 30 15
    Q 45 25, 60 15
    Q 75 5, 90 15
    Q 100 20, 100 15
  `;

  return (
    <svg width="100" height="30" style={{ background: '#f0f0f0' }}>
      <path
        d={pathData}
        fill="none"
        stroke="green" 
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: 'green', stroke: 'green' }} 
      />
    </svg>
  );
};

const CryptoTable = () => {
  const dispatch = useDispatch();
  const cryptoData = useSelector(selectCryptoData);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updatePrices());
    }, 2000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <table className="crypto-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>1h %</th>
          <th>24h %</th>
          <th>7d %</th>
          <th>Market Cap</th>
          <th>Volume(24h)</th>
          <th>Circulating Supply</th>
          
          <th>last 7 days</th>
        </tr>
      </thead>
      <tbody>
        {cryptoData.map((asset) => (
          <tr key={asset.id}>
            <td>{asset.id}</td>
            <td>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src={asset.iconUrl} alt={`${asset.name} logo`} width="24" height="24" />
                {asset.name} ({asset.symbol})
              </div>
            </td>
            <td>${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td className={asset.change1h >= 0 ? 'positive' : 'negative'}>
              {asset.change1h}%
            </td>
            <td className={asset.change24h >= 0 ? 'positive' : 'negative'}>
              {asset.change24h}%
            </td>
            <td className={asset.change7d >= 0 ? 'positive' : 'negative'}>
              {asset.change7d}%
            </td>
            <td>${asset.marketCap.toLocaleString()}</td>
            <td>${asset.volume24h.toLocaleString()}</td>
            <td>{(asset.circulatingSupply / 1e6).toLocaleString()}M {asset.symbol}</td>
           
            <td><SevenDayChart /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CryptoTable;