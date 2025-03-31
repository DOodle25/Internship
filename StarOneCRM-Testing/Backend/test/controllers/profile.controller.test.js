// test/controllers/profile.controller.test.js
const request = require('supertest');
const app = require('../../../Backend/index');
const { User } = require('../../../Backend/models/user.model');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

describe('Profile Controller', () => {
  let user, token;

  beforeEach(async () => {
    user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'customer',
      loginMethod: 'traditional'
    });

    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  describe('GET /api/profile', () => {
    it('should retrieve user profile', async () => {
      const response = await request(app)
        .get('/api/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Profile retrieved successfully');
      expect(response.body.data._id.toString()).toBe(user._id.toString());
    });
  });

  describe('PATCH /api/profile', () => {
    it('should update user profile', async () => {
      const response = await request(app)
        .patch('/api/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Updated Name',
          age: 30
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Profile updated successfully');
      expect(response.body.data.name).toBe('Updated Name');
      expect(response.body.data.age).toBe(30);

      const updatedUser = await User.findById(user._id);
      expect(updatedUser.name).toBe('Updated Name');
      expect(updatedUser.age).toBe(30);
    });
  });

  describe('DELETE /api/profile', () => {
    it('should delete user profile', async () => {
      const response = await request(app)
        .delete('/api/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Profile, associated tasks, and messages deleted successfully');

      const deletedUser = await User.findById(user._id);
      expect(deletedUser).toBeNull();
    });
  });
});