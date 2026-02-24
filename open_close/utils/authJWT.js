const { throwHttpError, mongooseControllerCatch } = require("./mongooseControllerCatch");
const jwt = require("jsonwebtoken");

module.exports = (adminRequired, userIdParam, redirectToLogin) => {
  return mongooseControllerCatch(async (req, res, next) => {
    try {
      let token;

      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (req.cookies.token) {
        token = req.cookies.token;
      }

      if (!token) throwHttpError("No token supplied!", 401);

      const decoded = jwt.verify(token, process.env.JWT_KEY);

      if (!decoded) {
        throwHttpError("Invalid token supplied!", 400);
      }

      const requiredUserId = req.params.userId;

      if (userIdParam && !decoded.isAdmin && (!requiredUserId || requiredUserId !== decoded.userId)) throwHttpError("Wrong userId supplied!", 403);

      if (adminRequired && !decoded.isAdmin) throwHttpError("You don't have administrator privileges!", 403);

      if (!decoded.isAdmin || !req.params.userId) {
        req.params.userId = decoded.userId;
      }
      req.params.isAdmin = decoded.isAdmin;

      next();
    } catch (error) {
      if (redirectToLogin) {
        res.redirect("/login");
      } else {
        throw error;
      }
    }
  });
};
