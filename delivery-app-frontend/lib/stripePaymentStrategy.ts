import Stripe from 'stripe'
import { type PaymentStrategy } from '../pages/api/paymentStrategy'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia'
})

export class StripePaymentStrategy implements PaymentStrategy {
  // Create a payment intent with the specified amount
  async createPaymentIntent (amount: number): Promise<{ clientSecret: string }> {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd'
    })
    if (!paymentIntent.client_secret) {
      throw new Error('Failed to create payment intent')
    }
    return { clientSecret: paymentIntent.client_secret }
  }
}
