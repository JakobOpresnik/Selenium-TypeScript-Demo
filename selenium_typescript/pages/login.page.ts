import { By, WebDriver } from 'selenium-webdriver';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  constructor(driver: WebDriver) {
    super(driver);
  }

  async visitLogin() {
    await this.visit('/');
  }

  async getHeading(): Promise<string> {
    return await this.text(By.css('h1'));
  }

  async isNameInputPresent(): Promise<boolean> {
    return this.isVisible(By.id('name'));
  }

  async isAgeInputPresent(): Promise<boolean> {
    return this.isVisible(By.id('age'));
  }

  async isSubmitButtonPresent(): Promise<boolean> {
    return this.isVisible(By.css('button[type="submit"]'));
  }

  async getSubmitButtonText(): Promise<string> {
    return this.text(By.css('button[type="submit"]'));
  }

  async fillName(name: string) {
    await this.type(By.id('name'), name);
  }

  async fillAge(age: string) {
    await this.type(By.id('age'), age);
  }

  async fillForm(name: string, age: string) {
    await this.fillName(name);
    await this.fillAge(age);
  }

  async submitForm() {
    await this.click(By.css('button[type="submit"]'));
  }

  async getNameErrorText(): Promise<string> {
    return this.text(By.xpath("//*[text()='Name is required!']"));
  }

  async getAgeErrortext(): Promise<string> {
    return this.text(By.xpath("//*[text()='Age must be a positive number!']"));
  }

  async isNameErrorVisible(): Promise<boolean> {
    return this.isVisible(By.xpath("//*[text()='Name is required!']"));
  }

  async isAgeErrorVisible(): Promise<boolean> {
    return this.isVisible(
      By.xpath("//*[text()='Age must be a positive number!']"),
    );
  }

  async patchWindowAlertCapture() {
    await this.driver.executeScript(`
      window.alertCalled = false;
      window.alertMessage = null;
      window.alert = function(msg) {
        window.alertCalled = true;
        window.alertMessage = msg;
      };
    `);
  }

  async wasAlertCalled(): Promise<boolean> {
    return this.driver.executeScript('return window.alertCalled');
  }

  async getAlertMessage(): Promise<string> {
    return this.driver.executeScript('return window.alertMessage');
  }

  async goToTodoList() {
    await this.visit('/todolist');
  }
}
