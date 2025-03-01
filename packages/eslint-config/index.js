module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    // Additional rules that complement TypeScript's type checking
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "import/order": ["error", { "newlines-between": "always", alphabetize: { order: "asc" } }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }]
  },
  settings: {
    "import/resolver": {
      typescript: {}
    }
  }
};
