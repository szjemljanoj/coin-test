/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Cryptocurrencies from '../Cryptocurrencies';
import CryptocurrencyFilterList from '../CryptocurrencyFilterList';
import CryptocurrencyForm from '../CryptocurrencyForm';
import Loader from '../Loader';
import cryptoсurrencyService from '../../services/cryptoсurrency.service';
import './style.scss';

const Cryptocurrency = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredCoins, setFilteredCoins] = useState('');
  const [isConnect, setIsConnect] = useState(true);

  // GET INIT DATA
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await cryptoсurrencyService.getProducts();
      setData(response.data.data);
      setIsLoading(false);
    })();
  }, []);

  // GET UPDATE DATA BY SOCKET
  useEffect(() => {
    if (isConnect && data.length) {
      const socket = new WebSocket('wss://stream.binance.com/stream?streams=!miniTicker@arr');
      socket.onopen = () => {
        console.log('Successful connection.');
      };
      socket.onmessage = event => {
        const updateCoins = JSON.parse(event.data).data;
        const currentCoins = data;
        const newCoins = currentCoins.map(coin => {
          const findCoin = updateCoins.find(updateCoin => updateCoin.s === coin.s);
          return findCoin
            ? {
                ...coin,
                c: findCoin.c,
                o: findCoin.o,
                h: findCoin.h,
                l: findCoin.l
              }
            : coin;
        });
        setData(newCoins);
      };

      socket.onclose = () => {
        socket.close();
      };

      socket.onerror = event => {
        console.error('WebSocket error', event);
      };

      return () => {
        socket.close();
        console.log('Сonnection closed');
      };
    }
  }, [isConnect, isLoading]);

  // GET LIST CATEGORY
  let coinsCategory = [];

  if (data.length) {
    let listCoins = data.reduce((values, coint) => {
      if (!values.includes(coint.q) && !values.includes(coint.pm)) {
        if (coint.pm === coint.q) {
          values = [...values, coint.q];
        }
      }
      return values;
    }, []);
    listCoins = listCoins.reverse().map(coin => ({ name: coin, coins: [] }));

    const listCoinsALTS = data.reduce((values, coin) => {
      if (!values.includes(coin.q)) {
        if (coin.pm === 'ALTS') {
          values = [...values, coin.q];
        }
      }
      return values;
    }, []);
    const alts = {
      name: 'ALTS',
      coins: [...listCoinsALTS]
    };

    const listCoinsUSD = data.reduce((values, coin) => {
      if (!values.includes(coin.q)) {
        if (coin.pm === 'USDⓈ') {
          values = [...values, coin.q];
        }
      }
      return values;
    }, []);
    const usd = {
      name: 'USDⓈ',
      coins: [...listCoinsUSD]
    };

    const coinsPm = [alts, usd];
    coinsCategory = [...listCoins, ...coinsPm];
  }

  const filterCoins = filterBy => {
    setFilteredCoins(filterBy);
  };

  const handleSocketConnect = () => {
    setIsConnect(!isConnect);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="cryptocurrency-app">
          {isLoading && <Loader />}
          <button
            type="button"
            className={`button-connect ${isConnect ? 'connect' : 'disconnect'}`}
            onClick={handleSocketConnect}
          >
            {isConnect ? 'Disconnect' : 'Connect'}
          </button>
          <Header />
          <CryptocurrencyFilterList coinsCategory={coinsCategory} filterCoins={filterCoins} />
          <CryptocurrencyForm />
          <Cryptocurrencies coins={data} filteredCoins={filteredCoins} />
        </div>
      )}
    </>
  );
};

export default Cryptocurrency;
