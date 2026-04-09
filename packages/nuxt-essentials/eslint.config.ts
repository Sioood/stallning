import eslint from "@stallning/eslint";

import { withNuxt } from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  eslint({
    oxlint: "../config/oxlint/.oxlintrc.json",
    typescript: true,
    vue: true,
  }),
  {
    rules: {
      "import-x/no-unresolved": ["error", { ignore: ["^~nuxt-essentials/"] }],
    },
  },
);
