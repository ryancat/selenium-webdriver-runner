import './app.scss'

const Util = {
  tagsToReplace: {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  },

  replaceTag: tag => Util.tagsToReplace[tag] || tag,
  
  escapeHtml: text => text.replace(/[&<>]/g, Util.replaceTag),

  /**
   * Find the nearest element that has given className,
   * start from startElement, and end by endElement
   */
  findNearest: (startElement, className, endElement = document.body) => {
    while (startElement && startElement !== endElement) {
      if (startElement.classList.contains(className)) {
        return startElement;
      }

      startElement = startElement.parentElement;
    }

    return null
  }
}

class App {

  constructor (container, todoItems = [], doneItems = []) {
    // Props
    this.container = container

    // DOM element
    this.newTaskSection = this.container.querySelector('.new-task-section')
    this.todoTaskSection = this.container.querySelector('.todo-task-section')
    this.doneTaskSection = this.container.querySelector('.done-task-section')
    this.addTaskInput = this.newTaskSection.querySelector('input.task-input')
    this.addTaskButton = this.newTaskSection.querySelector('button.task-button')
    this.todoList = this.todoTaskSection.querySelector('ul.todo-list')
    this.doneList = this.doneTaskSection.querySelector('ul.done-list')

    // State
    this.todoItems = []
    this.doneItems = []

    this.initTodoItems(todoItems)
    this.initDoneItems(doneItems)
    this.refreshAddTaskButton()
    this.listen()
  }

  initTodoItems (todoItems = []) {
    todoItems.forEach(todoItem => {
      this.createNewTask(todoItem)
    })
  }

  initDoneItems (doneItems = []) {
    doneItems.forEach(doneItem => {
      this.createDoneTask(doneItem)
    })
  }

  listen () {
    this.addTaskButton.addEventListener('click', this.handleAddTask.bind(this))
    this.addTaskInput.addEventListener('keyup', this.handleAddTaskKeyup.bind(this))
    this.todoList.addEventListener('click', this.handleTodoListClick.bind(this))
    this.doneList.addEventListener('click', this.handleDoneListClick.bind(this))
  }

  handleAddTask () {
    let todoContent = this.addTaskInput.value;

    if (todoContent.length === 0) {
      return
    }

    this.createNewTask(todoContent)
  }

  handleAddTaskKeyup () {
    this.refreshAddTaskButton()
  }

  handleTodoListClick (e) {
    // Find the targee todo item
    let target = e.target,
        todoItemElement = Util.findNearest(target, 'todo-item', this.todoList)

    if (!todoItemElement) {
      return
    }

    let todoItem = this.todoItems.find(todoItem => todoItem.element === todoItemElement)

    if (target.classList.contains('to-done')) {
      // Click on done button
      this.markDone(todoItem)
    }
    else if (target.classList.contains('to-edit')) {
      // Click on edit button
      this.edit(todoItem)
    }
    else if (target.classList.contains('to-edit-finish')) {
      // Click on finish edit button
      this.finishEdit(todoItem)
    }
  }

  handleDoneListClick (e) {
    // Find the targee todo item
    let target = e.target,
        doneItemElement = Util.findNearest(target, 'done-item', this.doneList)

    if (!doneItemElement) {
      return
    }

    let doneItem = this.doneItems.find(doneItem => doneItem.element === doneItemElement)

    if (target.classList.contains('to-undo')) {
      // Click on done button
      this.markTodo(doneItem)
    }
    else if (target.classList.contains('to-remove')) {
      // Click on edit button
      this.remove(doneItem)
    }
  }

  markDone (todoItem) {
    if (!todoItem) {
      return 
    }

    // If in the middle of editing, save it first
    if (todoItem.element.classList.contains('edit')) {
      this.finishEdit(todoItem)
    }

    this.todoItems.splice(this.todoItems.indexOf(todoItem), 1)
    this.todoList.removeChild(todoItem.element)
    this.createDoneTask(todoItem.content)
  }

  edit (todoItem) {
    if (!todoItem) {
      return 
    }

    todoItem.element.classList.add('edit')
    todoItem.element.querySelector('.task-content input').value = todoItem.content

    let editButton = todoItem.element.querySelector('.task-button.to-edit')
    editButton.classList.remove('to-edit')
    editButton.classList.add('to-edit-finish')
    editButton.textContent = 'Finish edit'
  }

  finishEdit (todoItem) {
    if (!todoItem) {
      return 
    }

    let newContent = todoItem.element.querySelector('.task-content input').value || todoItem.content
    todoItem.refresh(newContent)
    todoItem.element.classList.remove('edit')
  }

  markTodo (doneItem) {
    this.remove(doneItem)
    this.createNewTask(doneItem.content)
  }

  remove (doneItem) {
    if (!doneItem) {
      return
    }

    this.doneItems.splice(this.doneItems.indexOf(doneItem), 1)
    this.doneList.removeChild(doneItem.element)
  }

  createNewTask (todoContent = '') {
    let todoItem = new ToDoItem(todoContent)
    this.todoItems.push(todoItem)
    this.todoList.appendChild(todoItem.element)
  }

  createDoneTask (doneContent = '') {
    let doneItem = new DoneItem(doneContent)
    this.doneItems.push(doneItem)
    this.doneList.appendChild(doneItem.element)
  }

  refreshAddTaskButton () {
    this.addTaskButton.disabled = this.addTaskInput.value.length === 0
  }

}

class Item {
  constructor (content) {
    this.element = this.createItem(content)
    this.content = content
  }

  /**
   * Create done item element
   */
  createItem (content) {
    let item = document.createElement('li')

    item.className = 'item'
    item.innerHTML = this.render(content)
    return item
  }

  render (content) {
    return Util.escapeHtml(content)
  }

  refresh (content) {
    this.content = content
    this.element.innerHTML = this.render(content)
  }
}

class ToDoItem extends Item {
  constructor (todoContent) {
    super(todoContent)
    this.element.classList.add('todo-item')
  }

  render (content) {
    return `
      <div class="task-content longest">
        <span>${Util.escapeHtml(content)}</span>
        <input type="text" />
      </div>
      <button class="task-button to-edit">Edit</button>
      <button class="task-button correct to-done">Done</button>
    `
  }
}

class DoneItem extends Item {
  constructor (doneContent) {
    super(doneContent)
    this.element.classList.add('done-item')
  }

  render (content) {
    return `
      <div class="task-content longest">
        <span>${Util.escapeHtml(content)}</span>
      </div>
      <button class="task-button to-undo">Undo</button>
      <button class="task-button correct to-remove">Remove</button>
    `
  }
}

// Bootstrap application
new App(
  document.querySelector('.todoapp-container'),
  ['Buy Milk', 'Go to gym'],
  ['Buy Bread'])