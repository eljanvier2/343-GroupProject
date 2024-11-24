import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000, // TODO: SET AMOUNT IN ENTIRE SYSTEM WITH VARIABLE 
        currency: 'usd',
      })

      res.status(200).json({ clientSecret: paymentIntent.client_secret })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ error: errorMessage })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}