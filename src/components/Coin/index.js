import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Coin = memo(({ coin }) => {
  const change = (((coin.o - coin.c) * 100) / (coin.h - coin.l)).toFixed(2);
  return (
    <div className="cryptocurrencies-item">
      <div className="cryptocurrencies-item__name">
        {coin.b}/{coin.q}
      </div>
      <div className="cryptocurrencies-item__price">{coin.c}</div>
      <div className={`cryptocurrencies-item__change ${change < 0 ? 'red' : 'green'}`}>
        {change > 0 && '+'}
        {change}%
      </div>
    </div>
  );
});

Coin.propTypes = {
  coin: PropTypes.shape({
    o: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    h: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    l: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    c: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    b: PropTypes.string.isRequired,
    q: PropTypes.string.isRequired
  }).isRequired
};

export default Coin;
