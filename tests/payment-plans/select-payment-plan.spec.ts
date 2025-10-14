import { PaymentPlanPage } from "../../pages/PaymentPlanPage";
import { test, expect, CommonUI } from "../../utilities/sep-test-utilities";

test.describe("Selecting Payment plan from options", () => {
    let paymentPlanPage: PaymentPlanPage;
    test.beforeEach(async ({ page }) => {
        paymentPlanPage = new PaymentPlanPage(page);
        await CommonUI.completeStartApplicationForm(page);
    });
    test("Verify Initial Load State: No selection, Next button disabled", async () => {
        await expect(paymentPlanPage.upfrontPaymentFrame).toHaveAttribute(
            "aria-expanded",
            "false"
        );
        await expect(paymentPlanPage.installmentsPaymentFrame).toHaveAttribute(
            "aria-expanded",
            "false"
        );
        await expect(paymentPlanPage.inactiveNextButton).toBeDisabled();
    });
    test("Verify on selecting any option next button is enabled and option is highlighted", async () => {
        await paymentPlanPage.selectPaymentPlan("upfront");
        await expect(paymentPlanPage.upfrontPaymentFrame).toHaveAttribute(
            "aria-expanded",
            "true"
        );
        await expect(paymentPlanPage.installmentsPaymentFrame).toHaveAttribute(
            "aria-expanded",
            "false"
        );
        await expect(paymentPlanPage.activeNextButton).toBeEnabled();
    });
    test("Verify user can change options during payment plan step", async () => {
        await paymentPlanPage.selectPaymentPlan("upfront");
        await expect(paymentPlanPage.upfrontPaymentFrame).toHaveAttribute(
            "aria-expanded",
            "true"
        );
        await expect(paymentPlanPage.installmentsPaymentFrame).toHaveAttribute(
            "aria-expanded",
            "false"
        );
        await paymentPlanPage.selectPaymentPlan("installments");
        await expect(paymentPlanPage.upfrontPaymentFrame).toHaveAttribute(
            "aria-expanded",
            "false"
        );
        await expect(paymentPlanPage.installmentsPaymentFrame).toHaveAttribute(
            "aria-expanded",
            "true"
        );
        await expect(paymentPlanPage.activeNextButton).toBeEnabled();
    });
});
