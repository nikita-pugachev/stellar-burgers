import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  userOrders,
  getUserOrders
} from '../../services/slices/userOrderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(getUserOrders);

  useEffect(() => {
    dispatch(userOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
