const storeKey = 'virtualSortableState';
const defaultStore = { from: {}, to: {} };

function Storage() {}

Storage.prototype = {
  constructor: Storage,

  clear() {
    window[storeKey] = undefined;
  },

  /**
   * Obtaining Synchronization Data
   * @returns states: { from, to }
   */
  getStore() {
    try {
      const result = JSON.parse(window[storeKey]);
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
        const result = JSON.parse(window[storeKey]);
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
        const store = JSON.parse(window[storeKey] || '{}');
        const result = { ...store, ...value };
        window[storeKey] = JSON.stringify(result);
        resolve(result);
      } catch (e) {
        reject(defaultStore);
      }
    });
  },
};

export const Store = new Storage();
