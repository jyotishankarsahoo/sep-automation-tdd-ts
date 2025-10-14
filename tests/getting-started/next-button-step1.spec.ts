import { StartApplicationPage } from "../../pages/StartApplicationPage";
import {test, expect} from "../../utilities/sep-test-utilities";

test.describe("Next Button on Start Application Page", () => {
    let startApplicationPage: StartApplicationPage
    test.beforeEach(async ({page}) => {
        startApplicationPage = new StartApplicationPage(page)
    })
    test("Verify user navigates to step two with only valid required fields", async ({page}) => {
        await startApplicationPage.enterFirstName("Jyoti")
        await startApplicationPage.enterLastName("Sahoo");
        await startApplicationPage.enterEmail("jsahoo@apple.com");
        await startApplicationPage.enterPhoneNumber("4083345567");
        await expect(startApplicationPage.nextButton).toBeEnabled()
        await startApplicationPage.clickNextButton()
        await expect(startApplicationPage.startApplicationStepCircle).toHaveCSS(
            "background-color",
            "rgb(172, 245, 138)"
        );
        await expect(startApplicationPage.paymentPlanStepCircle).toHaveCSS(
            "background-color",
            "rgb(1, 201, 255)"
        );
    })
    test("Verify user navigates to step two with valid required fields and optional fields", async ({
        page,
    }) => {
        await startApplicationPage.enterFirstName("Jyoti");
        await startApplicationPage.enterLastName("Sahoo");
        await startApplicationPage.enterEmail("jsahoo@apple.com");
        await startApplicationPage.enterPhoneNumber("4083345567");
        await startApplicationPage.selectHowDidYouHearAboutUs("linkedin");
        await expect(startApplicationPage.nextButton).toBeEnabled();
        await startApplicationPage.clickNextButton();
        await expect(startApplicationPage.startApplicationStepCircle).toHaveCSS(
            "background-color",
            "rgb(172, 245, 138)"
        );
        await expect(startApplicationPage.paymentPlanStepCircle).toHaveCSS(
            "background-color",
            "rgb(1, 201, 255)"
        );
    });
})