import { ReactElement, useEffect, FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

interface Props {
  children: ReactElement;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<Props> = ({ children, onlyUnAuth = false }) => {
  const { user } = useSelector((store) => store.user);
  const location = useLocation();

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (onlyUnAuth && user) {
    return <Navigate to={location.state?.from || '/'} replace />;
  }

  return children;
};
