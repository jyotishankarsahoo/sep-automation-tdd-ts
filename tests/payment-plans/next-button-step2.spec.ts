import { test, expect } from "../../utilities/sep-test-utilities";
import { CommonUI } from "../../utilities/sep-test-utilities";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";
import { StartApplicationPage } from "../../pages/StartApplicationPage";

test.describe(
    "Next button on selecting payment page",
    { tag: "@sep20" },
    () => {
        let paymentPlanPage: PaymentPlanPage;
        let startApplicationPage: StartApplicationPage;

        test.beforeEach(async ({ page }) => {
            paymentPlanPage = new PaymentPlanPage(page);
            startApplicationPage = new StartApplicationPage(page);
            await CommonUI.completeStartApplicationForm(
                page,
                "Jyoti",
                "S",
                "jsahoo@example.com",
                "1234567890"
            );
        });

        test("Verify that the next button is displayed", async ({ page }) => {
            await expect(paymentPlanPage.inactiveNextButton).toBeVisible();
        });
        test("Verify that the next button is disabled by default", async ({
            page,
        }) => {
            await expect(paymentPlanPage.inactiveNextButton).toBeDisabled();
        });
        test("Verify clicking on next button navigates to step-3", async ({
            page,
        }) => {
            await paymentPlanPage.selectPaymentPlan("upfront");
            await paymentPlanPage.clickNextButton();
            await expect(
                startApplicationPage.startApplicationStepCircle
            ).toHaveCSS("background-color", "rgb(172, 245, 138)");
            await expect(startApplicationPage.paymentPlanStepCircle).toHaveCSS(
                "background-color",
                "rgb(172, 245, 138)"
            );
            await expect(startApplicationPage.reviewStepCircle).toHaveCSS(
                "background-color",
                "rgb(1, 201, 255)"
            );
        });
    }
);
