import eslintReact from "@eslint-react/eslint-plugin";
import js from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import checkFile from "eslint-plugin-check-file";
import importX from "eslint-plugin-import-x";
import jestDom from "eslint-plugin-jest-dom";
import jsxA11y from "eslint-plugin-jsx-a11y-x";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import testingLibrary from "eslint-plugin-testing-library";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["public/mockServiceWorker.js", "generators/*"]),
  {
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      js.configs.recommended,
      importX.flatConfigs.errors,
      importX.flatConfigs.warnings,
      importX.flatConfigs.typescript,
      tseslint.configs.recommended,
      eslintReact.configs["recommended-typescript"],
      jsxA11y.configs.recommended,
      prettierRecommended,
      testingLibrary.configs["flat/react"],
      jestDom.configs["flat/recommended"],
      vitest.configs.recommended,
    ],
    plugins: { "check-file": checkFile },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    settings: {
      // Resolves the `paths` aliases (`@/*`, …) from the app tsconfig. Not tsconfig.json: the
      // resolver ignores `paths` in a tsconfig with `references`.
      "import-x/resolver-next": [
        createTypeScriptImportResolver({ project: "./tsconfig.app.json" }),
      ],
    },
    rules: {
      "import-x/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: "./src/components",
              from: "./src/features",
            },
            {
              target: "./src/hooks",
              from: "./src/features",
            },
            {
              target: "./src/lib",
              from: "./src/features",
            },
            {
              target: "./src/types",
              from: "./src/features",
            },
            {
              target: "./src/utils",
              from: "./src/features",
            },
          ],
        },
      ],
      "import-x/no-cycle": "error",
      "linebreak-style": ["error", "unix"],
      "require-await": "error",
      "import-x/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import-x/default": "off",
      "import-x/no-named-as-default-member": "off",
      "import-x/no-named-as-default": "off",
      // Flags conventional names like `import svgr from "vite-plugin-svgr"`.
      "import-x/no-rename-default": "off",
      "jsx-a11y-x/anchor-is-valid": "off",
      // Prices are rendered as `${amount}`, where the `$` is the currency sign.
      "@eslint-react/jsx-no-leaked-dollar": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/explicit-function-return-type": ["off"],
      "@typescript-eslint/explicit-module-boundary-types": ["off"],
      "@typescript-eslint/no-empty-function": ["off"],
      "@typescript-eslint/no-explicit-any": ["off"],
      "prettier/prettier": ["error", { endOfLine: "auto" }, { usePrettierrc: true }],
      // Every matching pattern below is applied, so the globs must stay mutually
      // exclusive. `index` files, `src/main.tsx` and `*.d.ts` are matched by
      // nothing and are therefore exempt.
      "check-file/filename-naming-convention": [
        "error",
        {
          // Route modules stay kebab-case (they mirror URL segments).
          "src/app/**/*.{ts,tsx}": "KEBAB_CASE",
          "src/pages/**/*.{ts,tsx}": "KEBAB_CASE",
          // Hooks are camelCase, matching the hook name they export.
          "src/**/hooks/*.ts": "CAMEL_CASE",
          // Components are PascalCase, matching the component they export.
          "src/!(app|pages)/**/!(index).tsx": "PASCAL_CASE",
          // All other modules (api, utils, types, schemas, slices, …) stay kebab-case.
          "src/**/!(hooks)/*.ts": "KEBAB_CASE",
        },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
  {
    files: ["src/**/!(__tests__)/*.{ts,tsx}"],
    plugins: { "check-file": checkFile },
    rules: {
      "check-file/folder-naming-convention": [
        "error",
        {
          "**/*": "KEBAB_CASE",
        },
      ],
    },
  },
]);
