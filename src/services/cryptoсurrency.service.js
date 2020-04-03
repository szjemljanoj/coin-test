// import API, { endpoints } from '../API';
import axios from 'axios';

const getProducts = async () => {
  // const data = await API.get(`${product['get-products'].path}
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
