import type { Location } from "rickmortyapi"
import { useQuery } from "@tanstack/react-query"
import { getQueryClient } from "@/lib/query"
import { batchLocations } from "@/lib/batch"
import { getIdFromUrl } from "@/lib/utils"
import CharacterCard from "@/components/character-card"

const useLocation = (id: number, initialData: Location) => {
	const queryClient = getQueryClient()

	return useQuery(
		{
			queryKey: ["location", id],
			queryFn: () => batchLocations.fetch(id),
			initialData,
			select: (data) => {
				return {
					...data,
					residents: data.residents.map(getIdFromUrl),
				}
			},
		},
		queryClient,
	)
}

export default function LocationResidents({
	id,
	initialData,
}: {
	id: number
	initialData: Location
}) {
	const { data, isLoading } = useLocation(id, initialData)

	if (data) {
		return (
			<section className="mt-10">
				<div className="mb-4 text-2xl font-semibold">
					<h2 className="inline">Residents</h2>
					<span className="ml-2 text-quantum">{data.residents.length}</span>
				</div>
				<ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
					{data.residents.map((resident) => (
						<li key={resident} className="grid">
							<CharacterCard id={resident} />
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
