
// import React, {useState} from 'react';
// import ReactDOM from 'react-dom';
// import {loadStripe} from '@stripe/stripe-js';
// import {
//   PaymentElement,
//   Elements,
//   useStripe,
//   useElements,
// } from '@stripe/react-stripe-js';

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [errorMessage, setErrorMessage] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (elements == null) {
//       return;
//     }

//     // Trigger form validation and wallet collection
//     const {error: submitError} = await elements.submit();
//     if (submitError) {
//       // Show error to your customer
//       setErrorMessage(submitError.message);
//       return;
//     }

//     // Create the PaymentIntent and obtain clientSecret from your server endpoint
//     const res = await fetch('/create-intent', {
//       method: 'POST',
//     });

//     const {client_secret: clientSecret} = await res.json();

//     const {error} = await stripe.confirmPayment({
//       //`Elements` instance that was used to create the Payment Element
//       elements,
//       clientSecret,
//       confirmParams: {
//         return_url: 'https://example.com/order/123/complete',
//       },
//     });

//     if (error) {
//       // This point will only be reached if there is an immediate error when
//       // confirming the payment. Show error to your customer (for example, payment
//       // details incomplete)
//       setErrorMessage(error.message);
//     } else {
//       // Your customer will be redirected to your `return_url`. For some payment
//       // methods like iDEAL, your customer will be redirected to an intermediate
//       // site first to authorize the payment, then redirected to the `return_url`.
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement />
//       <button type="submit" disabled={!stripe || !elements}>
//         Pay
//       </button>
//       {/* Show error message to your customers */}
//       {errorMessage && <div>{errorMessage}</div>}
//     </form>
//   );
// };

// const stripePromise = loadStripe('pk_test_51QvWPiIb2bwN8t1yW7oovzaZK1Gwqo3etpjunW0RSnoJ08c15F70Se32Eog6n8lESkFKpx2dgCO1xmTwTuSEHTFZ00G2plky68');

// const options = {
//   mode: 'payment',
//   amount: 1099,
//   currency: 'usd',
//   // Fully customizable with appearance API.
//   appearance: {
//     /*...*/
//   },
// };

// const PaymentPage = () => (
//   <Elements stripe={stripePromise} options={options}>
//     <CheckoutForm />
//   </Elements>
// );

// export default PaymentPage;









// import React from 'react';
// import ReactDOM from 'react-dom';
// import {loadStripe} from '@stripe/stripe-js';
// import {
//   PaymentElement,
//   Elements,
//   ElementsConsumer,
// } from '@stripe/react-stripe-js';

// class CheckoutForm extends React.Component {
//   handleSubmit = async (event) => {
//     event.preventDefault();
//     const {stripe, elements} = this.props;

//     if (elements == null) {
//       return;
//     }

//     // Trigger form validation and wallet collection
//     const {error: submitError} = await elements.submit();
//     if (submitError) {
//       // Show error to your customer
//       return;
//     }

//     // Create the PaymentIntent and obtain clientSecret
//     const res = await fetch('/create-intent', {
//       method: 'POST',
//     });

//     const {client_secret: clientSecret} = await res.json();

//     const {error} = await stripe.confirmPayment({
//       //`Elements` instance that was used to create the Payment Element
//       elements,
//       clientSecret,
//       confirmParams: {
//         return_url: 'https://example.com/order/123/complete',
//       },
//     });

//     if (error) {
//       // This point will only be reached if there is an immediate error when
//       // confirming the payment. Show error to your customer (for example, payment
//       // details incomplete)
//     } else {
//       // Your customer will be redirected to your `return_url`. For some payment
//       // methods like iDEAL, your customer will be redirected to an intermediate
//       // site first to authorize the payment, then redirected to the `return_url`.
//     }
//   };

//   render() {
//     const {stripe} = this.props;
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <PaymentElement />
//         <button type="submit" disabled={!stripe}>
//           Pay
//         </button>
//       </form>
//     );
//   }
// }

// const InjectedCheckoutForm = () => (
//   <ElementsConsumer>
//     {({stripe, elements}) => (
//       <CheckoutForm stripe={stripe} elements={elements} />
//     )}
//   </ElementsConsumer>
// );

// const stripePromise = loadStripe('pk_test_51QvWPiIb2bwN8t1yW7oovzaZK1Gwqo3etpjunW0RSnoJ08c15F70Se32Eog6n8lESkFKpx2dgCO1xmTwTuSEHTFZ00G2plky68');

// const options = {
//   mode: 'payment',
//   amount: 1099,
//   currency: 'usd',
//   // Fully customizable with appearance API.
//   appearance: {
//     /*...*/
//   },
// };

// const PaymentPage = () => (
//   <Elements stripe={stripePromise} options={options}>
//     <InjectedCheckoutForm />
//   </Elements>
// );

// export default PaymentPage;





// import React from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   PaymentElement,
//   Elements,
//   ElementsConsumer,
// } from "@stripe/react-stripe-js";

// const stripePromise = loadStripe(
//   "pk_test_51QvWPiIb2bwN8t1yW7oovzaZK1Gwqo3etpjunW0RSnoJ08c15F70Se32Eog6n8lESkFKpx2dgCO1xmTwTuSEHTFZ00G2plky68"
// );

// const options = {
//   mode: "payment",
//   amount: 1099, // Amount in cents (e.g., 1099 = $10.99)
//   currency: "usd",
//   appearance: {
//     theme: "stripe", // Default Stripe styling
//   },
// };

// class CheckoutForm extends React.Component {
//   handleSubmit = async (event) => {
//     event.preventDefault();
//     const { stripe, elements } = this.props;

//     if (!elements) return;

//     // Validate payment details
//     const { error: submitError } = await elements.submit();
//     if (submitError) return;

//     // Call backend to create a PaymentIntent
//     const res = await fetch("/create-intent", {
//       method: "POST",
//     });
//     const { client_secret: clientSecret } = await res.json();

//     const { error } = await stripe.confirmPayment({
//       elements,
//       clientSecret,
//       confirmParams: {
//         return_url: "https://example.com/order/123/complete",
//       },
//     });

//     if (error) {
//       console.error(error.message);
//     }
//   };

//   render() {
//     const { stripe } = this.props;
//     return (
//       <form onSubmit={this.handleSubmit} className="payment-form">
//         <h2>Complete Your Payment</h2>
//         <PaymentElement />
//         <button type="submit" disabled={!stripe} className="pay-button">
//           Pay
//         </button>
//         <p className="test-info">
//           Use test card: <strong>4242 4242 4242 4242</strong> (any future date & 3-digit CVC)
//         </p>
//       </form>
//     );
//   }
// }

// const InjectedCheckoutForm = () => (
//   <ElementsConsumer>
//     {({ stripe, elements }) => <CheckoutForm stripe={stripe} elements={elements} />}
//   </ElementsConsumer>
// );

// const PaymentPage = () => (
//   <Elements stripe={stripePromise} options={options}>
//     <InjectedCheckoutForm />
//   </Elements>
// );

// export default PaymentPage;




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
        const response = await fetch("http://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/payment/create-checkout-session", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
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
