import { useEffect } from "react"
import { useInView } from "@/composables/hooks.react"

interface CharacterListEndProps {
	loadFn: () => void
	isLoading: boolean
	hasMorePages: boolean
}

export default function CharacterListEnd({
	loadFn,
	isLoading,
	hasMorePages,
}: CharacterListEndProps) {
	const { ref, inView } = useInView()

	useEffect(() => {
		if (inView && hasMorePages && !isLoading) {
			loadFn()
		}
	}, [hasMorePages, inView, isLoading, loadFn])

	return (
		<div className="flex justify-center py-8">
			<button
				ref={ref}
				onClick={() => loadFn()}
				disabled={!hasMorePages || isLoading}
				className="opacity-50"
			>
				{isLoading
					? "Loading..."
					: hasMorePages
						? "Click to load more"
						: "You have reached the end of the list"}
			</button>
		</div>
	)
}
