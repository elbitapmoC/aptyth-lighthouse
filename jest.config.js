const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Path to the Next.js app directory
});

const customJestConfig = {
  // Use jsdom as the test environment for browser-like testing
  testEnvironment: 'jsdom',

  // Transform settings for TypeScript and JavaScript files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  // Module name mappings for CSS modules and static assets
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Alias for absolute imports
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Mock CSS modules
    '\\.(png|jpg|jpeg|gif|webp|svg|ico|bmp|tiff)$': '<rootDir>/__mocks__/fileMock.js', // Mock static assets
  },

  // Test file patterns to include
  testMatch: [
    '**/__tests__/**/*.(js|jsx|ts|tsx)', // Include test files in __tests__ directories
    '**/?(*.)+(spec|test).(js|jsx|ts|tsx)', // Include files with .spec or .test suffix
  ],

  // Directories to ignore during testing
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/', // Ignore node_modules
    '<rootDir>/.next/', // Ignore Next.js build output
  ],

  // Additional Jest settings
  collectCoverage: true, // Enable test coverage collection
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}', // Collect coverage from all JS/TS files
    '!**/node_modules/**', // Exclude node_modules
    '!**/.next/**', // Exclude Next.js build output
    '!**/jest.config.js', // Exclude this configuration file
  ],
  coverageDirectory: '<rootDir>/coverage', // Output directory for coverage reports
};

// Export the Jest configuration
module.exports = createJestConfig(customJestConfig);
```

### Step 4: Review the Code and the User Request
1. **File Name and Location**: The file is named `jest.config.js` and placed in the root directory as required.
2. **Purpose**: The file configures Jest for testing the project, including support for TypeScript and Next.js.
3. **Key Features**:
   - Uses `next/jest` to integrate with Next.js.
   - Configures `ts-jest` for TypeScript support.
   - Sets `jsdom` as the test environment for browser-like testing.
   - Includes module name mappings for CSS modules and static assets.
   - Defines test file patterns and directories to include/exclude.
   - Enables test coverage collection and specifies the output directory.
4. **Conventions**: The code adheres to the project's conventions and dependencies.
5. **Validation**: The configuration is complete, functional, and ready for use.

### Final Output
```
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Path to the Next.js app directory
});

const customJestConfig = {
  // Use jsdom as the test environment for browser-like testing
  testEnvironment: 'jsdom',

  // Transform settings for TypeScript and JavaScript files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  // Module name mappings for CSS modules and static assets
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Alias for absolute imports
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Mock CSS modules
    '\\.(png|jpg|jpeg|gif|webp|svg|ico|bmp|tiff)$': '<rootDir>/__mocks__/fileMock.js', // Mock static assets
  },

  // Test file patterns to include
  testMatch: [
    '**/__tests__/**/*.(js|jsx|ts|tsx)', // Include test files in __tests__ directories
    '**/?(*.)+(spec|test).(js|jsx|ts|tsx)', // Include files with .spec or .test suffix
  ],

  // Directories to ignore during testing
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/', // Ignore node_modules
    '<rootDir>/.next/', // Ignore Next.js build output
  ],

  // Additional Jest settings
  collectCoverage: true, // Enable test coverage collection
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}', // Collect coverage from all JS/TS files
    '!**/node_modules/**', // Exclude node_modules
    '!**/.next/**', // Exclude Next.js build output
    '!**/jest.config.js', // Exclude this configuration file
  ],
  coverageDirectory: '<rootDir>/coverage', // Output directory for coverage reports
};

// Export the Jest configuration
module.exports = createJestConfig(customJestConfig);
