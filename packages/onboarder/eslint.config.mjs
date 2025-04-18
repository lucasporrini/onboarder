import { config } from "@repo/eslint-config/base";

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    rules: {
      "no-redeclare": "off",
      "no-undef": "off",
    },
  },
];
