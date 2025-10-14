import { LeftMainPage } from "../../pages/LeftMainPage";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { test, expect } from "../../utilities/sep-test-utilities";

test.describe("Product Landing Page Tests", () => {
    let startApplicationPage: StartApplicationPage;
    let leftMainPage: LeftMainPage;
    test.beforeEach(async ({ page }) => {
        startApplicationPage = new StartApplicationPage(page);
        leftMainPage = new LeftMainPage(page);
    });
    test("Verify checkout header and program text", async () => {
        await expect(leftMainPage.secureCheckout).toBeVisible();
        await expect(leftMainPage.programName).toBeVisible();
        await expect(leftMainPage.secureCheckout).toHaveText("Secure checkout");
        await expect(leftMainPage.programName).toHaveText(
            "Test Automation with Selenium"
        );
    });
    test("Verify Footer and links", async () => {
        let allFooterElements = await leftMainPage.footerElements.all();
        for (let element of allFooterElements) {
            await expect(element).toBeVisible();
            await expect(element).toBeEnabled();
        }
        const EXPECTED_FOOTER_TITLES = [
            "Terms and conditions",
            "Privacy Policy",
            "Disclaimer",
            "Cookie Policy",
        ];
        const ACTUAL_FOOTER_TITLES =
            await leftMainPage.footerElements.allTextContents();
        expect(ACTUAL_FOOTER_TITLES).toEqual(EXPECTED_FOOTER_TITLES);
    });
});
