export function inView(node: HTMLElement, fn: (inView: boolean) => void) {
	$effect(() => {
		const observer = new IntersectionObserver((entries) => {
			const [entry] = entries
			if (entry) {
				fn(entry.isIntersecting)
			}
		})
		observer.observe(node)

		return () => {
			observer.disconnect()
		}
	})
}
