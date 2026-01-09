module.exports = class UserDto {
  email;
  phone;
  firstName;
  lastName;
  middleName;
  id;

  constructor(model) {
    this.email = model.email;
    this.phone = model.phone;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.middleName = model.middleName;
    this.id = model.id;
  }
};
