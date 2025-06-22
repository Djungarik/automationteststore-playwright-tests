import { test as base } from "@playwright/test";
import { HelperBase } from "./helperBase";

type MyFixtures = {
  helperBase: HelperBase;
};

export const test = base.extend<MyFixtures>({
  helperBase: async ({}, use) => {
    const helperBase = new HelperBase();
    await use(helperBase);
  },
});

export { expect } from "@playwright/test";
