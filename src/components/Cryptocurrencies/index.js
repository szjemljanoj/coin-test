/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import Coin from '../Coin';
import './style.scss';

const Cryptocurrencies = ({ coins, filteredCoins = '' }) => {
  const currentCoins = filteredCoins ? coins.filter(coin => coin.q === filteredCoins) : coins;
  return (
    <div className="cryptocurrencies">
      <div className="cryptocurrencies-header">
        <div className="cryptocurrencies-header__item">Pair</div>
        <div className="cryptocurrencies-header__item">Last Price</div>
        <div className="cryptocurrencies-header__item">Change</div>
      </div>
      {currentCoins.map(coin => {
        return <Coin key={coin.s} coin={coin} />;
      })}
    </div>
  );
};

Cryptocurrencies.propTypes = {
  coins: PropTypes.arrayOf(
    PropTypes.shape({
      o: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
      h: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
      l: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
      c: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
      b: PropTypes.string.isRequired,
      q: PropTypes.string.isRequired
    }).isRequired
  ),
  filteredCoins: PropTypes.string
};

export default Cryptocurrencies;
