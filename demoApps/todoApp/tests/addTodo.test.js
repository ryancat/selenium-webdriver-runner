const assert = require('assert')
const TodoApp = require('./pageObjects/TodoAppPage')

describe('Add todo item', function () {
  let isAllTestsPassed = true,
      todoPage
      
  before(async function () {
    todoPage = new TodoApp()
    await todoPage.startDriver({
      testName: this.test.parent.title
    })
  })

  afterEach(async function () {
    isAllTestsPassed = isAllTestsPassed && (this.currentTest.state === 'passed')
  })

  after(async function () {
    await todoPage.quitDriver({
      testName: this.test.parent.title,
      isPassed: isAllTestsPassed
    })
  })

  it('should not add anything when add item content is empty', async function () {
    await todoPage.open()
    const todoItems = await todoPage.getTodoItems()
    const doneItems = await todoPage.getDoneItems()
    await todoPage.clickAddItemButton()
    const currentTodoItems = await todoPage.getTodoItems()
    const currentDoneItems = await todoPage.getDoneItems()

    assert.equal(currentTodoItems.length, todoItems.length)
    assert.equal(currentDoneItems.length, doneItems.length)
  })

  it('should add todo list to todo items when fill in content and click on add item button', async function () {
    const newTodoContent = 'some new todo item'

    await todoPage.open()
    const todoItems = await todoPage.getTodoItems()

    await todoPage
    .pipe(async () => await todoPage.addTodoItemContent(newTodoContent))
    .pipe('clickAddItemButton')
    .done()

    const currentTodoItems = await todoPage.getTodoItems()
    assert.equal(currentTodoItems.length, todoItems.length + 1)
    
    const todoItemContents = await todoPage.getTodoItemContents()
    assert(todoItemContents.indexOf(newTodoContent) >= 0)
  })
})
