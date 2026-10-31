import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { HomePage } from '../../pages/HomePage'
import { testBase, CommonUI, testLoggedIn } from '../../utilities/docuport-ui-utilities'

test('Test 1 - Login with hard coded value without POM', { tag: "@test1" }, async ({ page }) => {

    await page.goto('https://beta.docuport.app/login')
    await page.getByRole('textbox', { name: 'Username or email' }).fill("b1g2_client@gmail.com")
    await page.getByRole('textbox', { name: 'Password' }).fill("Group2")
    await page.getByRole('button', { name: 'Log in' }).click()
    await page.getByRole('button', { name: 'Continue' }).click()
    expect(page.getByRole('link', { name: 'Docuport' })).toBeVisible()
})

test('Test 2 - Login with hard coded value with POM', { tag: "@test2" }, async ({ page }) => {

    // Create a login page object to be able to use members (variables, methods of that page)
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page)

    await page.goto('https://beta.docuport.app/login')
    await loginPage.enterUserName("b1g2_client@gmail.com")
    await loginPage.enterPassword("Group2");
    await loginPage.clickLoginButton();
    await homePage.clickContinueButton();
    await expect(homePage.profileIconButton).toBeVisible();

})

test('Test 3 - Login with hard coded value with POM with single login method', { tag: "@test3" }, async ({ page }) => {

    // Create a login page object to be able to use members (variables, methods of that page)
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page)

    await page.goto('https://beta.docuport.app/login')
    /* await loginPage.enterUserName("b1g2_client@gmail.com")
   await loginPage.enterPassword("Group2");
   await loginPage.clickLoginButton(); */

    await loginPage.login("b1g2_client@gmail.com", "Group2")
    await homePage.clickContinueButton();
    await expect(homePage.profileIconButton).toBeVisible();

})

// Storing data in JS object - works with KEY and VALUE
const credentials = {
    // KEY: "VALUE"
    username: "b1g2_client@gmail.com",
    password: "Group2"
}

test('Test 4 - Login with data from JS Object', { tag: "@test4" }, async ({ page }) => {

    // Create a login page object to be able to use members (variables, methods of that page)
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await page.goto('https://beta.docuport.app/login')
    await loginPage.enterUsername(credentials.username)
    await loginPage.enterPassword(credentials.password);
    await loginPage.clickLoginButton();
    await homePage.clickContinueButton();
    await expect(homePage.profileIconButton).toBeVisible();
})


test('Test 5 - Login as given user type', { tag: "@test5" }, async ({ page }) => {

    // Create a login page object to be able to use members (variables, methods of that page)
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page)

    await loginPage.navigateToLoginPage()
    //await loginPage.login(credentials.username,credentials.password);
    // ! storing the creadentials in settings.json -> SHIFT + COMMAND + P
    await loginPage.loginAs("Advisor");
    // await homePage.clickContinueButton();
    await expect(homePage.profileIconButton).toBeVisible();

    await homePage.validatePageFor("Advisor")
})

// In terms of ROLE: what is my test data - Advisor, Client, Supervisor, Employee
test('Test 6 - Login as any given user type', { tag: '@test6' }, async ({ page }) => {
    // Create a login page object to be able to use members (variables, methods) of that page
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    //await page.goto('https://beta.docuport.app/login');
    await loginPage.navigateToLoginPage();

    //await loginPage.login(credentials.username, credentials.password); 
    // ! storing the credentials in data package -> beta_data.json -> easy to maintain
    await loginPage.loginAs("Client");
    await homePage.clickContinueButton();
    await expect(homePage.profileIconButton).toBeVisible();
    await page.waitForTimeout(2000);
})

test('Test 7 - Login as any given user type', { tag: '@test7' }, async ({ page }) => {
    await page.waitForTimeout(2000);
})

testBase('Test 8 - Each role', { tag: '@test8' }, async ({ page }) => {
    await page.waitForTimeout(2000);
})

testLoggedIn('Test 9 - Client starts already logged in', { tag: '@test9' }, async ({ loggedInPage }) => {
    const homePage = new HomePage(loggedInPage);
    expect(homePage.profileIconButton).toBeVisible()
})

// There are multiple tests that is all about 'advisor' role
testLoggedIn.describe("Advisor role related tests", () => {
    // This following line of a code, has to be declared only ONE time
    testLoggedIn.use({ role: "advisor" })

    testLoggedIn('Test 10 - Advisor starts already logged in.......', { tag: '@test10' }, async ({ loggedInPage }) => {
        const homePage = new HomePage(loggedInPage)
        await expect(homePage.profileIconButton).toBeVisible();
    })
    // * Multiple different test can be created inside of this describe but all of the tests will be be logging. in as advisor

    testLoggedIn('Test 11 - Advisor starts already logged in.......', { tag: '@test11' }, async ({ loggedInPage }) => {
        const homePage = new HomePage(loggedInPage)
        await homePage.validatePageFor("advisor")
    })
})

const invalidLogins = [
    { username: "invalid@gmail.com", password: "invalid123!", message: "Username or password is incorrect" },
    { username: "", password: "invalid123!", message: "Please enter your username or email adress" },
    { username: "invalid@gmail.com", password: "", message: "Please enter your password" },
    { username: "", password: "", message: "Username or password is incorrect" }

];

for (const eachRow of invalidLogins) {
    testBase(`Test 12 - Invalid login for ${eachRow.username} and ${eachRow.password})`, { tag: '@test12' }, async ({ page }) => {
        const loginPage = new LoginPage(page)
        loginPage.login(eachRow.username, eachRow.password);
        await loginPage.verifyInvalidLoginMessage(eachRow.message)
    })
}

for (const eachRow of appInfo.invalidLogins) {
    testBase(`Test 13 - Invalid login for ${eachRow.username} and ${eachRow.password})`, { tag: '@test13' }, async ({ page }) => {
        const loginPage = new LoginPage(page)
        loginPage.login(eachRow.username, eachRow.password);
        await loginPage.verifyInvalidLoginMessage(eachRow.message)
    })
}