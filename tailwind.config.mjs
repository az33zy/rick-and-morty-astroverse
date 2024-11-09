/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		container: {
			center: true,
			padding: "1rem",
		},
		extend: {
			colors: {
				quantum: "#bfde42",
				unknown: "#68696B",
				human: "#80C342",
				alien: "#41B4CA",
				humanoid: "#E49606",
				poopybutthole: "#F9F8A4",
				"mythological-creature": "#8B101C",
				animal: "#F77D55",
				robot: "#420161",
				cronenberg: "#B0585B",
				disease: "#202F3A",
			},
		},
	},
}
