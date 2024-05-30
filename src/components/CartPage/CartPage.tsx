import { useEffect, useState, useContext } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

import {
  fetchProducts,
  fetchTotalPrice,
  incrementProduct,
  decrementProduct,
  deleteProduct,
  deleteProducts,
} from '../../api/api';

import LogoContext from '../../providers/logoProvider/LogoContext';

type Product = {
  Id: number;
  Name: string;
  Description: string;
  Quantity: 0;
  Unit: string;
  Сurrency: string;
  Price: 0;
  DiscountedPrice: 0;
  Images: {
    FileName: string;
    FileExtension: string;
    Image: string;
  }[];
};

type CartSummary = {
  TotalProducts: number;
  Discount: number;
  Total: number;
};

const initialCartSummary = {
  TotalProducts: 0,
  Discount: 0,
  Total: 0,
};

const Cart = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartSummary, setCartSummary] =
    useState<CartSummary>(initialCartSummary);

  const { logo } = useContext(LogoContext);

  const updateData = async () => {
    const newProducts = await fetchProducts();
    const newBasket = await fetchTotalPrice();
    setProducts(newProducts);
    setCartSummary(newBasket);
  };

  const incrementHandler = async (id: number) => {
    await incrementProduct(id, logo.UsedGuid);
    await updateData();
  };

  const decrementHandler = async (id: number) => {
    await decrementProduct(id, logo.UsedGuid);
    await updateData();
  };

  const deleteProductHandler = async (id: number) => {
    await deleteProduct(id, logo.UsedGuid);
    await updateData();
  };

  const deleteProductsHandler = async () => {
    await deleteProducts();
    updateData();
  };

  useEffect(() => {
    updateData();
  }, []);

  if (!products.length) {
    return <h2>Нет товаров в корзине</h2>;
  }

  return (
    <div className="cart">
      <div
        className="cart-info"
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginBottom: '2%',
        }}
      >
        <p>
          Общая сумма покупок{' '}
          <span style={{ color: 'red' }}> {cartSummary.Total}</span>
        </p>
        <Button variant="contained">Оформить заказ</Button>
        <Button variant="text" onClick={() => deleteProductsHandler()}>
          Очистить корзину
        </Button>
      </div>
      <div className="cart-table">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }}>№ п.п.</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Наименование</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Описание</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Количество</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Unit</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Валюта</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Цена</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Скидка</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Изображение</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={product.Id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateRows: 'repeat(2, 1fr)',
                        justifyItems: 'center',
                      }}
                    >
                      <p style={{ textAlign: 'center' }}>{product.Name}</p>
                      <Button
                        variant="contained"
                        onClick={() => deleteProductHandler(product.Id)}
                      >
                        Удалить продукт
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{product.Description}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <p>{product.Quantity}</p>
                      <div style={{ display: 'flex' }}>
                        <Button onClick={() => incrementHandler(product.Id)}>
                          +
                        </Button>
                        <Button onClick={() => decrementHandler(product.Id)}>
                          -
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.Unit}</TableCell>
                  <TableCell>{product.Сurrency}</TableCell>
                  <TableCell>{product.Price}</TableCell>
                  <TableCell>{product.DiscountedPrice}</TableCell>
                  <TableCell>
                    {product.Images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={`data:image/${image.FileExtension};base64,${image.Image}`}
                          alt={image.FileName}
                          style={{ width: '50px', height: '50px' }}
                        />
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Cart;
