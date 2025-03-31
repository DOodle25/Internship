// test/models/task.model.test.js
const { Task } = require('../../../Backend/models/task.model');
const { User } = require('../../../Backend/models/user.model');
const mongoose = require('mongoose');

describe('Task Model', () => {
  let customer;

  beforeEach(async () => {
    customer = await User.create({
      name: 'Customer',
      email: 'customer@example.com',
      password: 'password123',
      role: 'customer',
      loginMethod: 'traditional'
    });
  });

  it('should create and save a task successfully', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'Task description',
      customer: customer._id
    };
    const task = new Task(taskData);
    const savedTask = await task.save();

    expect(savedTask._id).toBeDefined();
    expect(savedTask.title).toBe(taskData.title);
    expect(savedTask.description).toBe(taskData.description);
    expect(savedTask.customer.toString()).toBe(customer._id.toString());
    expect(savedTask.isEmployeeAssigned).toBe(false);
  });

  it('should fail when required fields are missing', async () => {
    const taskData = {};
    const task = new Task(taskData);
    
    let err;
    try {
      await task.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.title).toBeDefined();
    expect(err.errors.description).toBeDefined();
    expect(err.errors.customer).toBeDefined();
  });

  it('should automatically set isEmployeeAssigned to false', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'Task description',
      customer: customer._id
    };
    const task = new Task(taskData);
    const savedTask = await task.save();

    expect(savedTask.isEmployeeAssigned).toBe(false);
  });
});