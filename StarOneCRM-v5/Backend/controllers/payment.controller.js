// require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const Payment = require("../models/payment.model");

// // Create a new checkout session
// // exports.createCheckoutSession = async (req, res) => {
// //   try {
// //     console.log("Creating checkout session...");
// //     const session = await stripe.checkout.sessions.create({
// //       payment_method_types: ["card"],
// //       mode: "payment",
// //       line_items: [
// //         {
// //           price_data: {
// //             currency: "usd",
// //             product_data: { name: "Test Product" },
// //             unit_amount: 1000, // $10.00
// //           },
// //           quantity: 1,
// //         },
// //       ],
// //       success_url: "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/payment/checkout-session-status?session_id={CHECKOUT_SESSION_ID}",
// //       cancel_url: "https://polite-field-09918cc00.4.azurestaticapps.net/#/cancel",
// //     });

// //     // Create a new payment record
// //     const payment = new Payment({
// //       userId: req.user.id, // Assuming you have user information in req.user
// //       sessionId: session.id,
// //       amount: 1000,
// //       currency: "usd",
// //       paymentMethod: "card",
// //     });
// //     await payment.save();

// //     res.json({ id: session.id });
// //     console.log("Checkout session created!");
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };


// exports.createCheckoutSession = async (req, res) => {
//   try {
//     const { amount } = req.body;

//     // Validate amount
//     if (!amount || amount <= 0) {
//       return res.status(400).json({ error: "Invalid amount" });
//     }

//     console.log("Creating checkout session for amount:", amount);

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: { name: "Custom Payment" },
//             unit_amount: amount, // Use the amount from the frontend
//           },
//           quantity: 1,
//         },
//       ],
//       success_url: "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/payment/checkout-session-status?session_id={CHECKOUT_SESSION_ID}",
//       cancel_url: "https://polite-field-09918cc00.4.azurestaticapps.net/#/cancel",
//     });

//     // Save payment details to database
//     const payment = new Payment({
//       userId: req.user.id, // Assuming user is authenticated
//       sessionId: session.id,
//       amount,
//       currency: "usd",
//       paymentMethod: "card",
//       paymentStatus: "pending",
//     });

//     await payment.save();

//     res.json({ id: session.id });
//     console.log("Checkout session created!");
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };



// // Get checkout session status
// exports.getCheckoutSessionStatus = async (req, res) => {
//   const sessionId = req.query.session_id;
//   try {
//     const session = await stripe.checkout.sessions.retrieve(sessionId);
//     console.log("Session data:", session);

//     // Update the payment status
//     const payment = await Payment.findOne({ sessionId });
//     if (payment) {
//       payment.paymentStatus = session.payment_status === "paid" ? "completed" : "failed";
//       await payment.save();
//     }

//     res.redirect(`https://polite-field-09918cc00.4.azurestaticapps.net/#/success?session_id=${sessionId}`);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Handle Stripe webhook events
// exports.webhook = async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
//   } catch (err) {
//     console.error(`Webhook error: ${err.message}`);
//     return res.status(400).send(`Webhook error: ${err.message}`);
//   }

//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;
//     console.log("Payment Successful! Session details:", session);

//     // Update the payment status
//     const payment = await Payment.findOne({ sessionId: session.id });
//     if (payment) {
//       payment.paymentStatus = "completed";
//       await payment.save();
//     }
//   }

//   res.json({ received: true });
// };




// exports.getPaymentsByUserId = async (req, res) => {
//   const userId = req.user.id;
//   try {
//     const payments = await Payment.find({ userId });
//     res.json(payments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };










require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/payment.model");
const User = require("../models/user.model").User;

exports.createCheckoutSession = async (req, res) => {
  try {
    const { amount } = req.body;

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    console.log("Creating checkout session for amount:", amount);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Custom Payment" },
            unit_amount: amount, // Use the amount from the frontend
          },
          quantity: 1,
        },
      ],
      success_url: "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/payment/checkout-session-status?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://polite-field-09918cc00.4.azurestaticapps.net/#/cancel",
    });

    // Save payment details to database
    const payment = new Payment({
      userId: req.user.id, // Assuming user is authenticated
      sessionId: session.id,
      amount,
      currency: "usd",
      paymentMethod: "card",
      paymentStatus: "pending",
    });

    await payment.save();

    res.json({ id: session.id });
    console.log("Checkout session created!");
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get checkout session status
exports.getCheckoutSessionStatus = async (req, res) => {
  const sessionId = req.query.session_id;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("Session data:", session);

    // Update the payment status
    const payment = await Payment.findOne({ sessionId });
    if (payment) {
      payment.paymentStatus = session.payment_status === "paid" ? "completed" : "failed";
      await payment.save();
    }

    res.redirect(`https://polite-field-09918cc00.4.azurestaticapps.net/#/success?session_id=${sessionId}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handle Stripe webhook events
exports.webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook error: ${err.message}`);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Payment Successful! Session details:", session);

    // Update the payment status
    const payment = await Payment.findOne({ sessionId: session.id });
    if (payment) {
      payment.paymentStatus = "completed";
      await payment.save();
    }
  }

  res.json({ received: true });
};

exports.getPaymentsByUserId = async (req, res) => {
  const userId = req.user.id;
  try {
    const payments = await Payment.find({ userId });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAssignedTasks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: "tasksAssigned",
        populate: {
          path: "customer employee",
          select: "name email role"
        }
      })
      .exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ success: true, tasksAssigned: user.tasksAssigned });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.getPaymentsForAssignedUsers = async (req, res) => {
//   try {
//     console.log(req.user);
//     const user = await User.findById(req.user.id)
//       .populate("tasksAssigned")
//       .exec();
//     console.log(user);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const userIds = user.tasksAssigned.map(task => task.customer._id);
//     const payments = await Payment.find({ userId: { $in: userIds } });

//     res.status(200).json({ success: true, payments });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };




exports.getPaymentsForAssignedUsers = async (req, res) => {
  try {
    console.log(req.user);
    const user = await User.findById(req.user.id)
      .populate({
        path: "tasksAssigned",
        populate: {
          path: "customer",
          select: "name"
        }
      })
      .exec();
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userIds = user.tasksAssigned.map(task => task.customer._id);
    const payments = await Payment.find({ userId: { $in: userIds } }).populate("userId", "name");

    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
