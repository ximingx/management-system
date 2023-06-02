class Cache {
  store: Storage;
  constructor() {
    this.store = localStorage;
  }

  set(key: string, value: any) {
    this.store.setItem(key, value);
  }

  get(key: string) {
    return this.store.getItem(key);
  }

  remove(key: string) {
    this.store.removeItem(key);
  }

  clear() {
    this.store.clear();
  }
}

export default new Cache();
