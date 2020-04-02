import React from 'react';
import Coin from '../Coin';
import './style.scss';

const Cryptocurrencies = ({ coins, filteredCoins}) => {
  const currentCoins = filteredCoins ? coins.filter(coin => coin.q === filteredCoins) : coins;

  return (
    <div className="cryptocurrencies">
      <div className="cryptocurrencies-header">
        <div className="cryptocurrencies-header__item">Pair</div>
        <div className="cryptocurrencies-header__item">Last Price</div>
        <div className="cryptocurrencies-header__item">Change</div>
      </div>
      {currentCoins.map(coin => {
        return(
          <Coin key={coin.s} coin={coin}/>
        )
       
      })}
    </div>
  );
};

export default Cryptocurrencies;
