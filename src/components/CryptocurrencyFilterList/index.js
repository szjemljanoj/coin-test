import React, { useState } from 'react';
import './style.scss';

const CryptocurrencyList = ({ coinsCategory, filterCoins }) => {
  const [isActiv, setIsActiv] = useState('');

  const handleFilter = category => {
    if (category === 'margin') {
      filterCoins('');
    } else {
      filterCoins(category);
    }
    setIsActiv(category);
  };

  return (
    <div className="cryptocurrency-filter-list">
      <div
        onClick={() => handleFilter('margin')}
        className={`cryptocurrency-filter-list__item ${isActiv === 'margin' ? 'active' : ''}`}
      >
        Margin
      </div>
      {coinsCategory.map(cat => {
        return !cat.coins.length ? (
          <div
            onClick={() => handleFilter(cat.name)}
            key={cat.name}
            className={`cryptocurrency-filter-list__item ${isActiv === cat.name ? 'active' : ''}`}
          >
            {cat.name}
          </div>
        ) : (
          <div key={cat.name} className="dropdown">
            <button className="dropbtn">{cat.name} </button>
            <div className="dropdown-content">
              {cat.coins.map(coin => {
                return <p key={coin} onClick={() => handleFilter(coin)}>{coin}</p>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CryptocurrencyList;
