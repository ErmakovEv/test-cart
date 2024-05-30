import { useContext } from 'react';
import LogoContext from '../../providers/logoProvider/LogoContext';
import CustomSelect from '../CustomSelect/CustomSelect';
import ButtonCart from '../ButtonCart/ButtonCart';
import './Header.css';
import { Button } from '@mui/material';

export type HeaderLogo = {
  LogoImg: string;
  UsedGuid: string;
  UserName: string;
};

export default function Header() {
  const { logo } = useContext(LogoContext);

  return (
    <header className="header">
      <div className="header-logo">
        <img
          className="header-logo__img"
          src={`data:image/png;base64,${logo.LogoImg}`}
          alt="logoImg"
        />
        <h3 className="header-logo__username">{logo.UserName}</h3>
      </div>
      <div className="header-items">
        <CustomSelect />
        <Button variant="outlined">Контакты</Button>
        <Button variant="outlined">Информация</Button>
        <Button variant="outlined">Акции</Button>
        <Button variant="outlined">Доставка</Button>
        <ButtonCart />
      </div>
    </header>
  );
}
