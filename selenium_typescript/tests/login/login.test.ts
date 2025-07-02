import { Builder, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it, beforeEach, before, afterEach, after } from 'mocha';
import { LoginPage } from '../../pages/login.page';
import dotenv from 'dotenv';

dotenv.config();

describe('Login Page', function () {
  let driver: WebDriver;
  let loginPage: LoginPage;

  this.timeout(20000);

  context('Basic Page Components', function () {
    before(async function () {
      driver = await new Builder().forBrowser(process.env.BROWSER_NAME).build();
      loginPage = new LoginPage(driver);
      await loginPage.visitLogin();
    });

    after(async function () {
      await driver.quit();
    });

    it('displays heading "Login"', async function () {
      const heading = await loginPage.getHeading();
      expect(heading).to.equal('Login');
    });

    it('has a name input field', async function () {
      const isNameInputPresent: boolean = await loginPage.isNameInputPresent();
      expect(isNameInputPresent).to.be.true;
    });

    it('has an age input field', async function () {
      const isAgeInputPresent: boolean = await loginPage.isAgeInputPresent();
      expect(isAgeInputPresent).to.be.true;
    });

    it('has a submit button', async function () {
      const isSubmitButtonPresent: boolean =
        await loginPage.isSubmitButtonPresent();
      expect(isSubmitButtonPresent).to.be.true;

      const text = await loginPage.getSubmitButtonText();
      expect(text.toLowerCase()).to.include('submit');
    });

    it('navigates to todo list', async function () {
      await loginPage.goToTodoList();
      const heading = await loginPage.getHeading();
      expect(heading.toLowerCase()).to.equal('todo list');
    });
  });

  context('Form Validation', function () {
    beforeEach(async function () {
      driver = await new Builder().forBrowser(process.env.BROWSER_NAME).build();
      loginPage = new LoginPage(driver);
      await loginPage.visitLogin();
    });

    afterEach(async function () {
      await driver.quit();
    });

    it('shows error when both fields are empty', async function () {
      await loginPage.submitForm();
      const nameError: boolean = await loginPage.isNameErrorVisible();
      const ageError: boolean = await loginPage.isAgeErrorVisible();
      expect(nameError).to.be.true;
      expect(ageError).to.be.true;
    });

    it('shows error when age is zero or negative', async function () {
      await loginPage.fillForm('Test User', '-1');
      await loginPage.submitForm();
      const ageError: boolean = await loginPage.isAgeErrorVisible();
      expect(ageError).to.be.true;
    });

    it('does NOT show alert if form is invalid', async function () {
      await loginPage.patchWindowAlertCapture();

      // submit empty form
      await loginPage.submitForm();
      const alertCancelled: boolean = await loginPage.wasAlertCalled();
      expect(alertCancelled).to.be.false;
    });

    it('shows alert with correct data when form is valid', async function () {
      await loginPage.patchWindowAlertCapture();
      await loginPage.fillForm('Bob', '25');

      // submit valid form
      await loginPage.submitForm();
      await driver.wait(async () => {
        return await loginPage.wasAlertCalled();
      }, 2000);

      const alertMessage: string = await loginPage.getAlertMessage();
      expect(alertMessage).to.equal('Name: Bob, Age: 25');
    });
  });
});
