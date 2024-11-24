import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '@/components/CheckoutForm'
import Head from 'next/head'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState('')
  const amount = 10.00 // Example amount

  useEffect(() => {
    // Create PaymentIntent
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amount * 100 }) // Send amount in cents   //TODO: SET AMOUNT IN ENTIRE SYSTEM
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [amount])

  const appearance = {
    theme: 'stripe' as 'stripe',
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Head>
        <title>Checkout - Drone Delivery</title>
      </Head>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-semibold mb-6 text-center">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="border p-4 rounded-lg shadow-sm mb-4">
              <p className="text-lg">Drone Delivery Service</p>
              <p className="text-sm text-gray-600">Fast and reliable drone delivery</p>
              <p className="text-lg font-semibold mt-2">${amount.toFixed(2)}</p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment</h2>
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm clientSecret={clientSecret} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage