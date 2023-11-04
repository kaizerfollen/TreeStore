class TreeStore {
  constructor(items) {
    this.itemMap = new Map();
    this.populateItemMap(items);
  }

  populateItemMap(items) {
    for (const item of items) {
      if (!this.itemMap.has(item.id)) {
        this.itemMap.set(item.id, item);
      }
    }
  }

  // Метод для получения всех элементов
  getAll() {
    return Array.from(this.itemMap.values());
  }

  // Метод для получения элемента по id
  getItem(id) {
    return this.itemMap.get(id) || null;
  }

  // Метод для получения дочерних элементов
  getChildren(id) {
    return Array.from(this.itemMap.values()).filter((item) => item.parent === id);
  }

  // Метод для получения всех дочерних элементов
  getAllChildren(id) {
    const result = [];
    const stack = [id];

    while (stack.length > 0) {
      const currentId = stack.pop();
      const children = this.getChildren(currentId);
      result.push(...children.map((child) => child.id));
      stack.push(...children.map((child) => child.id));
    }

    return result.map((id) => this.getItem(id));
  }

  // Метод для получения всех родительских элементов
  getAllParents(id) {
    const result = [];
    let currentId = id;

    while (currentId) {
      const item = this.getItem(currentId);
      if (item) {
        result.unshift(item);
        currentId = item.parent;
      } else {
        currentId = null;
      }
    }

    return result;
  }
}

const items = [
  { id: 1, parent: 'root' },
  { id: 2, parent: 1, type: 'test' },
  { id: 3, parent: 1, type: 'test' },
  { id: 4, parent: 2, type: 'test' },
  { id: 5, parent: 2, type: 'test' },
  { id: 6, parent: 2, type: 'test' },
  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items);

console.log(ts.getAll());
console.log(ts.getItem(7));
console.log(ts.getChildren(4));
console.log(ts.getChildren(5));
console.log(ts.getChildren(2));
console.log(ts.getAllChildren(2));
console.log(ts.getAllParents(7));
