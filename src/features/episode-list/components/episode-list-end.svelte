<script lang="ts">
	import { inView } from "@/composables/actions.svelte"

	interface Props {
		loadFn: () => void
		isLoading: boolean
		hasMorePages: boolean
	}

	let { loadFn, isLoading, hasMorePages }: Props = $props()
</script>

<div class="flex justify-center py-8">
	<button
		onclick={loadFn}
		disabled={!hasMorePages || isLoading}
		class="opacity-50"
		use:inView={(isInView) => {
			if (isInView && hasMorePages && !isLoading) {
				loadFn()
			}
		}}
	>
		{#if isLoading}
			Loading...
		{:else if hasMorePages}
			Click to load more
		{:else}
			You have reached the end of the list
		{/if}
	</button>
</div>
