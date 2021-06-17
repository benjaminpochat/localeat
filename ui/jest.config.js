require('jest-preset-angular/ngcc-jest-processor');

// jest.config.js
module.exports = {
  verbose: true,
  collectCoverage: true,
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1"
  }
};
