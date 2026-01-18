const { User } = require("../models");
const bcrypt = require("bcrypt");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(firstName, lastName, middleName, email, phone, password) {
    const candidate_email = await User.findOne({ where: { email } });
    if (candidate_email) {
      throw ApiError.Conflict(`Пользователь с почтовым адресом ${email} уже существует`);
    }

    const candidate_phone = await User.findOne({ where: { phone } });
    if (candidate_phone) {
      throw ApiError.Conflict(`Пользователь с номером телефона ${phone} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 3);

    await User.create({ firstName, lastName, middleName, email, phone, password: hashPassword });

    return { success: true, message: "Пользователь успешно зарегистрирован" };
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest("Неверный логин или пароль");
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный логин или пароль");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);

    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await User.findByPk(userData.id);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await User.findAll();
    return users;
  }

  async getUserById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw ApiError.NotFound("Пользователь не был найден");
    }
    const data = new UserDto(user);
    return data;
  }
}

module.exports = new UserService();
