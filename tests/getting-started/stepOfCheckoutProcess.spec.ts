import { PaymentPlanPage } from "../../pages/PaymentPlanPage";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { test, expect } from "../../utilities/sep-test-utilities";

test.describe("Verify Check Process Stepper", () => {
    let startApplicationPage: StartApplicationPage;

    test.beforeEach(async ({ page }) => {
        startApplicationPage = new StartApplicationPage(page);
    });

    test("Verify Step Titles for all the steps", async ({ page }) => {
        await expect(startApplicationPage.startApplicationText).toHaveText(
            "Start Application"
        );
        await expect(startApplicationPage.paymentPlanText).toHaveText(
            "Payment plan"
        );
        await expect(startApplicationPage.reviewText).toHaveText("Review");
    });
    test("Verify 'Start Application' stepper circle is in blue.", async ({
        page,
    }) => {
        await expect(startApplicationPage.startApplicationStepCircle).toHaveCSS(
            "background-color",
            "rgb(1, 201, 255)"
        );
    });
    test("Verify 'Payment Plan' & 'Review' stepper circle is in grey.", async ({
        page,
    }) => {
        await expect(startApplicationPage.paymentPlanStepCircle).toHaveCSS(
            "background-color",
            "rgba(0, 0, 0, 0)"
        );
        await expect(startApplicationPage.reviewStepCircle).toHaveCSS(
            "background-color",
            "rgba(0, 0, 0, 0)"
        );
    });
});
