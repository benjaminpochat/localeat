export enum OrderStatus {
  SUBMITTED = "SUBMITTED",
  BOOKED = "BOOKED",
  PAYED = "PAYED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED"
}


export class OrderStatusUtils {
  static getOrderStatusLabel(orderStatus: OrderStatus) {
    switch (orderStatus) {
      case OrderStatus.SUBMITTED:
        return 'en cours d\'enregistrement';
      case OrderStatus.BOOKED:
        return 'réservée, non payée';
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

  static isSold(orderStatus: OrderStatus) {
    return [OrderStatus.BOOKED, OrderStatus.PAYED, OrderStatus.BOOKED].includes(orderStatus);
  }
}
