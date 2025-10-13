import { test, expect } from "../../utilities/sep-test-utilities";
import { CommonUI } from "../../utilities/sep-test-utilities";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";

test.describe("Pay button on review payment page", () => {
    let reviewPaymentPage: ReviewPaymentPage;

    test.beforeEach(async ({ page }) => {
        reviewPaymentPage = new ReviewPaymentPage(page);
        await CommonUI.completeStartApplicationForm(page);
        await CommonUI.completeSelectingPaymentPlan(page, "upfront");
    });

    test("Verify that the pay button is displayed and disabled by default", async ({
        page,
    }) => {
        await expect(reviewPaymentPage.payButton).toBeVisible();
        await expect(reviewPaymentPage.payButton).toBeDisabled();
    });

    test("Verify that the T&C checkbox is unchecked by default", async ({
        page,
    }) => {
        await expect(
            reviewPaymentPage.termsAndConditionsCheckBox
        ).not.toBeChecked();
    });
    test("Verify pay button enables on clicking t&c Check Box", async ({
        page,
    }) => {
        await reviewPaymentPage.clickTermsAndConditionsCheckbox();
        await expect(reviewPaymentPage.payButton).toBeEnabled();
    });
});
