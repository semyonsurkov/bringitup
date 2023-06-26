export default class Difference {
  constructor(oldOfficer, newOfficer, items) {
    this.oldOfficer = document.querySelector(oldOfficer);
    this.newOfficer = document.querySelector(newOfficer);
    this.oldItems = [];
    this.newItems = [];
    this.oldCounter = 0;
    this.newCounter = 0;

    if (this.oldOfficer && this.newOfficer && items) {
      this.oldItems = this.oldOfficer.querySelectorAll(items);
      this.newItems = this.newOfficer.querySelectorAll(items);
    }
  }

  bindTriggers(container, items, counter) {
    container.querySelector('.plus').addEventListener('click', () => {
      if (counter !== items.length - 2) {
        items[counter].style.display = 'flex';
        counter += 1;
      } else {
        items[counter].style.display = 'flex';
        items[items.length - 1].remove();
      }
    });
  }

  hideItems(items) {
    items.forEach((item, i, arr) => {
      if (i !== arr.length - 1) {
        item.style.display = 'none';
      }
    });
  }

  init() {
    if (this.oldItems.length > 0 && this.newItems.length > 0) {
      this.hideItems(this.oldItems);
      this.hideItems(this.newItems);
      this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
      this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
    }
  }
}
