import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { userLogout } from '../../services/slices/userSlice';
import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
