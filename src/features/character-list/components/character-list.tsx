import { Fragment } from "react"
import { getCharacters, type Character, type Info } from "rickmortyapi"
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query"
import { getQueryClient } from "@/lib/query"
import CharacterCard from "@/components/character-card"
import CharacterListEnd from "./character-list-end"

type InitialData = InfiniteData<Info<Character[]>, number>

const useCharacters = (initialData: InitialData) => {
	const queryClient = getQueryClient()

	return useInfiniteQuery(
		{
			queryKey: ["characters"],
			queryFn: async ({ pageParam }) => {
				const response = (await getCharacters({ page: pageParam })).data
				// https://tkdodo.eu/blog/seeding-the-query-cache
				response.results?.forEach((character) => {
					queryClient.setQueryData(["character", character.id], character)
				})

				return response
			},
			initialData,
			initialPageParam: 1,
			getNextPageParam: (lastPage) => {
				if (!lastPage.info || !lastPage.info.next) {
					return null
				}
				const url = new URL(lastPage.info.next)
				const nextPage = url.searchParams.get("page")
				if (!nextPage) return null
				return parseInt(nextPage, 10)
			},
		},
		queryClient,
	)
}

interface CharacterListProps {
	initialData: InitialData
}

export default function CharacterList({ initialData }: CharacterListProps) {
	const {
		data,
		isLoading,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useCharacters(initialData)

	if (data) {
		return (
			<section>
				<div className="mb-8 text-4xl font-semibold">
					<h1 className="inline">Characters</h1>
					{data.pages[0]?.info ? (
						<span className="ml-2 text-quantum">
							{data.pages[0].info.count}
						</span>
					) : null}
				</div>
				<ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
					{data.pages.map((page, i) => (
						<Fragment key={i}>
							{page.results?.map((character) => (
								<li key={character.id} className="grid">
									<CharacterCard id={character.id} initialData={character} />
								</li>
							))}
						</Fragment>
					))}
				</ul>
				<CharacterListEnd
					loadFn={fetchNextPage}
					isLoading={isFetchingNextPage}
					hasMorePages={hasNextPage}
				/>
			</section>
		)
	}

	if (isLoading) {
		return <span>Loading...</span>
	}

	return <div>Error: {error?.message}</div>
}
