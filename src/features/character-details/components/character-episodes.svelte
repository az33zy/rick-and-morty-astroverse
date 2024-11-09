<script lang="ts">
	import type { Character } from "rickmortyapi"
	import { createQuery } from "@tanstack/svelte-query"
	import { getQueryClient } from "@/lib/query"
	import { batchCharacters } from "@/lib/batch"
	import { getIdFromUrl } from "@/lib/utils"
	import EpisodeCard from "@/components/episode-card.svelte"

	interface Props {
		id: number
		initialData: Character
	}

	let { id, initialData }: Props = $props()

	const queryClient = getQueryClient()

	const query = createQuery(
		{
			queryKey: ["character", id],
			queryFn: () => batchCharacters.fetch(id),
			initialData,
			select: (data) => {
				return {
					...data,
					episode: data.episode.map(getIdFromUrl),
				}
			},
		},
		queryClient,
	)
</script>

<section class="mt-10">
	<div class="mb-4 text-2xl font-semibold">
		<h2 class="inline">Episodes</h2>
		{#if $query.data}
			<span class="text-quantum">{$query.data.episode.length}</span>
		{/if}
	</div>
	{#if $query.data}
		<ul
			class="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
		>
			{#each $query.data.episode as episode}
				<li class="grid">
					<EpisodeCard id={episode} />
				</li>
			{/each}
		</ul>
	{/if}
</section>
