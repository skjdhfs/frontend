import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [

  js.configs.recommended,

  ...tseslint.configs.recommended,

  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],

    plugins: {
        "@eslint/js": js, 
        react: pluginReact,
        "react-hooks": reactHooks
    },

    settings: {
      react: {
        version: "detect", 
      }
    },
    
    languageOptions: {
      globals: {
        ...globals.browser, 
       // ...globals.node
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      "react/jsx-uses-vars": "error",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      ...reactHooks.configs.recommended.rules 
    },
  },
];
