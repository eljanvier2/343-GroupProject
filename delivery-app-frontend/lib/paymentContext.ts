import { PaymentStrategy } from '../pages/api/paymentStrategy';

export class PaymentContext {
  private strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  // Add the createPaymentIntent method to the PaymentContext class
  createPaymentIntent(amount: number): Promise<{ clientSecret: string }> {
    return this.strategy.createPaymentIntent(amount);
  }
}