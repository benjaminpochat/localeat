export enum PaymentStatus {
  Processing = 'PROCESSING',
  Validated = 'VALIDATED',
  Aborted = 'ABORTED'
}

export class PaymentStatusUtils {
  static getPaymentStatusLabel(paymentStatus: PaymentStatus) {
    switch (paymentStatus) {
      case PaymentStatus.Processing:
        return 'en cours';
      case PaymentStatus.Validated:
        return 'validé';
      case PaymentStatus.Aborted:
        return 'abandonné';
      default:
        return '';
    }
  }
}
