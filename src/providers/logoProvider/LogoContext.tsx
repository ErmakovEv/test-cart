import { createContext } from 'react';
import { HeaderLogo } from '../../components/Header/Header';

export interface ILogoContext {
  logo: HeaderLogo;
}

// eslint-disable-next-line react-refresh/only-export-components
export const defaultValue = {
  logo: {
    LogoImg: '',
    UsedGuid: '',
    UserName: '',
  },
};

const LogoContext = createContext<ILogoContext>(defaultValue);

export default LogoContext;
