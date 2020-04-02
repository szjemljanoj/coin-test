import React from 'react';
import CryptocurrencyFilterList from '../CryptocurrencyFilterList';
import CryptocurrencyForm from '../CryptocurrencyForm';

const CryptocurrencyFilter = ({ coinsCategory, filterCoins }) => {
  return (
    <div>
      <CryptocurrencyFilterList coinsCategory={coinsCategory} filterCoins={filterCoins} />
      <CryptocurrencyForm />
    </div>
  );
};

export default CryptocurrencyFilter;
