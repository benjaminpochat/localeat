export enum OrderStatus {
  BOOKED = "BOOKED",
  PAYED = "PAYED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED"
}


export class OrderStatusUtils {
  static getOrderStatusLabel(orderStatus: OrderStatus) {
    switch (orderStatus) {
      case OrderStatus.BOOKED:
        return 'réservée';
      case OrderStatus.PAYED:
        return 'payée';
      case OrderStatus.DELIVERED:
        return 'livrée';
        case OrderStatus.CANCELLED:
          return 'annulée';
            default:
        return '';
    }
  }
}
