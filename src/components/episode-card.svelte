<script lang="ts">
	import type { Episode } from "rickmortyapi"
	import { createQuery } from "@tanstack/svelte-query"
	import { batchEpisodes } from "@/lib/batch"
	import { getQueryClient } from "@/lib/query"

	interface Props {
		id: number
		initialData?: Episode
	}

	let { id, initialData }: Props = $props()

	const queryClient = getQueryClient()

	const query = createQuery(
		{
			queryKey: ["episode", id],
			queryFn: () => batchEpisodes.fetch(id),
			initialData,
		},
		queryClient,
	)
</script>

<a href={`/episodes/${id}`} class="group block" data-card>
	{#if $query.data}
		{@const episode = $query.data}
		<img
			src={`/episodes/${episode.episode}.jpg`}
			alt=""
			width="500"
			height="281"
			class="w-full rounded group-data-[card=active]:[view-transition-name:episode-poster]"
		/>
		<div class="py-2">
			<p class="font-medium">
				<span
					class="text-quantum group-data-[card=active]:[view-transition-name:episode-code]"
					>{episode.episode}</span
				>
				<span
					class="group-data-[card=active]:[view-transition-name:episode-name]"
					>{episode.name}</span
				>
			</p>
			<p class="">
				<span
					class="opacity-50 group-data-[card=active]:[view-transition-name:episode-date]"
					>{episode.air_date}</span
				>
			</p>
		</div>
	{:else if $query.isLoading}
		<p>Loading...</p>
	{:else}
		<p>Error</p>
	{/if}
</a>
