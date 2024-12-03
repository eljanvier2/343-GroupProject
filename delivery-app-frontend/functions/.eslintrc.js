module.exports = {
  root: true, // Ensure ESLint looks for this config at the root level
  env: {
    es6: true,
    node: true, // Enable Node.js global variables
  },
  parserOptions: {
    ecmaVersion: 2018, // Use ECMAScript 2018 syntax
  },
  extends: [
    "eslint:recommended", // Use ESLint's recommended rules
    "google", // Use Google's JavaScript style guide
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"], // Disallow specific globals
    "prefer-arrow-callback": "error", // Prefer arrow functions for callbacks
    "quotes": ["error", "double", {allowTemplateLiterals: true}], // Adjust spacing inside curly braces
    "require-jsdoc": "off", // Disable JSDoc requirement (optional)
    "max-len": ["error", {code: 120}], // Set max line length to 120 characters
    "object-curly-spacing": ["error", "never"], // Enforce no spacing inside curly braces
  },
  overrides: [
    {
      files: ["**/*.spec.*"], // Override for test files
      env: {
        mocha: true, // Add Mocha environment for test files
      },
      rules: {},
    },
  ],
  globals: {}, // Define global variables if needed
};
