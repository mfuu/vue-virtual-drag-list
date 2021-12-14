module.exports = {
  getUniqueId(prefix) {
    return `${prefix}$${Math.random().toString(16).substr(9)}`
  }
}