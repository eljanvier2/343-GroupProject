export interface PaymentStrategy {
  createPaymentIntent(amount: number): Promise<{ clientSecret: string }>;
}