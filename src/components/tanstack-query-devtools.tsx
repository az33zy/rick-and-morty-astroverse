import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { getQueryClient } from "@/lib/query"

export default function TanstackQueryDevtools() {
	return <ReactQueryDevtools client={getQueryClient()} />
}
