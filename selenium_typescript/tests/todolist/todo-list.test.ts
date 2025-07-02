import { Builder, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it, before, after } from 'mocha';
import { TodoListPage } from '../../pages/todo_list.page';
import dotenv from 'dotenv';

dotenv.config();

describe('Todo List Page', function () {
  let driver: WebDriver;
  let todoListPage: TodoListPage;

  this.timeout(20000);

  before(async () => {
    driver = await new Builder().forBrowser(process.env.BROWSER_NAME).build();
    todoListPage = new TodoListPage(driver);
    await todoListPage.visitTodoList();
  });

  after(async () => {
    await driver.quit();
  });

  it('renders the heading', async () => {
    const heading = await todoListPage.getHeading();
    expect(heading).to.equal('Todo List');
  });

  it('has an input for new todos and a button to add', async () => {
    const isInputPresent: boolean = await todoListPage.isInputPresent();
    const isAddButtonPresent: boolean = await todoListPage.isAddButtonPresent();
    expect(isInputPresent).to.be.true;
    expect(isAddButtonPresent).to.be.true;
  });

  it('adds a new todo to the list', async () => {
    await todoListPage.addTodo('Write Selenium tests');
    const todos: string[] = await todoListPage.getAllTodos();
    const lastTodoText: string = todos[todos.length - 1];
    expect(lastTodoText.toLowerCase()).to.include('write selenium tests');
  });

  it('can delete a todo', async () => {
    await todoListPage.addTodo('Task to delete');
    await todoListPage.deleteLastTodo();

    const todosText: string[] = await todoListPage.getAllTodos();
    expect(todosText.some((text) => text.includes('Task to delete'))).to.be
      .false;
  });
});
