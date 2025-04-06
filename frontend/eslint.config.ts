import tseslint from "typescript-eslint";
import eslintSolid from "eslint-plugin-solid/configs/typescript";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

export default tseslint.config(
  {
    ignores: [
      "dist",
      "src/routeTree.gen.ts",
      "src/vite-env.d.ts",
      "eslint.config.ts",
      "vite.config.ts",
    ],
  },
  {
    ...eslintSolid,
    extends: tseslint.configs.strict,
  },
  eslintPluginPrettier,
  {
    extends: [
      eslintPluginImport.flatConfigs.recommended,
      eslintPluginImport.flatConfigs.typescript,
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    settings: {
      "import/resolver": {
        typescript: true,
        alias: true,
        node: true,
      },
    },
    rules: {
      "no-unused-vars": "off",
      "import/no-dynamic-require": "warn",
      "import/no-deprecated": "warn",
      "import/no-empty-named-blocks": "warn",
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: ["**/*.{test,spec,config}.{ts,js}"],
        },
      ],
      "import/no-mutable-exports": "error",
      "import/no-commonjs": "error",
      "import/no-nodejs-modules": "warn",
      "import/no-absolute-path": "error",
      "import/consistent-type-specifier-style": ["error", "prefer-inline"],
      "import/exports-last": "error",
      "import/first": "error",
      "import/newline-after-import": ["error", { count: 1 }],
      "import/group-exports": "error",
      "import/no-anonymous-default-export": "error",
      "import/no-unresolved": "off",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "type",
          ],
        },
      ],
    },
  },

  {
    extends: [eslintPluginUnicorn.configs.all],
    rules: {
      "unicorn/no-nested-ternary": "off",
      "unicorn/no-keyword-prefix": "off",
    },
  },

  {
    rules: {
      "no-console": "error",
    },
  },
);
