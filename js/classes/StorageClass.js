export default class StorageClass {
  static get(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  static add(key, value) {
    const items = this.get(key);
    items.push(value);
    localStorage.setItem(key, JSON.stringify(items));
  }
}
