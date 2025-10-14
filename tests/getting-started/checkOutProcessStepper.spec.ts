import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { test, expect } from "../../utilities/sep-test-utilities";

test.describe("Checkout Process Stepper Circle Validation", () => {
    let startApplicationPage: StartApplicationPage;
    test.beforeEach(async ({ page }) => {
        startApplicationPage = new StartApplicationPage(page);
    });
    test("Verify Step title for checkout process", async ({ page }) => {
        const expectedStepTitles = {
            stepOne: "Start Application",
            stepTwo: "Payment plan",
            stepThree: "Review",
        };
        await expect(startApplicationPage.startApplicationText).toHaveText(
            expectedStepTitles.stepOne
        );
        await expect(startApplicationPage.paymentPlanText).toHaveText(
            expectedStepTitles.stepTwo
        );
        await expect(startApplicationPage.reviewText).toHaveText(
            expectedStepTitles.stepThree
        );
    });
    test("Verify Stepper circle for checkout process", async ({ page }) => {
        const expectedColors = {
            activeBlue: "rgb(1, 201, 255)",
            inactiveGrey: "rgba(0, 0, 0, 0)",
        };
        await expect(startApplicationPage.startApplicationStepCircle).toHaveCSS(
            "background-color",
            expectedColors.activeBlue
        );
        await expect(startApplicationPage.paymentPlanStepCircle).toHaveCSS(
            "background-color",
            expectedColors.inactiveGrey
        );
        await expect(startApplicationPage.reviewStepCircle).toHaveCSS(
            "background-color",
            expectedColors.inactiveGrey
        );
    });
});
