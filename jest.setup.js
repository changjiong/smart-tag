// jest.setup.js
import '@testing-library/jest-dom';

// You can add other global setup here if needed, for example:
// - Mocking global objects (fetch, localStorage, etc.)
// - Setting up a global server for MSW (Mock Service Worker)

// Example: Mocking localStorage
// const localStorageMock = (function() {
//   let store = {};
//   return {
//     getItem(key) {
//       return store[key] || null;
//     },
//     setItem(key, value) {
//       store[key] = value.toString();
//     },
//     removeItem(key) {
//       delete store[key];
//     },
//     clear() {
//       store = {};
//     }
//   };
// })();
// Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Silence console.error and console.warn during tests if they are too noisy
// (useful if some known warnings are expected but don't break tests)
// global.console = {
//   ...console,
//   // log: jest.fn(), // uncomment to suppress console.log
//   // info: jest.fn(), // uncomment to suppress console.info
//   warn: jest.fn(), // uncomment to suppress console.warn
//   error: jest.fn(), // uncomment to suppress console.error
// };
