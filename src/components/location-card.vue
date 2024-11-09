<script setup lang="ts">
import type { Location } from "rickmortyapi"
import { useQuery } from "@tanstack/vue-query"
import { getQueryClient } from "@/lib/query"
import { batchLocations } from "@/lib/batch"
import { pluralize } from "@/lib/utils"
import portalSvg from "@/assets/portal.svg"

const props = defineProps<{ id: number; initialData?: Location }>()

const queryClient = getQueryClient()

const { isPending, data, error } = useQuery(
	{
		queryKey: ["location", props.id],
		queryFn: () => batchLocations.fetch(props.id),
		initialData: props.initialData,
	},
	queryClient,
)
</script>

<template>
	<a :href="`/locations/${id}`" class="group" data-card>
		<div v-if="data" class="flex items-center gap-x-3">
			<img
				:src="portalSvg.src"
				:width="portalSvg.width"
				:height="portalSvg.height"
				alt=""
				class="w-20"
			/>
			<div>
				<p>
					<span
						class="font-medium group-data-[card=active]:[view-transition-name:location-name]"
						>{{ data.name }}</span
					>
					<span
						v-if="
							data.type &&
							data.type !== 'unknown' &&
							!data.name
								.toLocaleLowerCase()
								.includes(data.type.toLocaleLowerCase())
						"
						class="opacity-50 group-data-[card=active]:[view-transition-name:location-type]"
					>
						{{ " " + data.type }}</span
					>
				</p>
				<p v-if="data.dimension && data.dimension !== 'unknown'">
					<span
						class="text-quantum group-data-[card=active]:[view-transition-name:location-dimension]"
					>
						{{ data.dimension }}
					</span>
				</p>
				<p v-if="data.residents.length" class="opacity-50">
					{{ data.residents.length }}
					{{ pluralize(data.residents.length, "resident", "residents") }}
				</p>
			</div>
		</div>
		<div v-else-if="isPending">Loading...</div>
		<div v-else>Error: {{ error?.message }}</div>
	</a>
</template>
