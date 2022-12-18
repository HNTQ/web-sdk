module.exports = {
    moduleFileExtensions: ["ts", "js"],
    transform: {
      "^.+\\.(ts)$": ['ts-jest', {tsconfig: "tsconfig.json"}]
    },
    testMatch: ["**/test/**/*.test.(ts|js)", "**/**/*.test.(ts|js)"],
    testPathIgnorePatterns: ["/node_modules/", "build"],
    testEnvironment: "node",
    rootDir: ".",
    collectCoverageFrom: [
      "!<rootDir>/platform/activity/*.ts",
      "<rootDir>/platform/db/**/*.ts",
      "<rootDir>/platform/jwks/**/*.ts",
      "<rootDir>/platform/oauth2/**/*.ts",
      // "<rootDir>/src/resolvers/**/*.ts",
      // "<rootDir>/src/schema/**/*.ts",
      "<rootDir>/platform/security/**/*.ts",
      "<rootDir>/platform/utils/**/*.ts",
      "<rootDir>/platform/vendors/**/*.ts"
    ]
  };