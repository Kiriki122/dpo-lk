const userService = require("../service/user-service");
const oneCService = require("../service/oneC-service");

class UserController {
  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getProfile(req, res, next) {
    try {
      const user = await userService.getUserById(req.user.id);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async changePassword(req, res, next) {
    try {
      const { oldPassword, newPassword } = req.body;
      const userData = await userService.changePassword(req.user.id, oldPassword, newPassword);
      res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.json({ user: userData.user, accessToken: userData.accessToken });
    } catch (e) {
      next(e);
    }
  }

  async updateFaceInfo(req, res, next) {
    try {
      const user = await userService.getUserById(req.user.id);
      const { email, birthDate = null, snils = null, passport = null, registrationAddress = null } = req.body;

      const payload = {};
      payload.email = email;
      if (birthDate) payload.birthDate = birthDate;
      if (snils) payload.snils = snils;
      if (passport) Object.assign(payload, passport);
      if (registrationAddress) payload.registrationAddress = registrationAddress;

      await oneCService.updateFaceData(payload);
      res.json({ message: "Данные обновлены" });
    } catch (error) {
      next(error);
    }
  }

  async uploadDocs(req, res, next) {
    try {
    } catch (error) {}
  }
}

module.exports = new UserController();
