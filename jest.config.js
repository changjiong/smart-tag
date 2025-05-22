export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use babel-jest for JS/JSX/TS/TSX files
    // If using vite-jest, the transform might look like:
    // '^.+\\.(js|jsx|ts|tsx)$': 'vite-jest',
  },
  moduleNameMapper: {
    // Handle CSS imports (and SCSS, etc.)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Handle image imports
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    // Handle module path aliases
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/node_modules/$1', // Example for node_modules alias if used
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // If using vite-jest, you might also need:
  // preset: 'vite-jest', 
  // collectCoverage: true,
  // coverageReporters: ['json', 'lcov', 'text', 'clover'],
  // coverageDirectory: 'coverage',
  // coveragePathIgnorePatterns: ['/node_modules/'],
  // verbose: true,
};
