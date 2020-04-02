import React, { useEffect, useState } from 'react';
import cryptoсurrencyService from '../../services/cryptoсurrency.service.js';
import './style.scss';

const Cryptocurrency = () => {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [filteredCoins, setFilteredCoins] = useState('');
  const [isConnect, setIsConnect] = useState(true);

  // GET INIT DATA
  useEffect(() => {
    (async () => {
      const response = await cryptoсurrencyService.getProducts();
      const coinsWithStars = response.data.data.map(coin => ({ ...coin, star: false }));
      setData(coinsWithStars);
      setFlag(true);
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
        let updateCoins = JSON.parse(event.data).data;
        
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
  }, [isConnect, flag]);

  return (
    <div className="cryptocurrency-app">
      <p> app </p>
    </div>
  );
};

export default Cryptocurrency;
