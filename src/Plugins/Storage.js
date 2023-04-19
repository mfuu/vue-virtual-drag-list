const storeKey = 'virtualSortableState';

function Storage() {}

Storage.prototype = {
  constructor: Storage,

  clear() {
    localStorage.removeItem(storeKey);
  },

  /**
   * @returns drag states: { from, to }
   */
  getValue() {
    return new Promise((resolve, reject) => {
      try {
        const result = JSON.parse(localStorage.getItem(storeKey));
        resolve(result);
      } catch (e) {
        reject({});
      }
    });
  },

  /**
   * @param {*} value { from, to }
   */
  setValue(value) {
    return new Promise((resolve, reject) => {
      try {
        const store = JSON.parse(localStorage.getItem(storeKey));
        const result = JSON.stringify({ ...store, ...value });
        localStorage.setItem(storeKey, result);
        resolve(result);
      } catch (e) {
        reject({});
      }
    });
  },
};

export default Storage;
