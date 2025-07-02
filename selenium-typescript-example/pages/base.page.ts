import { By, WebDriver, until } from 'selenium-webdriver';
import { config } from '../config';

export class BasePage {
  constructor(protected driver: WebDriver) {}

  async visit(path?: string) {
    await this.driver.get(`${config.baseUrl}${path}`);
  }

  async click(locator: By) {
    await this.driver.findElement(locator).click();
  }

  async type(locator: By, inputText: string) {
    const element = await this.driver.findElement(locator);
    await element.clear();
    await element.sendKeys(inputText);
  }

  async text(locator: By): Promise<string> {
    return await this.driver.findElement(locator).getText();
  }

  async isVisible(locator: By): Promise<boolean> {
    try {
      await this.driver.wait(until.elementLocated(locator), 5000);
      return true;
    } catch {
      return false;
    }
  }
}
