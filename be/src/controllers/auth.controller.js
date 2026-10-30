const authService = require('../services/auth.service');
const ApiResponse = require('../utils/ApiResponse');

async function login(req, res) {
  const data = await authService.login(req.validated.body);
  return new ApiResponse(200, 'Login successful', data).send(res);
}

async function me(req, res) {
  const data = await authService.getCurrentAdmin(req.user);
  return new ApiResponse(200, 'Admin profile fetched successfully', data).send(res);
}

async function logout(_req, res) {
  return new ApiResponse(200, 'Logout successful', {
    tokenInvalidated: false,
    instruction: 'Remove the JWT from client storage. This API uses stateless tokens and does not revoke them on the server.',
  }).send(res);
}

module.exports = {
  login,
  me,
  logout,
};
