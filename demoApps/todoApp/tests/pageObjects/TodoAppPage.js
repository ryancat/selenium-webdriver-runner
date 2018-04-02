const {By} = require('selenium-webdriver')
const {driverMixin, pipeMixin} = require('../../../../mixins/forDriver')

// console.log('driverMixin.startDriver', driverMixin.startDriver)

/**
 * Add mixin to instance object
 * 
 * @param {Object} instance 
 * @param {Object} mixinObj 
 */
const addMixin = (instance, mixinObj) => {
  for (let key in mixinObj) {
    if (mixinObj.hasOwnProperty(key)) {
      let val = mixinObj[key]
      if (val !== undefined && instance[key] === undefined) {
        instance[key] = val.bind ? val.bind(instance) : val
      }
    }
  }

  return instance
}

module.exports = class TodoAppPage {
  constructor () {
    // Add mixin for driver methods
    addMixin(this, driverMixin)
    addMixin(this, pipeMixin)
  }

  get newTaskSection () {
    return this.driver.findElement(By.css('section.new-task-section'))
  }

  get todoTaskSection () {
    return this.driver.findElement(By.css('section.todo-task-section'))
  }

  get doneTaskSection () {
    return this.driver.findElement(By.css('section.done-task-section'))
  }

  get addTodoItemButton () {
    return this.newTaskSection.findElement(By.css('button.to-add'))
  }

  get addTodoItemInput () {
    return this.newTaskSection.findElement(By.css('input.task-input'))
  }

  /**
   * Open the todo app page
   */
  async open () {
    await this.openPath('/')
  }

  async clickAddItemButton () {
    await this.addTodoItemButton.click()
  }

  async addTodoItemContent (todoContent = 'abcd') {
    await this.addTodoItemInput.sendKeys(todoContent)
  }

  async getTodoItems () {
    return await this.todoTaskSection.findElements(By.css('li.todo-item .task-content'))
  }

  async getTodoItemContents () {
    const todoItems = await this.getTodoItems()
    return await Promise.all(todoItems.map(async (todoItem) => await todoItem.getText()))
  }

  async getDoneItems () {
    return await this.doneTaskSection.findElements(By.css('li.done-item .task-content'))
  }

  async getDoneItemContents () {
    const doneItems = await this.getDoneItems()
    return await Promise.all(doneItems.map(async (doneItem) => await doneItem.getText()))
  }
}