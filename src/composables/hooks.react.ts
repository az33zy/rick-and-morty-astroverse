import { useEffect, useRef, useState } from "react"

export function useInView(options?: IntersectionObserverInit) {
	const ref = useRef(null)
	const [inView, setInView] = useState(false)

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			const [entry] = entries
			if (entry) {
				setInView(entry.isIntersecting)
			}
		}, options)

		const node = ref.current

		if (node) observer.observe(node)

		return () => {
			if (node) observer.unobserve(node)
			observer.disconnect()
		}
	}, [options])

	return {
		ref,
		inView,
	}
}
