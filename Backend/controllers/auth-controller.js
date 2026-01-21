const userService = require("../service/user-service");

class AuthController {
  async registration(req, res, next) {
    try {
      const { firstName, lastName, middleName, email, phone, password } = req.body;

      const registrationData = await userService.registration(firstName, lastName, middleName, email, phone, password);
      return res.status(201).json(registrationData);
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      return res.json({ user: userData.user, accessToken: userData.accessToken });
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      return res.json({ user: userData.user, accessToken: userData.accessToken });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AuthController();
