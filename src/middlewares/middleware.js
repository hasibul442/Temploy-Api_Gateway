import { authenticateEmployee } from "./authEmployeeMiddleware.js";
import { authenticateUser } from "./authUserMiddleware.js";

export async function checkAuthentication(req, res, next) {
  authenticateEmployee(req, res, (err) => {
    if (!err && req.employee) {
      return next();
    }

    authenticateUser(req, res, (err) => {
      if (!err && req.user) {
        return next();
      }
      // Neither passed
      return res.status(401).json({ message: "Not authorized" });
    });
  });
}
