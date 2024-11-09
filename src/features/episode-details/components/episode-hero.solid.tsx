/** @jsxImportSource solid-js */
import { Match, Switch } from "solid-js"
import { getEpisode, type Episode } from "rickmortyapi"
import { createQuery } from "@tanstack/solid-query"
import { getQueryClient } from "@/lib/query"

export default function EpisodeHero(props: {
	id: number
	initialData?: Episode | undefined
}) {
	const query = createQuery(
		() => ({
			queryKey: ["episode", props.id],
			queryFn: async () => (await getEpisode(props.id)).data,
			initialData: props.initialData,
			experimental_prefetchInRender: true,
		}),
		getQueryClient,
	)

	return (
		<Switch>
			<Match when={query.isSuccess}>
				<header class="grid gap-2 lg:grid-cols-2 lg:!bg-left-bottom">
					<div>
						<p class="">
							<span class="text-quantum [view-transition-name:episode-code]">
								{query.data?.episode}
							</span>
						</p>
						<h1 class="mb-1 text-4xl font-semibold">
							<span class="[view-transition-name:episode-name]">
								{query.data?.name}
							</span>
						</h1>
						<p class="mb-4">
							<span class="opacity-50">Episode aired </span>
							<span class="opacity-50 [view-transition-name:episode-date]">
								{query.data?.air_date}
							</span>
						</p>
					</div>
					<img
						src={`/episodes/${query.data?.episode}.jpg`}
						alt=""
						width="500"
						height="281"
						class="w-full rounded [view-transition-name:episode-poster]"
						loading="eager"
					/>
				</header>
			</Match>
			<Match when={query.isLoading}>
				<div>Loading</div>
			</Match>
			<Match when={query.isError}>
				<div>Error: {query.error?.message}</div>
			</Match>
		</Switch>
	)
}
