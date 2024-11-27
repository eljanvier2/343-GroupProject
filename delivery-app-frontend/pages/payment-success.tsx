import { useRouter } from 'next/router';
import Head from 'next/head';

const PaymentSuccess = () => {
  const router = useRouter();
  const { amount } = router.query;

  //TODO: GENERATE UNIQUE ORDER ID AND STORE IN DATABASE
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Head>
        <title>Payment Success - Drone Delivery</title>
      </Head>
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-semibold text-green-500">Payment Successful!</h1>
        <p className="text-lg mt-4">Thank you for your payment. Your order is being processed.</p>
        <button
          onClick={() => (window.location.href = '/')}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;