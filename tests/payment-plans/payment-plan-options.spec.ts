import { PaymentPlanPage } from "../../pages/PaymentPlanPage";
import { productInfo } from "../../utilities/qa-data-reader";
import { test, expect, CommonUI } from "../../utilities/sep-test-utilities";

test.describe("Payment Plan Option Validation", () => {
    let paymentPlanPage: PaymentPlanPage;
    test.beforeEach(async ({ page }) => {
        paymentPlanPage = new PaymentPlanPage(page);
        await CommonUI.completeStartApplicationForm(page);
    });
    test("Upfront Plan verification", async () => {
        const UPFRONT_PRODUCT_INFO = productInfo.prices?.[0];
        const BASE_AMOUNT = UPFRONT_PRODUCT_INFO?.baseAmount ?? 0;
        const UPFRONT_DISCOUNT =
            UPFRONT_PRODUCT_INFO?.upfrontDiscountAmount ?? 0;
        const EXPECTED_UPFRONT_PRICE = BASE_AMOUNT - UPFRONT_DISCOUNT;

        await expect(paymentPlanPage.upfrontPaymentOption).toBeVisible();
        await expect(paymentPlanPage.upfrontPaymentOption).toHaveText(
            "Upfront"
        );
        await expect(paymentPlanPage.upfrontPaymentAmount).toBeVisible();
        await expect(paymentPlanPage.upfrontPaymentAmount).toHaveText(
            `$${EXPECTED_UPFRONT_PRICE} pay once`
        );
    });
    test("Installment Plan verification", async () => {
        const INSTALLMENT_PRODUCT_INFO = productInfo.prices?.[1];
        const EXPECTED_NUMBER_OF_INSTALLMENTS =
            INSTALLMENT_PRODUCT_INFO?.numberOfInstallments ?? 1;
        const BASE_AMOUNT = INSTALLMENT_PRODUCT_INFO?.baseAmount ?? 0;
        const EXPECTED_PRICE_PER_INSTALLMENTS =
            BASE_AMOUNT / EXPECTED_NUMBER_OF_INSTALLMENTS;

        await expect(paymentPlanPage.installmentsPaymentOption).toBeVisible();
        await expect(paymentPlanPage.installmentsPaymentAmount).toBeVisible();
        await expect(paymentPlanPage.perMonthTextInstallments).toBeVisible();

        await expect(paymentPlanPage.installmentsPaymentOption).toHaveText(
            `${EXPECTED_NUMBER_OF_INSTALLMENTS} Installments`
        );
        await expect(paymentPlanPage.perMonthTextInstallments).toHaveText(
            `$${EXPECTED_PRICE_PER_INSTALLMENTS} per month`
        );
    });
});
