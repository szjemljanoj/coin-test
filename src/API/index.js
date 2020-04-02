import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_URL
});

export const endpoints = {
  product: {
    'get-products': {
      method: 'get',
      path: 'product/get-products'
    }
  }
};
