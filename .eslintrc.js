module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }], // 让eslint忽略prettier中的末尾回车
    "@typescript-eslint/no-explicit-any": ["off"], // 关闭any类型时的警告
    "@typescript-eslint/no-empty-function": ["off"], // 关闭空函数警告
    "@typescript-eslint/ban-ts-ignore": ["off"], // 允许使用ts-ignore
    // "comma-dangle": [2, "never"], // 要求或禁止末尾逗号
    "vue/multi-word-component-names": "off",
    "linebreak-style": [0, "error", "windows"],
  },
};
