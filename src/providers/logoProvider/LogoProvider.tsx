import { ReactNode, useEffect, useState } from 'react';
import LogoContext, { defaultValue, ILogoContext } from './LogoContext';
import { fetchNavItems } from '../../api/api';

export default function LogoProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<ILogoContext>(defaultValue);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchNavItems();
      setValue({ logo: res });
    };
    fetchData();
  }, []);

  return <LogoContext.Provider value={value}>{children}</LogoContext.Provider>;
}
