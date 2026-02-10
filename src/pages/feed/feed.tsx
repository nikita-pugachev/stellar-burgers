import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { feedFetch } from '../../services/slices/feedSlice';
import { getOrders } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrders);

  const handleGetFeeds = useCallback(() => {
    dispatch(feedFetch());
  }, [dispatch]);

  useEffect(() => {
    handleGetFeeds();
  }, [handleGetFeeds]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
