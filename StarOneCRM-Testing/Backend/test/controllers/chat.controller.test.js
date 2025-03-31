// test/controllers/chat.controller.test.js
const request = require('supertest');
const app = require('../../../Backend/index');
const { User } = require('../../../Backend/models/user.model');
const { Task } = require('../../../Backend/models/task.model');
const { Message } = require('../../../Backend/models/message.model');
const jwt = require('jsonwebtoken');

describe('Chat Controller', () => {
  let customer, employee, task, token;

  beforeEach(async () => {
    customer = await User.create({
      name: 'Customer',
      email: 'customer@example.com',
      password: 'password123',
      role: 'customer',
      loginMethod: 'traditional'
    });

    employee = await User.create({
      name: 'Employee',
      email: 'employee@example.com',
      password: 'password123',
      role: 'employee',
      loginMethod: 'traditional'
    });

    task = await Task.create({
      title: 'Test Task',
      description: 'Task description',
      customer: customer._id,
      employee: employee._id,
      isEmployeeAssigned: true
    });

    token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  describe('GET /api/chat/assigned-tasks', () => {
    it('should return tasks assigned to the user', async () => {
      await User.findByIdAndUpdate(customer._id, { $push: { tasksAssigned: task._id } });
      await User.findByIdAndUpdate(employee._id, { $push: { tasksAssigned: task._id } });

      const response = await request(app)
        .get('/api/chat/assigned-tasks')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.tasksAssigned)).toBe(true);
    });
  });

  describe('POST /api/chat/send', () => {
    it('should send a message for a task', async () => {
      const response = await request(app)
        .post('/api/chat/send')
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: 'Test message',
          taskId: task._id
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Message sent');

      const updatedTask = await Task.findById(task._id).populate('messages');
      expect(updatedTask.messages.length).toBe(1);
    });

    it('should fail when not authorized for the task', async () => {
      const otherUser = await User.create({
        name: 'Other User',
        email: 'other@example.com',
        password: 'password123',
        role: 'customer',
        loginMethod: 'traditional'
      });
      const otherToken = jwt.sign({ id: otherUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      const response = await request(app)
        .post('/api/chat/send')
        .set('Authorization', `Bearer ${otherToken}`)
        .send({
          content: 'Test message',
          taskId: task._id
        });

      expect(response.status).toBe(403);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('GET /api/chat/task/:taskId/messages', () => {
    it('should retrieve messages for a task', async () => {
      const message = await Message.create({
        sender: customer._id,
        task: task._id,
        content: 'Test message'
      });
      await Task.findByIdAndUpdate(task._id, { $push: { messages: message._id } });

      const response = await request(app)
        .get(`/api/chat/task/${task._id}/messages`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.messages)).toBe(true);
      expect(response.body.messages.length).toBe(1);
    });
  });
});