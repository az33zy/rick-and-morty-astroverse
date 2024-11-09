import {
	getCharacter,
	getEpisode,
	getLocation,
	type ApiResponse,
} from "rickmortyapi"
import { create, keyResolver, windowScheduler } from "@yornaath/batshit"

const batchIds = <T extends { id: number }>(
	fetchFn: (ids: number[]) => Promise<ApiResponse<T | T[]>>,
) => {
	return create({
		fetcher: async (ids: number[]) => {
			const res = await fetchFn(ids)
			// api client returns a single element if there is only one id passed
			return Array.isArray(res.data) ? res.data : [res.data]
		},
		resolver: keyResolver("id"),
		scheduler: windowScheduler(10),
	})
}

export const batchCharacters = batchIds(getCharacter)
export const batchLocations = batchIds(getLocation)
export const batchEpisodes = batchIds(getEpisode)
