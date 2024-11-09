import { QueryClient } from "@tanstack/vue-query"

let queryClient: QueryClient | undefined

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: Infinity,
			},
		},
	})
}

export const getQueryClient = () => {
	if (import.meta.env.SSR) {
		return makeQueryClient()
	} else {
		if (!queryClient) {
			queryClient = makeQueryClient()
		}
		return queryClient
	}
}
