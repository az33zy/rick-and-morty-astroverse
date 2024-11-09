<script setup lang="ts">
import { ref, watch } from "vue"
import { useInView } from "@/composables/composables.vue"

const props = defineProps<{
	loadFn: () => void
	isLoading: boolean
	hasMorePages: boolean
}>()

const node = ref(null)

const { inView } = useInView(node)

watch(inView, (newInView) => {
	if (newInView && props.hasMorePages && !props.isLoading) {
		props.loadFn()
	}
})
</script>

<template>
	<div class="flex justify-center py-8">
		<button
			ref="node"
			:onclick="loadFn"
			:disabled="!hasMorePages || isLoading"
			class="opacity-50"
		>
			<template v-if="isLoading">Loading...</template>
			<template v-else-if="hasMorePages">Click to load more</template>
			<template v-else>You have reached the end of the list</template>
		</button>
	</div>
</template>
