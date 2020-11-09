module.exports = {
  obj: {},
  get string() {
    this.obj.type = String;
    return this
  },
  get number() {
    this.obj.type = Number;
    return this
  },
  get date() {
    this.obj.type = Date;
    return this
  },
  get required() {
    this.obj.required = true;
    return this
  },
  build() {
    const result = this.obj
    this.obj = {}
    return result;
  }
}