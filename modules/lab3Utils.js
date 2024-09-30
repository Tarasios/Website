// modules/lab3Utils.js
class Lab3Utils {
  constructor(name, messages) {
    this.name = name;
    this.messages = messages;
  }

  getDate() {
    const currentDate = new Date().toString();
    const message = this.messages.greeting
      .replace('%1', this.name)
      .replace('%2', currentDate);

    return message;
  }
}

module.exports = Lab3Utils;

