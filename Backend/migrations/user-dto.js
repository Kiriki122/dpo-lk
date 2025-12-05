module.exports = class UserDto {
  email;
  phone;
  id;

  constructor(model) {
    this.email = model.email;
    this.phone = model.phone;
    this.id = model.id;
  }
};
