import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../../utils/axios";
import { useGlobalContext } from "../../context/GlobalContext";

const stripePromise = loadStripe(
  "pk_test_51QvWPiIb2bwN8t1yW7oovzaZK1Gwqo3etpjunW0RSnoJ08c15F70Se32Eog6n8lESkFKpx2dgCO1xmTwTuSEHTFZ00G2plky68"
);

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const handlePayment = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/payment/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { id } = await response.json();
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error("Payment error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Stripe Payment</h1>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Pay $10"}
      </button>
    </div>
  );
};

export default PaymentPage;
