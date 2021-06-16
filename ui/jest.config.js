const {defaults} = require('jest-config');

module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
  },
}
