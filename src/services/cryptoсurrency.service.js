import API, { endpoints } from '../API';
import axios from 'axios';

const { product } = endpoints;

// const getProducts = async () => {
//   const data = await API.get(`${product['get-products'].path}`, {
//     headers: {
//       'Access-Control-Allow-Origin': '*'
//     },
//     proxy: {
//       host: '104.236.174.88',
//       port: 3128
//     }
//   });
//   return data;
// };

const getProducts = async () => {
  const data = await axios.get('../../initCryptocarrency.json', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return data;
};

const cryptocurrencyService = {
  getProducts
};

export default cryptocurrencyService;
