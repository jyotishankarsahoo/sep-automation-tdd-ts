import { LeftMainPage } from "../../pages/LeftMainPage";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { test, expect } from "../../utilities/sep-test-utilities";

test.describe("Product Info Validation", () => {
    let startApplicationPage: StartApplicationPage;
    let leftMainPage: LeftMainPage;
    test.beforeEach(async ({ page }) => {
        startApplicationPage = new StartApplicationPage(page);
        leftMainPage = new LeftMainPage(page);
    });
    test("Verify Product name on product info card", async () => {
        await expect(startApplicationPage.programNameOnInfoCard).toBeVisible();
        let productNameOnLeftMainPage =
            await leftMainPage.programName.innerText();
        let productNameOnProductInfoCard =
            await startApplicationPage.programNameOnInfoCard.innerText();
        expect(productNameOnLeftMainPage).toEqual(productNameOnProductInfoCard);
    });
    test("Verify Product price, start date and flexible payment plan is displayed", async () => {
        await expect(startApplicationPage.programPrice).toBeVisible();
        await expect(
            startApplicationPage.flexiblePaymentsPlanAvailableText
        ).toBeVisible();
        await expect(startApplicationPage.programStartDate).toBeVisible();
    });
    test("Verify Product return policy and final return date", async () => {
        await expect(startApplicationPage.refundEndDate).toBeVisible();
        await expect(startApplicationPage.refundPolicyText).toBeVisible();
    });
});
