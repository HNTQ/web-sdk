module.exports = {
    moduleFileExtensions: ["ts", "tsx", "js"],
    transform: {
      "^.+\\.(ts|tsx)?$": ['ts-jest', {tsconfig: "tsconfig.json"}]
    },
    testMatch: ["**/test/**/*.test.(ts|js)", "**/**/*.test.(ts|js)"],
    testPathIgnorePatterns: ["/node_modules/", "build"],
    testEnvironment: "node",
    rootDir: "..",
    collectCoverageFrom: [
      "!<rootDir>/src",
    ]
  };