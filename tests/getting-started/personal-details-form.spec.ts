import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { test, expect } from "../../utilities/sep-test-utilities";

test.describe("Personal Details Form Validation", () => {
    let startApplicationPage: StartApplicationPage;
    test.beforeEach(async ({ page }) => {
        startApplicationPage = new StartApplicationPage(page);
    });
    test("Verify FirstName, Last Name, email Field Presence", async ({
        page,
    }) => {
        await expect(startApplicationPage.firstNameInputBox).toBeVisible();
        await expect(startApplicationPage.lastNameInputBox).toBeVisible();
        await expect(startApplicationPage.emailInputBox).toBeVisible();
    });
    test("Verify Email Address Field input type", async ({ page }) => {
        await startApplicationPage.enterFirstName("Jyoti");
        await startApplicationPage.enterLastName("Sahoo");
        await startApplicationPage.enterEmail("jyoti86.com");
        await startApplicationPage.enterPhoneNumber("4083345567");
        await startApplicationPage.clickNextButton();
        await expect(startApplicationPage.startApplicationStepCircle).toHaveCSS(
            "background-color",
            "rgb(1, 201, 255)"
        );
    });
    test("Verify Phone Number Field", async ({ page }) => {
        await expect(startApplicationPage.phoneNumberInputBox).toBeVisible();
        await startApplicationPage.enterPhoneNumber("abcdef");
        await startApplicationPage.enterFirstName("Jyoti");
        await expect(startApplicationPage.phoneNumberLabel).toHaveCSS(
            "color",
            "rgb(255, 0, 0)"
        );
        await expect(
            startApplicationPage.phoneNumberRequiredMarker
        ).toBeVisible();
    });
});
