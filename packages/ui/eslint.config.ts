import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import eslint from "@stallning/eslint";

import { withNuxt } from "./.nuxt/eslint.config.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default withNuxt(
  eslint({
    oxlint: "../config/oxlint/.oxlintrc.json",
    typescript: true,
    vue: true,
  }),
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "import-x/no-unresolved": ["error", { ignore: ["^~ui/", "^~nuxt-essentials/"] }],
    },
  },
);
