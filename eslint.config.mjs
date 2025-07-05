import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'plugin:prettier/recommended'),
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: false,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
          allowConciseArrowFunctionExpressionsStartingWithVoid: false,
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ClassDeclaration',
          message: 'Classes are not allowed. Use functions and hooks instead.',
        },
        {
          selector: 'ClassExpression',
          message: 'Class expressions are not allowed. Use functions and hooks instead.',
        },
      ],
      'functional/prefer-immutable-types': [
        'error',
        {
          enforcement: 'ReadonlyDeep',
          ignoreInferredTypes: false,
          ignoreNamePattern: '^mutable',
          ignoreTypePattern: '^Mutable',
        },
      ],
      '@typescript-eslint/prefer-function-type': 'error',
    },
  },
];

export default eslintConfig;
