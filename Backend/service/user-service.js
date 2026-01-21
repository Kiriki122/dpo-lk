const { User } = require("../models");
const bcrypt = require("bcrypt");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
  async getAllUsers() {
    const users = await User.findAll();
    return users;
  }

  async getUserById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw ApiError.NotFound("Пользователь не найден");
    }
    const data = new UserDto(user);
    return data;
  }

  async changePassword(id, oldPassword, newPassword) {
    const user = await User.findByPk(id);
    if (!user) {
      throw ApiError.NotFound("Пользователь не найден");
    }

    const isPassEquals = await bcrypt.compare(oldPassword, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный текущий пароль");
    }

    const isNewPassEqualsOldPass = await bcrypt.compare(newPassword, user.password);
    if (isNewPassEqualsOldPass) {
      throw ApiError.BadRequest("Новый пароль должен отличаться от старого");
    }

    const hashPassword = await bcrypt.hash(newPassword, 3);
    user.password = hashPassword;
    await user.save();

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ id: userDto.id });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();
