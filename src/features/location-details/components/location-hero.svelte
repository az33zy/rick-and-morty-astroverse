<script lang="ts">
	import type { Location } from "rickmortyapi"
	import { createQuery } from "@tanstack/svelte-query"
	import { getQueryClient } from "@/lib/query"
	import { batchLocations } from "@/lib/batch"
	import portalSvg from "@/assets/portal.svg"

	interface Props {
		id: number
		initialData: Location
	}

	let { id, initialData }: Props = $props()

	const queryClient = getQueryClient()

	const query = createQuery(
		{
			queryKey: ["location", id],
			queryFn: () => batchLocations.fetch(id),
			initialData,
		},
		queryClient,
	)
</script>

<header class="flex flex-col gap-8 sm:flex-row">
	{#if $query.data}
		{@const location = $query.data}
		<div class="sm:order-last">
			<h1 class="text-4xl font-semibold">
				<span class="[view-transition-name:location-name]">
					{location.name}
				</span>
			</h1>
			{#if location.type && location.type !== "unknown"}
				<p class="text-xl">
					<span class="opacity-50 [view-transition-name:location-type]">
						{location.type}
					</span>
				</p>
			{/if}
			{#if location.dimension && location.dimension !== "unknown"}
				<p class="mt-2">
					<span class="text-quantum [view-transition-name:location-dimension]">
						{location.dimension}
					</span>
				</p>
			{/if}
		</div>
		<img
			src={portalSvg.src}
			width={portalSvg.width}
			height={portalSvg.height}
			alt=""
			class="w-full sm:w-48"
		/>
	{/if}
</header>
