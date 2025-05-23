module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  ignorePatterns: ["node_modules/*", "public/mockServiceWorker.js", "generators/*"],
  extends: ["eslint:recommended"],
  plugins: ["check-file"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      settings: {
        react: { version: "detect" },
        "import/resolver": {
          typescript: {
            project: "./tsconfig.json",
          },
          alias: {
            map: [["@", "./src"]],
            extensions: [".ts", ".tsx", ".js", ".jsx"],
          },
        },
      },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:prettier/recommended",
        "plugin:testing-library/react",
        "plugin:jest-dom/recommended",
        "plugin:vitest/legacy-recommended",
      ],
      rules: {
        "import/no-restricted-paths": [
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
        "import/no-cycle": "error",
        "linebreak-style": ["error", "windows"],
        "react/prop-types": "off",
        "import/order": [
          "error",
          {
            groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
            "newlines-between": "always",
            alphabetize: { order: "asc", caseInsensitive: true },
          },
        ],
        "import/default": "off",
        "import/no-named-as-default-member": "off",
        "import/no-named-as-default": "off",
        "react/react-in-jsx-scope": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "@typescript-eslint/explicit-function-return-type": ["off"],
        "@typescript-eslint/explicit-module-boundary-types": ["off"],
        "@typescript-eslint/no-empty-function": ["off"],
        "@typescript-eslint/no-explicit-any": ["off"],
        "prettier/prettier": ["error", { endOfLine: "auto" }, { usePrettierrc: true }],
        "check-file/filename-naming-convention": [
          "error",
          {
            "**/*.{ts,tsx}": "KEBAB_CASE",
          },
          {
            ignoreMiddleExtensions: true,
          },
        ],
      },
    },
    {
      plugins: ["check-file"],
      files: ["src/**/!(__tests__)/*"],
      rules: {
        "check-file/folder-naming-convention": [
          "error",
          {
            "**/*": "KEBAB_CASE",
          },
        ],
      },
    },
  ],
};
