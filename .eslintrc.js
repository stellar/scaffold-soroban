module.exports = {
  extends: ["@stellar/eslint-config"],
  env: {
    es2020: true,
  },
  globals: {
  },
  ignorePatterns: ["dist/", "node_modules/", "build/", "__mocks__/"],
  overrides: [
    {
      files: ["webpack.*.js"],
      rules: {
        "import/no-extraneous-dependencies": [0, { devDependencies: false }],
      },
    },
  ],
  rules: {
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-console": "off",
    "react/jsx-filename-extension": ["error", { extensions: [".tsx", ".jsx"] }],
  },
  settings: {
    "import/resolver": {
      typescript: {},
      node: {
        extensions: [".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src"],
      },
    },
  },
};
