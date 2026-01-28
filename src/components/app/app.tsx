import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { useDispatch } from '../../services/store';
import { ProtectedRoute } from '../../services/protected-route/protectedRoute';
import { userInfo } from '../../services/slices/userSlice';
import { ingredientFetch } from '../../services/slices/ingredientSlice';
import { getCookie } from '../../utils/cookie';
import { useEffect } from 'react';

const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modalClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (localStorage.getItem('refreshToken') || getCookie('accessToken')) {
      dispatch(userInfo());
    }
    dispatch(ingredientFetch());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='' onClose={modalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='' onClose={modalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='' onClose={modalClose}>
                  <IngredientDetails />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
