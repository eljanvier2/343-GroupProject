import { type PaymentStrategy } from '../pages/api/paymentStrategy'

export class PaymentContext {
  private strategy: PaymentStrategy

  constructor (strategy: PaymentStrategy) {
    this.strategy = strategy
  }

  setStrategy (strategy: PaymentStrategy) {
    this.strategy = strategy
  }

  // Add the createPaymentIntent method to the PaymentContext class
  async createPaymentIntent (amount: number): Promise<{ clientSecret: string }> {
    return await this.strategy.createPaymentIntent(amount)
  }
}
