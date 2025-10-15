import { BasePage } from "./BasePage";
import { Locator } from "playwright";

export class PaymentPlanPage extends BasePage {
    public readonly chooseAPaymentPlanText: Locator = this.locator(
        "//*[text()='Choose a payment plan']"
    );

    public readonly upfrontPaymentOption: Locator = this.locator(
        "//span[@class='payment-type'][contains(text(),'Upfront')]"
    );

    public readonly upfrontPaymentAmount: Locator = this.locator(
        "//span[@class='discount-price']"
    );

    public readonly payOnceTextUpFront: Locator = this.locator(
        "//span[@class='discount-price']/span"
    );

    public readonly upfrontPaymentFrame: Locator = this.locator(
        "(//mat-expansion-panel-header[@role='button'])[1]"
    );

    public readonly greenBadgeUpfrontDiscount: Locator = this.locator(
        "//span[@class='chip-content']"
    );

    public readonly greenBadgeElectricBoltUpfrontDiscount: Locator =
        this.locator(
            "//span[@class='chip-content']/span[@class='material-symbols-outlined light-icon']"
        );

    public readonly greenBadgeTextUpfrontDiscount: Locator = this.locator(
        "//span[@class='chip-content']"
    );

    public readonly couponAvailableBadgeUpfrontDiscount: Locator = this.locator(
        "//mat-chip[contains(@class, 'coupon-badge')]"
    );

    public readonly couponBoxCloseBtnX: Locator = this.locator(
        '//*[@id="cdk-accordion-child-0"]/div/div/div[3]/mat-form-field/div[1]/div[2]/div[2]/button/span[3]'
    );

    public readonly basePriceTextUnderUpfront: Locator = this.locator(
        "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Base price')]"
    );

    public readonly basePriceAmountUnderUpfront: Locator = this.locator(
        "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Base price')]/following-sibling::span"
    );

    public readonly upfrontDiscountTextUnderUpfront: Locator = this.locator(
        "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Upfront')]"
    );

    public readonly upfrontDiscountAmountUnderUpfront: Locator = this.locator(
        "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Upfront')]/following-sibling::span"
    );

    public readonly iHaveAPromoCodeButtonUnderUpfront: Locator = this.locator(
        "//button[contains(text(), 'I have a promo code')]"
    );

    public readonly subtotalTextUnderUpfront: Locator = this.locator(
        "//div[@class='content-panel-item ng-star-inserted']/div/span[contains(text(), 'Subtotal')]"
    );

    public readonly subtotalAmountUnderUpfront: Locator = this.locator(
        "//div[@class='content-panel-item ng-star-inserted']/div/span[contains(text(), 'Subtotal')]/following-sibling::span"
    );

    public readonly excludingFeesTextUnderUpfront: Locator = this.locator(
        "//div[@class='content-panel-item ng-star-inserted']/i[contains(text(), 'excluding fees')]"
    );

    public readonly installmentsPaymentOption: Locator = this.locator(
        "//span[@class='payment-type'][contains(text(),'Installments')]"
    );

    public readonly installmentsPaymentFrame: Locator = this.locator(
        "(//mat-expansion-panel-header[@role='button'])[2]"
    );

    public readonly installmentsPaymentAmount: Locator = this.locator(
        "//span[@class='discount-price ng-star-inserted']"
    );

    public readonly perMonthTextInstallments: Locator = this.locator(
        "//span[@class='discount-price ng-star-inserted']"
    );

    public readonly couponAvailableBadgeInstallments: Locator = this.locator(
        "(//mat-chip[contains(@class, 'coupon-badge')])[2]"
    );

    public readonly basePriceTextUnderInstallments: Locator = this.locator(
        "//div[@class='content-panel-item coupon-section ng-star-inserted']/div/span[contains(text(), 'Base price')]"
    );

    public readonly basePriceAmountUnderInstallments: Locator = this.locator(
        "//div[@class='content-panel-item coupon-section ng-star-inserted']/div/span[contains(text(), 'Base price')]/following-sibling::span"
    );

    public readonly installmentsTextUnderInstallments: Locator = this.locator(
        "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installments')]"
    );

    public readonly installmentsNumberUnderInstallments: Locator = this.locator(
        "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Installments')]/following-sibling::span"
    );

    public readonly pricePerInstallmentsTextUnderInstallments: Locator =
        this.locator(
            "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Price per installment')]"
        );

    public readonly pricePerInstallmentsAmountUnderInstallments: Locator =
        this.locator(
            "//div[@class='content-panel-item ng-star-inserted']/span[contains(text(), 'Price per installment')]/following-sibling::span"
        );

    public readonly dueTodayTextUnderInstallments: Locator = this.locator(
        "//span[@class='sub-item-panel ng-star-inserted' and contains(text(), 'Due Today')]"
    );

    public readonly firstMonthPaymentTextUnderInstallments: Locator =
        this.locator(
            "//div[@class='fee-items-holder']/span[contains(text(), 'First month')]"
        );

    public readonly firstMonthPaymentAmountUnderInstallments: Locator =
        this.locator(
            "//div[@class='fee-items-holder']/span[contains(text(), 'First month')]/following-sibling::span"
        );

    public readonly excludingFeesTextUnderInstallments: Locator = this.locator(
        "(//div[@class='content-panel-item ng-star-inserted']/i[contains(text(), 'excluding fees')])[2]"
    );

    public readonly iHaveAPromoCodeButtonUnderInstallments: Locator =
        this.locator("(//button[contains(text(), 'I have a promo code')])[2]");

    public readonly inactiveNextButton: Locator = this.locator(
        "//button[text()='Next']"
    );

    public readonly activeNextButton: Locator = this.locator(
        "//button[@class = 'next-button' and text()='Next']"
    );

    public readonly backButton: Locator = this.locator(
        "//span[@class='back-button']"
    );

    public readonly footerText: Locator = this.locator(
        "(//p[@class = 'footer-text' and contains(text(), 'Need help?')])[2]"
    );

    public readonly paymentPlanBoxes: Locator = this.locator(
        "//mat-accordion[@class='mat-accordion']/div/mat-expansion-panel/mat-expansion-panel-header"
    );

    public readonly step1: Locator = this.locator(
        "//div[@class='step-circle'][contains(.,'1')]"
    );

    public readonly step2: Locator = this.locator(
        "//div[@class='step-circle'][contains(.,'2')]"
    );

    public readonly step3: Locator = this.locator(
        "//div[@class='step-circle'][contains(.,'3')]"
    );

    public readonly UpfrontText: Locator = this.locator(
        "//span[@class='payment-type']"
    );

    public async selectPaymentPlan(paymentPlan: "upfront" | "installments") {
        switch (paymentPlan) {
            case "upfront":
                await this.upfrontPaymentOption.click();
                break;
            case "installments":
                await this.installmentsPaymentOption.click();
                break;
            default:
                throw new Error(`Invalid payment plan: ${paymentPlan}`);
        }
    }

    public async clickNextButton() {
        await this.activeNextButton.click();
    }
}
