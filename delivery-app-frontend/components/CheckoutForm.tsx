import { useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useRouter } from 'next/router'

interface CheckoutFormProps {
  clientSecret: string
  name: string
  email: string
  address: string
}

const CheckoutForm = ({ clientSecret, name, email, address }: CheckoutFormProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [nameState, setName] = useState(name)
  const [emailState, setEmail] = useState(email)
  const [addressState, setAddress] = useState(address)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    if (!stripe || !elements) {
      setLoading(false)
      return
    }

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      setLoading(false)
      return
    }

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: nameState,
          email: emailState,
          address: {
            line1: addressState
          }
        }
      }
    })

    if (stripeError) {
      setError(stripeError.message || 'Payment failed. Please try again.')
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setError(null)
      router.push('/payment-success')
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
          value={nameState}
          onChange={(e) => { setName(e.target.value) }}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={emailState}
          onChange={(e) => { setEmail(e.target.value) }}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          value={addressState}
          onChange={(e) => { setAddress(e.target.value) }}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Card Details</label>
        <CardElement className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md shadow-sm hover:bg-blue-600 transition-colors"
      >
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  )
}

export default CheckoutForm
