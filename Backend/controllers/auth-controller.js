const authService = require("../service/auth-service");

class AuthController {
  async registration(req, res, next) {
    try {
      const { firstName, lastName, middleName, email, phone, password } = req.body;

      const processPhone = (val) => {
        if (typeof val !== "string") return val;
        const cleaned = val.replace(/\D/g, "");
        return cleaned.startsWith("8") ? cleaned : "+" + cleaned;
      };

      const processedPhone = processPhone(phone);

      const registrationData = await authService.registration(
        firstName,
        lastName,
        middleName,
        email,
        processedPhone,
        password
      );
      return res.status(201).json(registrationData);
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await authService.login(email, password);
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
      const token = await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken);
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
