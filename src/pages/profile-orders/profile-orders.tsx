import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { userOrders } from '../../services/slices/userOrderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector((state) => state.userOrder.orders);

  useEffect(() => {
    dispatch(userOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
