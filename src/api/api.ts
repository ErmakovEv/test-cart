const HOST = import.meta.env.VITE_BASE_URL;
const COUNT = import.meta.env.VITE_BASE_CNT;

import axios from 'axios';

const Endpoints = {
  CREATE: `${HOST}/api/Admin/create`,
  HEADER: `${HOST}/api/ShoppingCart/header`,
  PRODUCTS: `${HOST}/api/ShoppingCart/products`,
  PRODUCT: `${HOST}/api/ShoppingCart/product`,
  BASKET: `${HOST}/api/ShoppingCart/baskedsummary`,
  INCREMENT: `${HOST}/api/ShoppingCart/quantityinc`,
  DECREMENT: `${HOST}/api/ShoppingCart/quantitydec`,
};

const axiosInstance = axios.create({
  baseURL: HOST,
});

export const createAdmin = async () => {
  try {
    const response = await axiosInstance.post(
      `${Endpoints.CREATE}?value=${COUNT}`
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании Admin:', error);
    throw error;
  }
};

export const fetchNavItems = async () => {
  try {
    const response = await axios.get(Endpoints.HEADER);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
};

export const fetchProducts = async () => {
  try {
    const res = await axios.get(Endpoints.PRODUCTS);
    return res.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const fetchTotalPrice = async () => {
  try {
    const res = await axios.get(Endpoints.BASKET);
    return res.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const incrementProduct = async (ProductId: number, UserGuid: string) => {
  try {
    const data = {
      ProductId,
      UserGuid,
    };

    await axios.post(Endpoints.INCREMENT, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const decrementProduct = async (ProductId: number, UserGuid: string) => {
  try {
    const data = {
      ProductId,
      UserGuid,
    };

    await axios.post(Endpoints.DECREMENT, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const deleteProduct = async (ProductId: number, UserGuid: string) => {
  try {
    const data = {
      ProductId,
      UserGuid,
    };

    await axios.delete(Endpoints.PRODUCT, { data });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const deleteProducts = async () => {
  try {
    await axios.delete(Endpoints.PRODUCTS);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
