import { onMounted, onUnmounted, ref, type Ref } from "vue"

export function useInView(node: Ref, options?: IntersectionObserverInit) {
	const inView = ref(false)

	let observer: IntersectionObserver | undefined

	onMounted(() => {
		if (node.value) {
			observer = new IntersectionObserver((entries) => {
				const [entry] = entries
				if (entry) {
					inView.value = entry.isIntersecting
				}
			}, options)
			observer.observe(node.value)
		}
	})

	onUnmounted(() => {
		if (observer) {
			observer.disconnect()
		}
	})

	return { inView }
}
