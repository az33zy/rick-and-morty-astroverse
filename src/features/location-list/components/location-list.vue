<script setup lang="ts">
import { getLocations, type Info, type Location } from "rickmortyapi"
import { useInfiniteQuery, type InfiniteData } from "@tanstack/vue-query"
import { getQueryClient } from "@/lib/query"
import LocationCard from "@/components/location-card.vue"
import LocationListEnd from "./location-list-end.vue"

type InitialData = InfiniteData<Info<Location[]>, number>

const props = defineProps<{
	initialData: InitialData
}>()

const queryClient = getQueryClient()

const useLocations = (initialData: InitialData) => {
	return useInfiniteQuery(
		{
			queryKey: ["locations"],
			queryFn: async ({ pageParam }) => {
				const response = (await getLocations({ page: pageParam })).data
				// https://tkdodo.eu/blog/seeding-the-query-cache
				response.results?.forEach((location) => {
					queryClient.setQueryData(["location", location.id], location)
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
}

const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useLocations(
	props.initialData,
)
</script>

<template>
	<section v-if="data">
		<div class="mb-8 text-4xl font-semibold">
			<h1 class="inline">Locations</h1>
			<span v-if="data.pages[0]?.info" class="ml-2 text-quantum">
				{{ data.pages[0].info.count }}
			</span>
		</div>
		<ul class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			<template v-for="page in data.pages">
				<li v-for="location in page.results" :key="location.id">
					<LocationCard :id="location.id" :initial-data="location">
						<template #portal>
							<slot name="portal" />
						</template>
					</LocationCard>
				</li>
			</template>
		</ul>
		<LocationListEnd
			:load-fn="fetchNextPage"
			:is-loading="isFetchingNextPage"
			:has-more-pages="hasNextPage"
		/>
	</section>
</template>
