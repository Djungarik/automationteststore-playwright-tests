# Automation Test Store Playwright Tests

This repository contains end-to-end tests for [Automation Test Store](https://automationteststore.com/) using [Playwright](https://playwright.dev/).

## Project Structure

- `tests/` - Test specifications and setup scripts
- `page-objects/` - Page Object Model classes for UI interactions
- `test-data/` - Test data in JSON format
- `fixtures.ts` - Custom Playwright fixtures
- `helperBase.ts` - Utility/helper functions
- `playwright.config.ts` - Playwright configuration
- `.github/workflows/` - GitHub Actions CI workflow
- `.auth/` - Auth storage state

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

```sh
npm install
npx playwright install --with-deps
```

### Running Tests

```sh
npx playwright test
```

## Reporting

- Allure Report can be viewed on the [GitHub page](https://djungarik.github.io/automationteststore-playwright-tests/)

## Continuous Integration

Tests are run automatically on GitHub Actions. See [`.github/workflows/github-actions.yml`](.github/workflows/github-actions.yml).

## Custom Test User

The test user credentials are provided via a GitHub secret and written to `test-data/test-user.json` during CI runs. Locally, create this file manually if needed.
