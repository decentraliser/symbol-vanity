module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["airbnb-base"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "no-console": [
      "error",
      {
        allow: ["info", "error"]
      }
    ],
    "import/prefer-default-export": "off",
    semi: [2, "never"],
    "linebreak-style": 0,
    "import/extensions": ["never"]
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      rules: {
        "no-unused-vars": ["off"],
        "no-undef": ["off"]
      }
    }
  ]
};
