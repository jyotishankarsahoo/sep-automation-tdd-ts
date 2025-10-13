import { test, expect } from "../../utilities/sep-test-utilities";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";
import { CommonUI } from "../../utilities/sep-test-utilities";

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
        const ACTUAL_INVALID_ERROR =
            await reviewPaymentPage.cardNumberErrorMessage.innerText();
        const EXPECTED_INVALID_ERROR = "Your card number is invalid.";
        expect(ACTUAL_INVALID_ERROR).toEqual(EXPECTED_INVALID_ERROR);
    });
    test("Verify incomplete card number error message", async ({ page }) => {
        await reviewPaymentPage.enterCardNumber("1111111111");
        await reviewPaymentPage.clickTermsAndConditionsCheckbox();
        const ACTUAL_INCOMPLETE_ERROR =
            await reviewPaymentPage.cardNumberErrorMessage.innerText();
        const EXPECTED_INCOMPLETE_ERROR = "Your card number is incomplete.";
        expect(ACTUAL_INCOMPLETE_ERROR).toEqual(EXPECTED_INCOMPLETE_ERROR);
    });
    test("Verify too short CVV number error message", async ({ page }) => {
        await reviewPaymentPage.enterCVC("11");
        await reviewPaymentPage.clickTermsAndConditionsCheckbox();
        const ACTUAL_INLINE_ERROR =
            await reviewPaymentPage.cardCVCErrorMessage.innerText();
        const EXPECTED_INLINE_ERROR =
            "Your card’s security code is incomplete.";
        expect(ACTUAL_INLINE_ERROR).toEqual(EXPECTED_INLINE_ERROR);
    });
    test("Verify past expiration year error message", async ({ page }) => {
        await reviewPaymentPage.enterExpiryDate("11/20");
        await reviewPaymentPage.clickTermsAndConditionsCheckbox();
        const ACTUAL_PAST_YEAR_ERROR =
            await reviewPaymentPage.cardExpiryErrorMessage.innerText();
        const EXPECTED_PAST_YEAR_ERROR =
            "Your card’s expiration year is in the past.";
        expect(ACTUAL_PAST_YEAR_ERROR).toEqual(EXPECTED_PAST_YEAR_ERROR);
    });
});
