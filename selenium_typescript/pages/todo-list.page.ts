import { By, WebDriver } from 'selenium-webdriver';
import { BasePage } from './base.page';

export class TodoListPage extends BasePage {
  constructor(driver: WebDriver) {
    super(driver);
  }

  async visitTodoList() {
    await this.visit('/todolist');
  }

  async getHeading(): Promise<string> {
    return await this.text(By.css('h1'));
  }

  async isAddButtonPresent(): Promise<boolean> {
    return this.isVisible(By.id('add-todo'));
  }

  async isInputPresent(): Promise<boolean> {
    return this.isVisible(By.id('todo-input'));
  }

  async isRemoveButtonPresent(): Promise<boolean> {
    return this.isVisible(By.css('ul li:last-child button'));
  }

  async addTodo(text: string) {
    await this.type(By.id('todo-input'), text);
    await this.click(By.id('add-todo'));
  }

  async deleteLastTodo() {
    const deleteButton = By.css('ul li:last-child button');
    await this.click(deleteButton);
  }

  async getLastTodoText(): Promise<string> {
    return await this.text(By.css('ul li:last-child button'));
  }

  async getAllTodos(): Promise<string[]> {
    const todos = await this.driver.findElements(By.css('ul li'));
    return await Promise.all(todos.map((todo) => todo.getText()));
  }
}
