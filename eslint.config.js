import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
	{
		ignores: ['dist', 'node_modules', '*.config.js'],
	},

	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},

	...tseslint.configs.recommended,

	{
		...react.configs.flat.recommended,
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			...react.configs.flat.recommended.rules,
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react/jsx-uses-react': 'off',
		},
	},

	{
		plugins: {
			'react-hooks': reactHooks,
		},
		rules: reactHooks.configs.recommended.rules,
	},

	{
		plugins: {
			'react-refresh': reactRefresh,
		},
		rules: {
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
		},
	},

	jsxA11y.flatConfigs.recommended,

	{
		rules: {
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/no-empty-interface': 'warn',
			'no-debugger': 'warn',
			'prefer-const': 'warn',
			'no-var': 'error',
			'eqeqeq': ['error', 'always'],
			'curly': ['error', 'all'],
			'react/jsx-key': ['error', { checkFragmentShorthand: true }],
			'react/jsx-no-target-blank': 'error',
			'react/self-closing-comp': [
				'warn',
				{
					component: true,
					html: true,
				},
			],
			'@typescript-eslint/semi': ['error', 'always'],
			'quotes': ['error', 'single', { avoidEscape: true }],
			'comma-dangle': ['error', 'always-multiline'],
			'object-curly-spacing': ['error', 'always'],
			'array-bracket-spacing': ['error', 'never'],
			'arrow-spacing': ['error', { before: true, after: true }],
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/no-explicit-any': 'warn',
			'no-console': 'off',
		},
	},

	prettier,
];