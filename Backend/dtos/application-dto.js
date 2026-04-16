module.exports = class ApplicationDto {
  id;
  date;
  courseName;
  status;

  constructor(model) {
    this.id = model.id;
    this.date = model.date;
    this.courseName = model.course_name;
    this.status = model.status;
  }
};
