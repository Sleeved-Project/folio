import { Order } from '../../marketplace/types';

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
