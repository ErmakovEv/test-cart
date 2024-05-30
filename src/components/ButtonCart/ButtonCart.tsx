import { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ButtonCart = () => {
  const [isCart, setIsCart] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isCart) {
      navigate('/');
    } else {
      navigate('/cart');
    }
    setIsCart(!isCart);
  };

  return (
    <Button variant="contained" onClick={handleButtonClick}>
      {isCart ? 'Главная' : 'Корзина'}
    </Button>
  );
};

export default ButtonCart;
