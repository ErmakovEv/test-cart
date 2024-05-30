import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

function RootElement() {
  return (
    <div>
      <Header />
      <div className="page=wrapper">
        <Outlet />
      </div>
    </div>
  );
}

export default RootElement;
