<script setup lang="ts">
import { getCharacter, type Character } from "rickmortyapi"
import { useQuery } from "@tanstack/vue-query"
import { getQueryClient } from "@/lib/query"

const props = defineProps<{ id: number; initialData?: Character | undefined }>()

const queryClient = getQueryClient()

const { isLoading, data, error } = useQuery(
	{
		queryKey: ["character", props.id],
		queryFn: async () => (await getCharacter(props.id)).data,
		initialData: props.initialData,
	},
	queryClient,
)
</script>

<template>
	<header v-if="data" class="flex flex-col gap-4 sm:flex-row">
		<div class="sm:order-last">
			<h1 class="text-3xl font-semibold">
				<span class="[view-transition-name:character-name]">{{
					data.name
				}}</span>
			</h1>
			<p
				v-if="data.gender !== 'unknown' || data.species !== 'unknown'"
				class="mb-4 text-quantum"
			>
				<span class="[view-transition-name:character-type]">
					<template v-if="data.gender !== 'unknown'">{{
						data.gender
					}}</template>
					<template
						v-if="data.gender !== 'unknown' && data.species !== 'unknown'"
					>
						•
					</template>
					<template v-if="data.species !== 'unknown'">{{
						data.species
					}}</template>
				</span>
			</p>
			<p v-if="data.location.name !== 'unknown'">
				<span class="opacity-50">Last known location: </span>
				<span class="[view-transition-name:character-location]">
					{{ data.location.name }}
				</span>
			</p>
			<p v-if="data.origin.name !== 'unknown'">
				<span class="opacity-50">Origin: </span>
				<span class="[view-transition-name:character-origin]">{{
					data.origin.name
				}}</span>
			</p>
			<p>
				<span class="opacity-50">Alive: </span>
				<span v-if="data.status === 'Alive'" class="text-quantum">Yes</span>
				<span v-else-if="data.status === 'Dead'" class="text-red-500">No</span>
				<span v-else>Unknown</span>
			</p>
		</div>
		<img
			:src="data.image"
			alt=""
			class="w-full flex-shrink-0 rounded [view-transition-name:character-image] sm:size-48"
			width="300"
			height="300"
			loading="eager"
		/>
	</header>
	<header v-else-if="isLoading">
		<h1>Loading...</h1>
	</header>
	<div v-else>Error: {{ error?.message }}</div>
</template>
