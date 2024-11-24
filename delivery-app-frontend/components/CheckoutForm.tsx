import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { useState } from 'react'

interface CheckoutFormProps {
  clientSecret: string
}

const CheckoutForm = ({ clientSecret }: CheckoutFormProps) => {
  const stripe = useStripe()
  const elements = useElements()

  // Form states for billing details
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    if (!name || !email || !address) {
      setError('All billing details must be filled out.')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Invalid email address.')
      return false
    }

    return true
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    if (!validateForm()) {
      return
    }

    setError(null) // Clear previous errors
    setLoading(true)

    const cardElement = elements.getElement(CardElement)

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement!,
        billing_details: {
          name,
          email,
          address: { line1: address },
        },
      },
    })

    if (error) {
      setError(error.message || 'An unknown error occurred')
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      window.location.href = '/payment-success'
    } else {
      setError('Payment failed. Please try again.')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="border p-4 rounded-lg shadow-sm">
        <CardElement className="p-2" />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  )
}

export default CheckoutForm