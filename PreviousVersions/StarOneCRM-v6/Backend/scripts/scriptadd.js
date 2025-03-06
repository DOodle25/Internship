// require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker"); // ✅ Correct import

const User = require("../models/user.model").User;
const Task = require("../models/task.model");
const Message = require("../models/message.model");
const Payment = require("../models/payment.model");

// const MONGO_URI = process.env.MONGODB_URI;
// console.log("MONGO_URI");
// console.log(MONGO_URI);

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://Dipen123:Dipen123Password@cluster0.qcvxet4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Generate Random Users (Customers & Employees)
const createUsers = async (numUsers = 10) => {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    users.push({
      name: faker.person.fullName(), // ✅ Updated
      email: faker.internet.email(),
      role: i % 2 === 0 ? "customer" : "employee",
      isAdmin: false,
      password: faker.internet.password(),
      loginMethod: "traditional",
    });
  }
  return await User.insertMany(users);
};

// Generate Tasks
const createTasks = async (users) => {
  const customers = users.filter((u) => u.role === "customer");
  const employees = users.filter((u) => u.role === "employee");

  const tasks = [];
  for (let i = 0; i < 5; i++) {
    const customer = faker.helpers.arrayElement(customers); // ✅ Updated
    const employee = faker.helpers.arrayElement(employees); // ✅ Updated
    tasks.push({
      title: faker.company.buzzPhrase(),
      description: faker.lorem.sentence(),
      customer: customer._id,
      employee: employee._id,
      isEmployeeAssigned: true,
    });
  }
  return await Task.insertMany(tasks);
};

// Generate Messages
const createMessages = async (tasks, users) => {
  const messages = [];
  for (const task of tasks) {
    const sender = faker.helpers.arrayElement(users); // ✅ Updated
    messages.push({
      sender: sender._id,
      task: task._id,
      content: faker.lorem.sentence(),
      isRead: faker.datatype.boolean()
      , // ✅ Updated
    });
  }
  return await Message.insertMany(messages);
};

// Generate Payments
// const createPayments = async (users) => {
//   const customers = users.filter((u) => u.role === "customer");

//   const payments = [];
//   for (const user of customers) {
//     payments.push({
//       userId: user._id,
//       sessionId: faker.string.uuid(), // ✅ Updated
//       paymentStatus: faker.helpers.arrayElement(["pending", "completed", "failed"]), // ✅ Updated
//       amount: faker.finance.amount(10, 500, 2),
//       currency: "USD",
//       paymentMethod: faker.helpers.arrayElement(["card", "paypal"]), // ✅ Updated
//     });
//   }
//   return await Payment.insertMany(payments);
// };

const createPayments = async (users) => {
  const customers = users.filter((u) => u.role === "customer");

  const payments = [];
  for (const user of customers) {
    const numPayments = faker.number.int({ min: 1, max: 10 });
    for (let i = 0; i < numPayments; i++) {
      payments.push({
        userId: user._id,
        sessionId: faker.string.uuid(), // ✅ Updated
        paymentStatus: faker.helpers.arrayElement(["pending", "completed", "failed"]), // ✅ Updated
        amount: faker.finance.amount(10, 500, 2),
        currency: "USD",
        paymentMethod: faker.helpers.arrayElement(["card", "paypal"]), // ✅ Updated
        createdAt: faker.date.past(2), // Generate a date within the past 2 years
        updatedAt: faker.date.past(2), // Generate a date within the past 2 years
      });
    }
  }
  return await Payment.insertMany(payments);
};


// Run Script
const generateData = async () => {
  try {
    console.log("🚀 Generating Dummy Data...");

    const users = await createUsers(10);
    console.log(`✅ Created ${users.length} users`);

    const tasks = await createTasks(users);
    console.log(`✅ Created ${tasks.length} tasks`);

    const messages = await createMessages(tasks, users);
    console.log(`✅ Created ${messages.length} messages`);

    const payments = await createPayments(users);
    console.log(`✅ Created ${payments.length} payments`);

    console.log("🎉 Dummy Data Generation Completed!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error Generating Dummy Data:", error);
    mongoose.connection.close();
  }
};

// Execute script
generateData();
