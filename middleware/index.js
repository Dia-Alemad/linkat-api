const authService = require("../services/auth");
const responses = require("../helper/responses");

const isAuthenticated = async function (req, res, next) {
  // take out the jwt we've set in the cookie set or from auth headers coming from client
  const token =
    req?.cookies?.jwt ||
    req?.headers?.authorization?.split(" ")[1] ||
    req?.headers?.Authorization?.split(" ")[1] ||
    null;
  const isVerified = await authService.verifyUser(req, res, next, token);
  console.log("isVerified", isVerified);
  if (isVerified) {
    return next();
  }
  responses.unauthorized(res);
  return;
};

module.exports = {
  isAuthenticated,
};