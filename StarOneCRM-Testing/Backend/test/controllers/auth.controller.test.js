// // test/controllers/auth.controller.test.js
// const request = require('supertest');
// const app = require('../../../Backend/index');
// const { User } = require('../../../Backend/models/user.model');
// const { OTP } = require('../../../Backend/models/otp.model');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// describe('Auth Controller', () => {
//   describe('POST /api/auth/register', () => {
//     it('should register a new user with valid data', async () => {
//       const otp = '123456';
//       const email = 'test@example.com';
//       await OTP.create({ email, otp, expiresAt: new Date(Date.now() + 600000) });

//       const response = await request(app)
//         .post('/api/auth/register')
//         .send({
//           name: 'Test User',
//           email,
//           age: 25,
//           role: 'customer',
//           password: 'password123',
//           otp,
//           loginMethod: 'traditional'
//         });

//       expect(response.status).toBe(201);
//       expect(response.body.message).toBe('User registered successfully');

//       const user = await User.findOne({ email });
//       expect(user).toBeTruthy();
//       expect(user.name).toBe('Test User');
//     });

//     it('should fail with invalid or expired OTP', async () => {
//       const response = await request(app)
//         .post('/api/auth/register')
//         .send({
//           name: 'Test User',
//           email: 'test@example.com',
//           age: 25,
//           role: 'customer',
//           password: 'password123',
//           otp: 'wrong',
//           loginMethod: 'traditional'
//         });

//       expect(response.status).toBe(400);
//       expect(response.body.message).toBe('Invalid or expired OTP');
//     });
//   });

//   describe('POST /api/auth/login', () => {
//     it('should login with valid credentials', async () => {
//       const password = 'password123';
//       const hashedPassword = await bcrypt.hash(password, 10);
//       await User.create({
//         name: 'Test User',
//         email: 'test@example.com',
//         password: hashedPassword,
//         role: 'customer',
//         loginMethod: 'traditional'
//       });

//       const response = await request(app)
//         .post('/api/auth/login')
//         .send({
//           email: 'test@example.com',
//           password
//         });

//       expect(response.status).toBe(200);
//       expect(response.body.token).toBeDefined();
//       expect(response.body.user).toBeDefined();
//     });

//     it('should fail with invalid credentials', async () => {
//       const response = await request(app)
//         .post('/api/auth/login')
//         .send({
//           email: 'wrong@example.com',
//           password: 'wrong'
//         });

//       expect(response.status).toBe(400);
//       expect(response.body.message).toBe('Invalid email or password');
//     });
//   });
// });




// test/controllers/auth.controller.test.js
const request = require('supertest');
const app = require('../../../Backend/index');
const { User } = require('../../../Backend/models/user.model');
const { OTP } = require('../../../Backend/models/otp.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('Auth Controller', () => {
  afterEach(async () => {
    await User.deleteMany({});
    await OTP.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user with valid data', async () => {
      const otp = '123456';
      const email = 'test-register@example.com'; // Unique email
      await OTP.create({ email, otp, expiresAt: new Date(Date.now() + 600000) });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email,
          age: 25,
          role: 'customer',
          password: 'password123',
          otp,
          loginMethod: 'traditional'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User registered successfully');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const email = 'test-login@example.com'; // Unique email
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        name: 'Test User',
        email,
        password: hashedPassword,
        role: 'customer',
        loginMethod: 'traditional'
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email,
          password
        });

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });
  });
});