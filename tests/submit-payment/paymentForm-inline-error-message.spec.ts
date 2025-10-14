import { test, expect } from "../../utilities/sep-test-utilities";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";
import { CommonUI } from "../../utilities/sep-test-utilities";
import { PaymentError } from "../../utilities/qa-data-reader";

test.describe("Payment Form Inline Error Message Verification", () => {
    let reviewPaymentPage: ReviewPaymentPage;

    test.beforeEach(async ({ page }) => {
        reviewPaymentPage = new ReviewPaymentPage(page);
        await CommonUI.completeStartApplicationForm(page);
        await CommonUI.completeSelectingPaymentPlan(page, "upfront");
    });

    test("Verify invalid card number error message", async ({ page }) => {
        await reviewPaymentPage.enterCardNumber("1111111111111111");
        await reviewPaymentPage.clickTermsAndConditionsCheckbox();
        await expect(reviewPaymentPage.cardNumberErrorMessage).toHaveText(
            PaymentError.CARD.INVALID_NUMBER
        );
    });
    test("Verify incomplete card number error message", async ({ page }) => {
        await reviewPaymentPage.enterCardNumber("1111111111");
        await reviewPaymentPage.clickTermsAndConditionsCheckbox();
        await expect(reviewPaymentPage.cardNumberErrorMessage).toHaveText(
            PaymentError.CARD.INCOMPLETE_NUMBER
        );
    });
    test("Verify too short CVV number error message", async ({ page }) => {
        await reviewPaymentPage.enterCVC("11");
        await reviewPaymentPage.clickTermsAndConditionsCheckbox();
        await expect(reviewPaymentPage.cardCVCErrorMessage).toHaveText(
            PaymentError.CARD.INCOMPLETE_CVC
        );
    });
    test("Verify past expiration year error message", async ({ page }) => {
        await reviewPaymentPage.enterExpiryDate("11/20");
        await reviewPaymentPage.clickTermsAndConditionsCheckbox();
        await expect(reviewPaymentPage.cardExpiryErrorMessage).toHaveText(
            PaymentError.CARD.PAST_EXPIRY_YEAR
        );
    });
});
