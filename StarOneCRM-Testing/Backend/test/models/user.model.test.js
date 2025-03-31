// test/models/user.model.test.js
const { User } = require('../../../Backend/models/user.model');
const mongoose = require('mongoose');

describe('User Model', () => {
  it('should create and save a user successfully', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'customer',
      loginMethod: 'traditional'
    };
    const validUser = new User(userData);
    const savedUser = await validUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.role).toBe(userData.role);
    expect(savedUser.loginMethod).toBe(userData.loginMethod);
  });

  it('should fail when required fields are missing', async () => {
    const userData = {};
    const user = new User(userData);
    
    let err;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).toBeDefined();
  });

  it('should fail when email is invalid', async () => {
    const userData = {
      name: 'Test User',
      email: 'invalid-email',
      password: 'password123',
      role: 'customer',
      loginMethod: 'traditional'
    };
    const user = new User(userData);
    
    let err;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).toBeDefined();
  });

  it('should automatically set isFormFilled to false for new users', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'customer',
      loginMethod: 'traditional'
    };
    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser.isFormFilled).toBe(false);
  });
});