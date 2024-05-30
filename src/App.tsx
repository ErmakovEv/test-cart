import { useEffect } from 'react';
import { AppRouter } from './providers/routerProvider/AppRouter';
import { createAdmin } from './api/api';

function App() {
  useEffect(() => {
    createAdmin();
  }, []);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
