module.exports = class CourseDto {
  id;
  name;
  hours;
  description;
  mode;
  category;
  modules;

  constructor(model) {
    this.id = model.onec_id;
    this.name = model.name;
    this.hours = model.hours;
    this.description = model.description;

    this.mode = model.mode;
    this.category = model.category;

    if (model.modules && Array.isArray(model.modules)) {
      this.modules = model.modules.map((m) => ({
        title: m.title,
        hours: m.hours,
      }));
    } else {
      this.modules = [];
    }
  }
};
