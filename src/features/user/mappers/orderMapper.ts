import { Order, OrderDetail } from '../../marketplace/types';

export function mapOrderData(data: Order): Order {
  return {
    ...data,
    createdAt: new Date(data.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  };
}

export function mapOrderDetailData(data: OrderDetail): OrderDetail {
  return {
    ...data,
    updatedAt: new Date(data.updatedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    createdAt: new Date(data.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  };
}
