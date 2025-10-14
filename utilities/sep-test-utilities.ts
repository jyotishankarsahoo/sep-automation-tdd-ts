import { Page, test as base, TestInfo, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import path from "path";
import fs from "fs";
import { StartApplicationPage } from "../pages/StartApplicationPage";
import { PaymentPlanPage } from "../pages/PaymentPlanPage";
import { ReviewPaymentPage } from "../pages/ReviewPaymentPage";
import { mockedResponseBody } from "../utilities/qa-data-reader";
//Extends the base test with custom UI setup for SEP application.
export const test = base.extend({
    page: async ({ page }, use: Function, testInfo: TestInfo) => {
        const authToken = Buffer.from(
            `${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`
        ).toString("base64");
        await page.setExtraHTTPHeaders({ Authorization: `Basic ${authToken}` });
        await page.goto(process.env.SEP_QA_URL as string);
        await page.waitForLoadState("networkidle");
        expect(await page.title()).toBe("Checkout | Cydeo");

        BasePage.setPage(page); // Set the page in BasePage for global access

        await use(page); // Use the page in the test functions

        await takeScreenshotIfFailed(page, testInfo); // After the test, take a screenshot if it failed
    },
});

export { expect, test as describe }; // Export commonly used Playwright test functions

export class CommonUI {
    private static startAppPage: StartApplicationPage;
    private static paymentPlanPage: PaymentPlanPage;
    private static reviewPaymentPage: ReviewPaymentPage;

    // Completes the start application form with provided or default user information.
    static async completeStartApplicationForm(
        page: Page,
        firstName: string = "John",
        lastName: string = "Doe",
        email: string = "John.Doe@example.com",
        phoneNumber: string = "123456790"
    ) {
        this.startAppPage = new StartApplicationPage(page);
        await this.startAppPage.enterFirstName(firstName);
        await this.startAppPage.enterLastName(lastName);
        await this.startAppPage.enterEmail(email);
        await this.startAppPage.enterPhoneNumber(phoneNumber);
        await this.startAppPage.selectHowDidYouHearAboutUs("Email");
        await this.startAppPage.clickNextButton();
    }

    // Selects a payment with provided or default payment plan after completing the start application form.
    static async completeSelectingPaymentPlan(
        page: Page,
        paymentPlanType: "upfront" | "installments" = "upfront"
    ) {
        this.paymentPlanPage = new PaymentPlanPage(page);
        await this.paymentPlanPage.selectPaymentPlan(paymentPlanType);
        await this.paymentPlanPage.clickNextButton();
    }

    // Enters credit card info with provided or default card information on the payment review page.
    static async completeEnteringCardInformation(
        page: Page,
        cardNumber: string = process.env.CARD_NUMBER ?? "",
        expirationDate: string = process.env.CARD_EXPIRATION_DATE ?? "12/28",
        cvc: string = process.env.CARD_SECURITY_CODE ?? "123",
        zipCode: string = process.env.ZIP_CODE ?? ""
    ) {
        this.reviewPaymentPage = new ReviewPaymentPage(page);
        await this.reviewPaymentPage.enterCardNumber(cardNumber);
        await this.reviewPaymentPage.enterExpiryDate(expirationDate);
        await this.reviewPaymentPage.enterCVC(cvc);
        await this.reviewPaymentPage.enterZipCode(zipCode);
    }

    static async completePayment(page: Page) {
        this.reviewPaymentPage = new ReviewPaymentPage(page);
        await this.reviewPaymentPage.clickTermsAndConditionsCheckbox();
        const TARGET_URL = "**/v1/payment_intents/*/confirm";
        await page.route(TARGET_URL, async (route) => {
            let request = route.request();
            console.log(`URL: ${request.url()}`);
            console.log(`METHOD: ${request.method()}`);
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                json: mockedResponseBody,
            });
            console.log(`✅ Request to ${route.request().url()} is mocked.`);
        });
        await this.reviewPaymentPage.clickPayButton();
        const MOCKED_RESPONSE = await page.waitForResponse(TARGET_URL);
        console.log(`Response: ${await MOCKED_RESPONSE.body()}`);
    }
}

// Takes a screenshot of the page if the test has failed.
async function takeScreenshotIfFailed(page: Page, testInfo: TestInfo) {
    if (testInfo.status !== "failed") return;

    const screenshotDir = path.join(__dirname, "../screenshots");
    fs.mkdirSync(screenshotDir, { recursive: true });

    const currentDateTime: string = new Date()
        .toISOString()
        .replace(/[:T.]/g, "_")
        .slice(0, -5);
    const screenshotFileName = `${testInfo.title.replace(
        /\s+/g,
        "_"
    )}_failed_${currentDateTime}.png`;
    const screenshotPath = path.join(screenshotDir, screenshotFileName);

    await page.screenshot({ path: screenshotPath, fullPage: true });
}
