<script lang="ts">
	import { getEpisodes, type Info, type Episode } from "rickmortyapi"
	import {
		createInfiniteQuery,
		type InfiniteData,
	} from "@tanstack/svelte-query"
	import { getQueryClient } from "@/lib/query"
	import EpisodeCard from "@/components/episode-card.svelte"
	import EpisodeListEnd from "./episode-list-end.svelte"

	type InitialData = InfiniteData<Info<Episode[]>, number>

	interface Props {
		initialData: InitialData
	}

	let { initialData }: Props = $props()

	const queryClient = getQueryClient()

	const query = createInfiniteQuery(
		{
			queryKey: ["episodes"],
			queryFn: async ({ pageParam }) => {
				const response = (await getEpisodes({ page: pageParam })).data
				// https://tkdodo.eu/blog/seeding-the-query-cache
				response.results?.forEach((episode) => {
					queryClient.setQueryData(["episode", episode.id], episode)
				})

				return response
			},
			initialData,
			initialPageParam: 1,
			getNextPageParam: (lastPage) => {
				if (!lastPage.info || !lastPage.info.next) {
					return null
				}
				const url = new URL(lastPage.info.next)
				const nextPage = url.searchParams.get("page")
				if (!nextPage) return null
				return parseInt(nextPage, 10)
			},
		},
		queryClient,
	)
</script>

<section>
	{#if $query.data}
		<div class="mb-8 text-4xl font-semibold">
			<h1 class="inline">Episodes</h1>
			{#if $query.data.pages[0]?.info}
				<span class="text-quantum">{$query.data.pages[0].info.count}</span>
			{/if}
		</div>
		<ul class="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each $query.data.pages as page}
				{#if page.results}
					{#each page.results as episode}
						<li class="grid">
							<EpisodeCard id={episode.id} initialData={episode} />
						</li>
					{/each}
				{/if}
			{/each}
		</ul>
		<EpisodeListEnd
			loadFn={$query.fetchNextPage}
			isLoading={$query.isFetchingNextPage}
			hasMorePages={$query.hasNextPage}
		/>
	{/if}
</section>
