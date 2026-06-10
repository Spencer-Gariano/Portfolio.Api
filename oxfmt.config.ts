import { defineConfig } from 'oxfmt';

export default defineConfig({
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  ignorePatterns: ['dist/**', 'node_modules/**', 'coverage/**', '*.min.js', 'drizzle/meta/**'],
  sortImports: false,
  sortPackageJson: true,
});
