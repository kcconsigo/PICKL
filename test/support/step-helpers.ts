import {
  Given as CucumberGiven,
  Then as CucumberThen,
  When as CucumberWhen,
} from '@cucumber/cucumber'
import { Page } from '@playwright/test'
import { ICustomWorld } from './world.js'

/**
 * Gets the Playwright Page instance from the Cucumber World.
 * Throws an error if the page is not initialized.
 *
 * This helper eliminates the repetitive boilerplate pattern:
 * ```typescript
 * if (!this.page) {
 *   throw new Error('Page is not initialized')
 * }
 * ```
 *
 * @param world - The Cucumber World instance containing the page
 * @returns The Playwright Page instance
 * @throws {Error} When the page is not initialized
 *
 * @example
 * ```typescript
 * Given('I am on the login page', async function (this: ICustomWorld) {
 *   const page = getPage(this)
 *   const loginPage = new LoginPage(page)
 *   await loginPage.goto()
 * })
 * ```
 */
export function getPage(world: ICustomWorld): Page {
  if (!world.page) {
    throw new Error('Page is not initialized. Ensure the browser is launched in Before hook.')
  }
  return world.page
}

/**
 * Gets a page object instance with the page automatically retrieved from the World.
 * This helper combines getPage() with page object instantiation for even cleaner code.
 *
 * @param world - The Cucumber World instance containing the page
 * @param PageClass - The page object class constructor
 * @returns An instance of the page object
 * @throws {Error} When the page is not initialized
 *
 * @example
 * ```typescript
 * Given('I am on the login page', async function (this: ICustomWorld) {
 *   const loginPage = getPageObject(this, LoginPage)
 *   await loginPage.goto()
 * })
 * ```
 */
export function getPageObject<T>(world: ICustomWorld, PageClass: new (page: Page) => T): T {
  const page = getPage(world)
  return new PageClass(page)
}

/**
 * Typed wrapper for Cucumber's Given step definition.
 * Automatically types `this` as ICustomWorld, eliminating the need for explicit typing.
 *
 * @param pattern - The Gherkin step pattern (string or regex)
 * @param implementation - The step implementation function with typed `this` context
 *
 * @example
 * ```typescript
 * // Before: Had to explicitly type `this`
 * Given('I am on the login page', async function (this: ICustomWorld) { ... })
 *
 * // After: `this` is automatically typed
 * Given('I am on the login page', async function () {
 *   const loginPage = getPageObject(this, LoginPage)
 *   await loginPage.goto()
 * })
 * ```
 */
export function Given(
  pattern: string | RegExp,
  implementation: (this: ICustomWorld, ...args: any[]) => Promise<void>,
): void {
  CucumberGiven(pattern, implementation)
}

/**
 * Typed wrapper for Cucumber's When step definition.
 * Automatically types `this` as ICustomWorld, eliminating the need for explicit typing.
 *
 * @param pattern - The Gherkin step pattern (string or regex)
 * @param implementation - The step implementation function with typed `this` context
 *
 * @example
 * ```typescript
 * // Before: Had to explicitly type `this`
 * When('I enter username {string}', async function (this: ICustomWorld, username: string) { ... })
 *
 * // After: `this` is automatically typed
 * When('I enter username {string}', async function (username: string) {
 *   const loginPage = getPageObject(this, LoginPage)
 *   await loginPage.enterUsername(username)
 * })
 * ```
 */
export function When(
  pattern: string | RegExp,
  implementation: (this: ICustomWorld, ...args: any[]) => Promise<void>,
): void {
  CucumberWhen(pattern, implementation)
}

/**
 * Typed wrapper for Cucumber's Then step definition.
 * Automatically types `this` as ICustomWorld, eliminating the need for explicit typing.
 *
 * @param pattern - The Gherkin step pattern (string or regex)
 * @param implementation - The step implementation function with typed `this` context
 *
 * @example
 * ```typescript
 * // Before: Had to explicitly type `this`
 * Then('I should see a message {string}', async function (this: ICustomWorld, message: string) { ... })
 *
 * // After: `this` is automatically typed
 * Then('I should see a message {string}', async function (message: string) {
 *   const loginPage = getPageObject(this, LoginPage)
 *   const flashMessage = await loginPage.getFlashMessage()
 *   expect(flashMessage).toContain(message)
 * })
 * ```
 */
export function Then(
  pattern: string | RegExp,
  implementation: (this: ICustomWorld, ...args: any[]) => Promise<void>,
): void {
  CucumberThen(pattern, implementation)
}
