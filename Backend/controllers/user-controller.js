const userService = require("../service/user-service");

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
}

module.exports = new UserController();
