import React from 'react';
import './style.scss';

const Coin = ({ coin}) => {
  
  const change = (((coin.o - coin.c) * 100) / (coin.h - coin.l)).toFixed(2);
  return (
    <div className="cryptocurrencies-item">
      <div className="cryptocurrencies-item__name">
        {/* <span className={`star ${coin.star ? 'active' : ''}`}></span> */}
        {coin.b}/{coin.q}
      </div>
      <div className="cryptocurrencies-item__price">{coin.c}</div>
      <div className={`cryptocurrencies-item__change ${change < 0 ? 'red' : 'green'}`}>
        {change > 0 && '+'}
        {change}%
      </div>
    </div>
  );
};
export default Coin;
