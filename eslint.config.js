import js from "@eslint/js"
import ts from "typescript-eslint"
import pluginAstro from "eslint-plugin-astro"
import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"
import pluginVue from "eslint-plugin-vue"
import pluginSvelte from "eslint-plugin-svelte"
import svelteConfig from "./svelte.config.js"
import pluginSolid from "eslint-plugin-solid"
import configPrettier from "eslint-config-prettier"

/** @type {import('eslint').Linter.Config[]} */
export default [
	// javascript
	js.configs.recommended,

	// typescript
	...ts.configs.recommended,

	// astro
	...pluginAstro.configs.recommended,

	// react
	{
		name: "react/recommended",
		files: ["*.{ts,tsx}", "**/*.{ts,tsx}"],
		ignores: ["*.solid.{ts,tsx}", "**/*.solid.{ts,tsx}"],
		...pluginReact.configs.flat.recommended,
		...pluginReact.configs.flat["jsx-runtime"],
	},
	{
		name: "react/hooks",
		files: ["*.{ts,tsx}", "**/*.{ts,tsx}"],
		ignores: ["*.solid.{ts,tsx}", "**/*.solid.{ts,tsx}"],
		plugins: {
			"react-hooks": pluginReactHooks,
		},
		rules: pluginReactHooks.configs.recommended.rules,
	},

	// vue
	...pluginVue.configs["flat/recommended"],
	{
		name: "vue/parser",
		files: ["*.vue", "**/*.vue"],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
			},
		},
	},

	// svelte
	...pluginSvelte.configs["flat/recommended"],
	...pluginSvelte.configs["flat/prettier"],
	{
		name: "svelte:parser",
		files: ["*.svelte", "**/*.svelte", "*.svelte.ts", "**/*.svelte.ts"],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
				svelteConfig,
			},
		},
	},

	// solid
	{
		name: "solid/recommended",
		files: ["*.solid.{ts,tsx}", "**/*.solid.{ts,tsx}"],
		...pluginSolid.configs["flat/recommended"],
	},

	// custom
	{
		name: "custom",
		rules: {
			"no-restricted-imports": [
				"error",
				{
					patterns: ["@/features/*/*"],
				},
			],
		},
	},

	// ignore
	{
		name: "ignore",
		ignores: [".astro/", "dist/"],
	},

	// should be last
	configPrettier,
]
