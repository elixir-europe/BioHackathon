class CustomAjvError {
  constructor(keyword, message, paramsObj) {
    this.keyword = keyword;
    this.message = message;
    this.params = paramsObj;
  }
}

module.exports = CustomAjvError;