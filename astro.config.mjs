// @ts-check
import { defineConfig } from "astro/config"
import cloudflare from "@astrojs/cloudflare"
import react from "@astrojs/react"
import vue from "@astrojs/vue"
import svelte from "@astrojs/svelte"
import solidJs from "@astrojs/solid-js"
import tailwind from "@astrojs/tailwind"
import rehypeExternalLinks from "rehype-external-links"

// https://astro.build/config
export default defineConfig({
	output: "server",
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),

	integrations: [
		react({
			include: ["**/*.tsx"],
			exclude: ["**/*.solid.tsx"],
		}),
		vue(),
		svelte(),
		solidJs({ include: ["**/*.solid.tsx"] }),
		tailwind({ applyBaseStyles: false }),
	],

	vite: {
		resolve: {
			alias: {
				"@": "/src",
			},
		},
	},

	markdown: {
		rehypePlugins: [
			[rehypeExternalLinks, { target: "_blank", rel: "noreferrer" }],
		],
	},
})
