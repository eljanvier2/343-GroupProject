import { type NextApiRequest, type NextApiResponse } from 'next'
import { PaymentContext } from '../../lib/paymentContext'
import { StripePaymentStrategy } from '../../lib/stripePaymentStrategy'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { amount, paymentMethod } = req.body

      let paymentStrategy
      switch (paymentMethod) {
        case 'stripe':
          paymentStrategy = new StripePaymentStrategy()
          break
        // Add other payment strategies here
        default:
          throw new Error('Invalid payment method')
      }

      const paymentContext = new PaymentContext(paymentStrategy)
      const { clientSecret } = await paymentContext.createPaymentIntent(amount)

      res.status(200).json({ clientSecret })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      res.status(500).json({ error: errorMessage })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
