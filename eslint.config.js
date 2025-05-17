import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginPrettier from "eslint-plugin-prettier";
import pluginImport from "eslint-plugin-import-x";
import pluginA11y from "eslint-plugin-jsx-a11y";
import prettierConfig from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      js,
      "@typescript-eslint": tseslint.plugin,
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      prettier: pluginPrettier,
      import: pluginImport,
      "jsx-a11y": pluginA11y,
    },
    rules: {
      ...prettierConfig.rules,
      ...pluginA11y.configs.recommended.rules,
      "prettier/prettier": "error",
      "no-unused-vars": "error",
      "no-duplicate-case": "error",
      "no-console": "error",
      "no-debugger": "error",
      "object-curly-spacing": ["error", "always"],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: false,
          allowTypedFunctionExpressions: false,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
        },
      ],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/display-name": "off",
      "react-hooks/exhaustive-deps": "warn",
      "import/order": [
        "error",
        {
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
          pathGroups: [
            { group: "internal", position: "after", pattern: "~/app/**" },
            { group: "internal", position: "after", pattern: "~/pages/**" },
            { group: "internal", position: "after", pattern: "~/shared/**" },
            { group: "internal", position: "after", pattern: "~/entities/**" },
            { group: "internal", position: "after", pattern: "~/features/**" },
            { group: "internal", position: "after", pattern: "~/widgets/**" },
            { group: "internal", position: "after", pattern: "~/layouts/**" },
            { group: "internal", position: "after", pattern: "~/views/**" },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXOpeningElement[name.name='img']",
          message: "Используй <Image> из 'next/image' вместо <img>'",
        },
        {
          selector:
            "JSXElement[name.name='link'][attributes.0.name.name='rel'][attributes.0.value.value='stylesheet']",
          message: "Не используй <link rel='stylesheet'> — применяй CSS Modules или styled-jsx",
        },
        {
          selector: "JSXElement[name.name='Head'] JSXElement[name.name='Script']",
          message: "Нельзя использовать <Script> внутри <Head>, вынеси его наружу",
        },
      ],
      "no-restricted-imports": [
        "warn",
        {
          paths: [
            {
              name: "react-helmet",
              message: "Используй next/head вместо react-helmet",
            },
            {
              name: "react-script",
              message: "Используй next/script вместо сторонних скрипт-компонентов",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["tsconfig.json"],
      },
      globals: {
        ...globals.browser,
        React: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect", 
      },
      "import/resolver": {
        typescript: { project: "./tsconfig.json" },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          moduleDirectory: ["node_modules", "src/"],
        },
      },
    },
  },
  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      ".next",
      "out",
      "coverage",
      ".turbo",
      "*.config.js",
      "*.config.cjs",
      "*.config.ts",
      "*.d.ts",
      "eslint.config.js",
      "**/*.log",
    ],
  },
]);
