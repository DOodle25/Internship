// test/utils/mockAuth.js
const jwt = require('jsonwebtoken');

const mockVerifyJWT = (req, res, next) => {
  // For testing purposes, we'll just attach a mock user ID
  req.user = { id: 'mockUserId', isAdmin: false };
  next();
};

const mockIsAdmin = (req, res, next) => {
  req.user = { id: 'mockAdminId', isAdmin: true };
  next();
};

module.exports = { mockVerifyJWT, mockIsAdmin };