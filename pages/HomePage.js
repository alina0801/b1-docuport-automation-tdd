import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class HomePage extends BasePage {

    // ! Since we are extending BasePage, we do not need the construtor to initialize the Elements, we can call locator() method in BasePage 
    // ! Since there INHERITANCE and no constructor in Child, it will use PARENT class constructor
    /*
    constructor (page) {
        this.page = page; 

        // LOCATORS for HOMEPAGE 
        this.homeContiueButton = this.page.locator("//span[text()=' Continue ']"); 
        this.profileIconButton = this.page.locator("//div[@class='v-avatar primary']"); 
         // TODO: HOMEWORK - > Locate all the other elements in LoginPage
    }
    */

    homeContiueButton = this.locator("//span[text()=' Continue ']");
    profileIconButton = this.locator("//div[@class='v-avatar primary']");
    selfOption = this.page.getByRole('menuitem', { name: 'Profile' });
    leftMenuItems = this.locator("")

    async clickContinueButton() {
        await this.homeContiueButton.click();
    }

    async validatePageFor(role) {
        await this.profileIconButton.click()
        await this.selfOption.click()
        const roleElement = this.page.getByText(role, { exact: true });
        const actualText = await roleElement.innerText();
        //this is the line where it is validated
        await expect(actualText.toLowerCase()).toBe(role.toLowerCase());
    }

    async getLeftMenuItems(){
        const texts = await this.leftMenuItems.allInnerText();
    }
}