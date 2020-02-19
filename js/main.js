class Base {
  query(selector) {
    return document.querySelector(selector)
  }

  queryAll(selector) {
    return document.querySelectorAll(selector)
  }
}