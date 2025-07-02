# Selenium WebDriver for Typescript using Page Object Models

Testing React FE using Selenium WebDriver for Typescript with Page Object Models (POM)

## Setup

First, clone the [repository](https://github.com/JakobOpresnik/Selenium-TypeScript-Demo.git) & install the dependencies:

```bash
# clone GitHub repository
git clone https://github.com/JakobOpresnik/Selenium-TypeScript-Demo.git

# install Selenium dependencies
cd selenium_typescript
pnpm install

# install FE dependencies
cd frontend
pnpm install
```

Create `.env` file inside `/selenium_typescript`:

```bash
cd selenium_typescript
touch .env
```

Paste this into the `.env` file you just created:

```env
BROWSER_ENV=true;
BROWSER_NAME=firefox;
```

Run the FE:

```bash
cd frontend
pnpm run dev
```

Specify URL, where FE is running, inside `selenium_typescript/config/index.ts`, like so:

```ts
export const config = {
  baseUrl: 'http://localhost:5173',
};
```

Run Selenium tests with following command(s):

```bash
cd selenium_typescript

# run tests using browser specified in .env file
pnpm run test

# or run tests using chrome headless browser
pnpm run test:chrome

# or run tests using firefox headless browser
pnpm run test:firefox
```

## Folder Structure

```text
.
├── ...
|── config/index.ts             # Test config (base URL etc.)
├── lib/
│     ├── browser.ts            # Builds WebDriver object for tests
|── pages/                      # Page Object Models (POM)
|── reports/                    # Auto-generated report for the tests executed
|── tests/                      # Tests
```

## Learn More

To learn more about Selenium and used libraries, take a look at the following resources:

- Selenium WebDriver &rarr; https://www.selenium.dev/documentation/webdriver/getting_started/
- Selenium WebDriver for JS/TS &rarr; https://www.selenium.dev/selenium/docs/api/javascript/
- Mocha library for running test &rarr; https://mochajs.org/
- Chai library for test expectations/assertions &rarr; https://www.chaijs.com/api/bdd/
