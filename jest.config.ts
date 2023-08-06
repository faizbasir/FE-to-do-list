module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "./setupTest.ts",
  ],
  testMatch: ["**/__test__/*.ts?(x)"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "\\.(scss|less)$": "identity-obj-proxy",
  },
  collectCoverage: true,
  collectCoverageFrom: ["./src/**"],
  coverageThreshold: {
    global: {
      lines: 85,
    },
  },
};
