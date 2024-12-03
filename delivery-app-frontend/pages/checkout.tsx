import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '@/components/CheckoutForm'
import Head from 'next/head'
import { useRouter } from 'next/router'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const CheckoutPage = () => {
  const router = useRouter()
  const { price, name, email, address } = router.query
  const [clientSecret, setClientSecret] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('stripe')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const amount = price ? parseFloat(price as string) : 10.00 // AMOUNT FROM DELIVERY PLANNING/ EXAMPLE

  useEffect(() => {
    // Create PaymentIntent
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Math.round(amount * 100), paymentMethod }) // Convert amount to cents and ensure it's an integer
    })
      .then(async (res) => await res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret)
        } else {
          setError('Failed to get client secret: ' + data.error)
        }
      })
      .catch((error) => { setError('Error fetching client secret: ' + error.message) })
      .finally(() => { setLoading(false) })
  }, [amount, paymentMethod])

  const appearance = {
    theme: 'stripe' as const
  }
  const options = {
    clientSecret,
    appearance
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
            <div className="mb-4">
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => { setPaymentMethod(e.target.value) }}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="stripe">Stripe</option>
                {/* Add other payment methods here */}
              </select>
            </div>
            {loading
              ? (
              <div>Loading payment details...</div>
                )
              : error
                ? (
              <div className="text-red-500">{error}</div>
                  )
                : (
                    clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm clientSecret={clientSecret} name={name as string} email={email as string} address={address as string} />
                </Elements>
                    )
                  )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
