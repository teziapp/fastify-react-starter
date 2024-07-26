// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
	ignorePatterns: [".eslintrc.js"],
	extends: [
		"@repo/eslint-config/library.js",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: true,
	},
	plugins: [
		"@typescript-eslint/eslint-plugin",
		"@typescript-eslint",
		"eslint-plugin-import",
		"eslint-plugin-jsdoc",
		"sonarjs",
		"ban",
		"sort-class-members",
	],
	globals: {
		// biome-ignore lint/style/useNamingConvention: <explanation>
		MyGlobal: true,
	},
	root: true,
	env: {
		node: true,
		jest: true,
	},
	rules: {
		"@typescript-eslint/quotes": [
			"error",
			"double",
			{
				avoidEscape: true,
			},
		],
	},
	"@typescript-eslint/ban-types": [
		"error",
		{
			types: {
				Boolean: {
					message: "Avoid using the `Boolean` type. Did you mean `boolean`?",
				},
				Function: {
					message:
						"Avoid using the `Function` type. Prefer a specific function type, like `() => void`.",
				},
				Number: {
					message: "Avoid using the `Number` type. Did you mean `number`?",
				},
				Object: {
					message: "Avoid using the `Object` type. Did you mean `object`?",
				},
				String: {
					message: "Avoid using the `String` type. Did you mean `string`?",
				},
				Symbol: {
					message: "Avoid using the `Symbol` type. Did you mean `symbol`?",
				},
			},
		},
	],
	"@typescript-eslint/consistent-type-assertions": "error",
	"@typescript-eslint/no-misused-new": "error",
	"@typescript-eslint/no-namespace": "error",
	"@typescript-eslint/no-unused-expressions": "error",
	"@typescript-eslint/no-use-before-define": [
		"error",
		{ functions: false, classes: false, enums: false, typedefs: false },
	],
	"@typescript-eslint/no-var-requires": "error",
	"@typescript-eslint/prefer-for-of": "error",
	"@typescript-eslint/unified-signatures": "error",
	"no-duplicate-imports": "error",
	"jsdoc/check-alignment": "error",
	"jsdoc/check-indentation": "error",
	"sonarjs/no-duplicate-string": ["error", { threshold: 4 }],
	"sonarjs/no-duplicated-branches": "error",
	"sonarjs/no-identical-conditions": "error",
	"sonarjs/no-identical-functions": "error",
	"sonarjs/no-extra-arguments": "error",
	"import/no-default-export": "error",
	complexity: ["error", { max: 7 }],
	"sonarjs/cognitive-complexity": ["error", 10],
	"max-lines-per-function": [
		"error",
		{ max: 60, skipBlankLines: true, skipComments: true },
	],
	"max-lines": ["error", { max: 350, skipBlankLines: true, skipComments: true }],
	"max-len": ["error", { code: 150, ignoreComments: true, ignoreUrls: true }],
	"max-depth": ["error", 5],
	"no-useless-catch": "error",
	"@typescript-eslint/return-await": "error",
	"no-eval": "error",
	"dot-notation": "error",
	"no-debugger": "error",
	"no-constant-condition": "error",
	"no-var": "error",

	"id-length": ["error", { min: 2, max: 30, properties: "never" }],
	"@typescript-eslint/naming-convention": [
		"error",
		{
			selector: "function",
			format: ["strictCamelCase"],
			leadingUnderscore: "forbid",
			trailingUnderscore: "forbid",
		},
		{
			selector: "variable",
			modifiers: ["global"],
			types: ["function"],
			format: ["strictCamelCase"],
			leadingUnderscore: "forbid",
			trailingUnderscore: "forbid",
		},
		{
			selector: "variable",
			modifiers: ["global"],
			format: ["UPPER_CASE"],
			leadingUnderscore: "forbid",
			trailingUnderscore: "forbid",
		},
		{
			selector: "variable",
			format: ["strictCamelCase"],
			leadingUnderscore: "forbid",
			trailingUnderscore: "forbid",
		},
		{
			selector: "objectLiteralProperty",
			format: ["strictCamelCase"],
			leadingUnderscore: "forbid",
			trailingUnderscore: "forbid",
		},
		{
			selector: "classProperty",
			format: ["strictCamelCase"],
			leadingUnderscore: "forbid",
			trailingUnderscore: "forbid",
		},
		{
			selector: "parameter",
			format: ["strictCamelCase"],
			leadingUnderscore: "forbid",
			trailingUnderscore: "forbid",
		},
		{
			selector: "classMethod",
			format: ["strictCamelCase"],
			leadingUnderscore: "forbid",
			trailingUnderscore: "forbid",
		},
		{
			selector: "objectLiteralMethod",
			format: ["strictCamelCase"],
			leadingUnderscore: "forbid",
			trailingUnderscore: "forbid",
		},
		{
			selector: "class",
			format: ["StrictPascalCase"],
			leadingUnderscore: "forbid",
			trailingUnderscore: "forbid",
		},
		{
			selector: "interface",
			format: ["StrictPascalCase"],
			leadingUnderscore: "forbid",
			trailingUnderscore: "forbid",
			filter: {
				regex: "^I.*$",
				match: false,
			},
		},
	],
	// we want to force semicolons
	semi: ["error", "always"],
	// we want to avoid extraneous spaces
	"no-multi-spaces": ["error"],
	"no-restricted-imports": [
		"error",
		{
			patterns: [
				{
					group: ["./", "../"],
					message: "Relative imports are not allowed.",
				},
			],
		},
	],
};
