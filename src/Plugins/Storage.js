const storeKey = 'virtualSortableState';
const defaultStore = { from: {}, to: {} };

function Storage() {}

Storage.prototype = {
  constructor: Storage,

  clear() {
    localStorage.removeItem(storeKey);
  },

  /**
   * Obtaining Synchronization Data
   * @returns states: { from, to }
   */
  getStore() {
    try {
      const result = window[storeKey];
      return result || defaultStore;
    } catch (e) {
      return defaultStore;
    }
  },

  /**
   * @returns states: { from, to }
   */
  getValue() {
    return new Promise((resolve, reject) => {
      try {
        const result = window[storeKey];
        resolve(result || defaultStore);
      } catch (e) {
        reject(defaultStore);
      }
    });
  },

  /**
   * @param {Object} value { from, to }
   */
  setValue(value) {
    return new Promise((resolve, reject) => {
      try {
        const store = window[storeKey];
        const result = { ...store, ...value };
        window[storeKey] = result;
        resolve(result);
      } catch (e) {
        reject(defaultStore);
      }
    });
  },
};

export const Store = new Storage();
