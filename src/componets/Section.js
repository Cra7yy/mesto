export default class Section {
  constructor({ items, renderer }, selector) {
    this._item = items
    this._renderer = renderer
    this._gridConteiner = document.querySelector(selector)
  }
  renderItems() {
    this._item.forEach(el => this._renderer(el))
  }

  addItem(element) {
    this._gridConteiner.append(element)
  }
}





