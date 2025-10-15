# SEP Automation — TDD with TypeScript & Playwright

This repository contains the automated end-to-end test suite for the SEP (Split/Subscription/Payment) flows, written using TypeScript and Playwright and driven by a TDD-style approach.

Key goals:

-   Provide reliable, readable end-to-end tests for payment flows and UI interactions.
-   Keep tests fast and deterministic with page objects and small test fixtures.
-   Make it easy to run tests locally and view HTML reports.
-   Support mocking payment confirmation via Playwright request routing using `data/mock_payment_confirmation.json`.

## What you'll find here

-   `tests/` — Playwright test suites grouped by feature (getting-started, payment-plans, submit-payment).
-   `pages/` — Page Object Model (POM) classes (e.g. `StartApplicationPage.ts`, `PaymentPlanPage.ts`, `ReviewPaymentPage.ts`, `LeftMainPage.ts`, `BasePage.ts`).
-   `utilities/` — Test helpers and data readers (`qa-data-reader.ts`, `sep-test-utilities.ts`).
-   `data/` — JSON fixtures used by tests (`qa_data.json`, `mock_payment_confirmation.json`).
-   `playwright.config.ts` — Playwright configuration (projects, browser channels, retries, reporter).
-   `package.json` — npm scripts and devDependencies.
-   Payment confirmation mock — a fixture and tests use `page.route`/`route.fulfill` to simulate confirmation responses.

## Requirements

-   Node.js (recommended v18+)
-   npm or yarn

Tip: The project uses Playwright. If you haven't installed browsers, run the Playwright install step below.

## Installation

1. Install dependencies:

```bash
npm install
```

2. (Optional) Install Playwright browsers (recommended for the first run):

```bash
npx playwright install
```

On macOS with zsh, the commands above are the same.

## Available scripts

-   `npm run tests` — Run the entire Playwright test suite (uses `npx playwright test`).
-   `npm run test:specific` — Run tests matching `file-name.spec.ts` (from package.json helper).
-   `npm run test:tag` — Run tests matching the tag `@sep20`.
-   `npm run report` — Open the Playwright HTML report (runs `npx playwright show-report`).

Examples:

```bash
# Run all tests (headed by default as configured in playwright.config.ts)
npm run tests

# Run a single test file
npx playwright test tests/payment-plans/select-payment-plan.spec.ts

# Open HTML report after a run
npm run report
```

## Playwright configuration highlights

-   Tests are located in `./tests` and run fully parallel by default.
-   Reporter is set to `html` and traces are recorded on first retry.
-   The `Google Chrome` project is configured to run with the Chrome channel and a large viewport (1800x1000).
-   `headless` is set to `false` in `playwright.config.ts` to allow headed runs by default; modify `use.headless` if you prefer headless CI runs.

## Folder structure (short)

```
.
├─ data/                     # JSON fixtures
├─ pages/                    # Page objects (POM)
├─ tests/                    # Playwright tests
│  ├─ getting-started/
│  ├─ payment-plans/
│  └─ submit-payment/
├─ utilities/                # Helpers & test utilities
├─ playwright.config.ts
└─ package.json
```

## How tests are organized

-   Tests use a Page Object pattern. Each page class exposes actions and assertions to keep tests readable and maintainable.
-   Test data lives under `data/` and is read via `utilities/qa-data-reader.ts`.

## Writing new tests

1. Add a new file under `tests/` (prefer grouping by feature).
2. Use existing page objects from `pages/` and helpers from `utilities/`.
3. Tag tests with `@sep20` or other tags to selectively run them via `--grep`.

Example test invocation for a tagged test:

```bash
npx playwright test --grep @sep20
```

## Running in CI

Configure your CI to run `npm ci` (or `npm install`) and `npm run tests`. If you want headless runs, set an environment variable or edit `playwright.config.ts` to use `headless: true` for CI. Make sure Playwright browsers are installed (`npx playwright install --with-deps` on Linux).

## Troubleshooting

-   If tests fail intermittently, try enabling the trace in the Playwright report and inspect the artifacts (`playwright-report/`) or screenshots saved to `screenshots/`.
-   Use the `trace` and `retries` options in `playwright.config.ts` to debug flaky tests.

## Small tips and best practices

-   Keep selectors in page objects and avoid brittle CSS/XPath in tests.
-   Use fixtures/data files in `data/` for deterministic inputs.
-   Prefer smaller, focused tests over large end-to-end flows.

## License & Contributing

This repository currently has no explicit license. Add a `LICENSE` file if you intend to open-source it. Contributions: open an issue or PR with a clear description and tests.

## Contact

If you have questions about the test design or need help running the suite, add an issue in the repo or reach out to jyotishankarsahoo86@gmail.com.

---
