module.exports = {
  moduleFileExtensions: [
    'js',
    'ts',
    'tsx',
  ],
  transform: {
    '^.+\\.(ts|tsx)?$': [
      'ts-jest',
      {
        tsConfig: '<rootDir>/tsconfig.base.json',
      },
    ],
  },
  testMatch: [
    '**/**/*.test.(ts|js)',
    '**/test/**/*.test.(ts|js)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    'build',
  ],
  testEnvironment: 'node',
  rootDir: '.',
  collectCoverageFrom: [
    '!<rootDir>/src',
  ],
  preset: 'ts-jest',
}
