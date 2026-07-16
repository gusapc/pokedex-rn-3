const tseslint = require('typescript-eslint');
const prettier = require('eslint-config-prettier');

module.exports = tseslint.config(
	...tseslint.configs.recommended,
	prettier,
	{
		ignores: ['node_modules/**', '.expo/**', 'coverage/**'],
		rules: {
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		},
	},
);
