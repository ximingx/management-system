class Cache {
  store: Storage;
  constructor() {
    this.store = localStorage;
  }

  set(key: string, value: any) {
    this.store.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    const value = this.store.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  clear() {
    this.store.clear();
  }

  setAllObj(obj: any) {
    const key = Object.keys(obj);
    key.forEach((item) => {
      if (!obj[item]) obj[item] = "";
      this.store.setItem(item, obj[item]);
    });
  }
}

export default new Cache();
