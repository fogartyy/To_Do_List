module.exports = {
    moduleNameMapper: {
      "\\.(css|less|scss)$": "identity-obj-proxy"
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!(axios)/)']
  };
  