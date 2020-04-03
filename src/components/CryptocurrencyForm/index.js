import React from 'react';
import './style.scss';

const CryptocurrencyForm = () => {
  return (
    <form className="cryptocurrency-form">
      <input className="cryptocurrency-form-search" type="text" placeholder="Search" />
      <div>
        <input name="change" type="radio" id="change" />
        <label htmlFor="change">Change</label>
        <input name="change" type="radio" id="volume" />
        <label htmlFor="change">Volume</label>
      </div>
    </form>
  );
};

export default CryptocurrencyForm;
