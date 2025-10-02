import pluginPrettier from "eslint-plugin-prettier";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import js from "@eslint/js";

export default defineConfig([
  { ignores: ["dist/**", "webpack/**"] },
  {
    files: ["**/*.{ts,mts,cts,tsx}"],
    plugins: { js, prettier: pluginPrettier },
    extends: ["js/recommended", reactHooks.configs["recommended-latest"], reactRefresh.configs.recommended],
    languageOptions: { globals: globals.browser },
    rules: {
      "prettier/prettier": "warn",
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],
]);
