import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { productInfo } from "../../utilities/qa-data-reader";
import { test, expect, CommonUI } from "../../utilities/sep-test-utilities";
import { readFileSync } from "fs";
import * as path from "path";

test.describe("Payment flow completion", () => {
    let startApplicationPage: StartApplicationPage;
    const mockedResponseBody = JSON.parse(
        readFileSync(
            path.join(__dirname, "../../data/mock_payment_confirmation.json"),
            "utf8"
        )
    );
    test.beforeEach(async ({ page }) => {
        startApplicationPage = new StartApplicationPage(page);
        await CommonUI.completeStartApplicationForm(page);
        await CommonUI.completeSelectingPaymentPlan(page);
        await CommonUI.completeEnteringCardInformation(page);
    });
    test("Verify user navigates to confirmation screen on clicking on pay button", async ({
        page,
    }) => {
        await CommonUI.completePayment(page, mockedResponseBody);
        const actualProgramName = productInfo.programName;
        await expect(
            page.locator("span").filter({ hasText: actualProgramName })
        ).toBeVisible();
    });
    test("Verify stepper circle state post payment", async ({ page }) => {
        await CommonUI.completePayment(page, mockedResponseBody);
        expect(startApplicationPage.startApplicationStepCircle).toHaveCSS(
            "background-color",
            "rgb(172, 245, 138)"
        );
        expect(startApplicationPage.paymentPlanStepCircle).toHaveCSS(
            "background-color",
            "rgb(172, 245, 138)"
        );
        expect(startApplicationPage.reviewStepCircle).toHaveCSS(
            "background-color",
            "rgb(172, 245, 138)"
        );
    });
    test("Verify program name, user email and company contact ", async ({
        page,
    }) => {
        await CommonUI.completePayment(page, mockedResponseBody);
        const actualProgramName = productInfo.programName;
        const actualEmail = await page
            .locator("div.payment-confirmation")
            .locator("u")
            .innerText();
        const footerTextLocator = page.locator("p.footer-text").last();
        await expect(
            page.locator("span").filter({ hasText: actualProgramName })
        ).toBeVisible();
        expect(actualEmail).toEqual("John.Doe@example.com.");
        await expect(footerTextLocator).toHaveText(
            "Need help? Contact us at enrollment@cydeo.com"
        );
    });
});
