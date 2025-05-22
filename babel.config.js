export default {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }], // Transpile for current Node version
    ['@babel/preset-react', { runtime: 'automatic' }], // Transpile JSX
  ],
  plugins: [
    '@babel/plugin-transform-runtime' // To use async/await and other runtime features
  ]
};
