import { ReactElement, useEffect, FC } from 'react';
import { userInfo } from '../slices/userSlice';
import { getCookie } from '../../utils/cookie';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';

interface Props {
  children: ReactElement;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<Props> = ({ children, onlyUnAuth = false }) => {
  const { isLogin, user } = useSelector((store) => store.user);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      localStorage.getItem('accessToken') ||
      (getCookie('accessToken') && !user)
    ) {
      dispatch(userInfo());
    }
  }, [dispatch, user]);

  if (!onlyUnAuth && !isLogin) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (onlyUnAuth && isLogin) {
    return <Navigate to={location.state?.from || '/'} replace />;
  }

  return children;
};
