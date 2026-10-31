import { testBase, expect, CommonUI } from "../../utilities/docuport-ui-utilities";
import { LoginPage } from "../../pages/LoginPage";
import { HomePage } from "../../pages/HomePage";
import test from "node:test";

testBase.describe("Login - describe - beforeEach", () => {

      let homePage
      let loginPage 

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
    })

    testBase("Client Login", { tag: "@smoke" }, async ({ page }) => {
        // const loginPage = new LoginPage(page)
        await loginPage.loginAs("client");
        //  const homePage = new HomePage(page)
        await homePage.validatePageFor("client")
    })

    testBase("Advisor Login", { tag: "@smoke" }, async () => {
        // const loginPage = new LoginPage(page)
        await LoginPage.loginAs("advisor");
        // const homePage = new HomePage(page)
        await homePage.validatePageFor("advisor")
    })

})