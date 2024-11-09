import type { Episode } from "rickmortyapi"
import { useQuery } from "@tanstack/react-query"
import { getQueryClient } from "@/lib/query"
import { batchEpisodes } from "@/lib/batch"
import { getIdFromUrl } from "@/lib/utils"
import CharacterCard from "@/components/character-card"

const useEpisode = (id: number, initialData: Episode) => {
	const queryClient = getQueryClient()

	return useQuery(
		{
			queryKey: ["episode", id],
			queryFn: () => batchEpisodes.fetch(id),
			initialData,
			select: (data) => {
				return {
					...data,
					characters: data.characters.map(getIdFromUrl),
				}
			},
		},
		queryClient,
	)
}

export default function EpisodeCharacters({
	id,
	initialData,
}: {
	id: number
	initialData: Episode
}) {
	const { data, isLoading } = useEpisode(id, initialData)

	if (data) {
		return (
			<section className="mt-10">
				<div className="mb-4 text-2xl font-semibold">
					<h2 className="inline">Characters</h2>
					<span className="ml-2 text-quantum">{data.characters.length}</span>
				</div>
				<ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
					{data.characters.map((character) => (
						<li key={character} className="grid">
							<CharacterCard id={character} />
						</li>
					))}
				</ul>
			</section>
		)
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	return <div>Error</div>
}
