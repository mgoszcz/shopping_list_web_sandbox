export default class Shop {
  constructor(name, logo = null, categoryList = []) {
    this.name = name;
    this.logo = logo;
    this.categoryList = categoryList;
  }
}
