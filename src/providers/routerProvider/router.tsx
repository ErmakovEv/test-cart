import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import RootElement from '../../components/RootElement/RootElement';
import MainPage from '../../components/MainPage/MainPage';
import CartPage from '../../components/CartPage/CartPage';
import ErrorPage from '../../components/ErrorPage/ErrorPage';
import PageLoader from '../../components/PageLoader/PageLoader';
import { Suspense } from 'react';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootElement />} errorElement={<ErrorPage />}>
      <Route
        index
        element={
          <Suspense fallback={<PageLoader />}>
            <MainPage />
          </Suspense>
        }
      />
      <Route
        path="/cart"
        element={
          <Suspense fallback={<PageLoader />}>
            <CartPage />
          </Suspense>
        }
      />
    </Route>
  )
);

export default router;
