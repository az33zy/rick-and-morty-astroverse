import type { Character } from "rickmortyapi"
import { useQuery } from "@tanstack/react-query"
import { getQueryClient } from "@/lib/query"
import { batchCharacters } from "@/lib/batch"
import { cn, pluralize } from "@/lib/utils"
import houseSvg from "@/assets/house.svg"
import pinSvg from "@/assets/pin.svg"
import crossPng from "@/assets/cross.png"

const useCharacter = (id: number, initialData?: Character) => {
	const queryClient = getQueryClient()

	return useQuery(
		{
			queryKey: ["character", id],
			queryFn: () => batchCharacters.fetch(id),
			initialData,
		},
		queryClient,
	)
}

interface CharacterCardProps {
	id: number
	initialData?: Character
}

export default function CharacterCard({ id, initialData }: CharacterCardProps) {
	const { data, isLoading } = useCharacter(id, initialData)

	if (data) {
		return (
			<a
				href={`/characters/${id}`}
				className={cn(
					"group flex flex-col rounded-xl border border-white/10 bg-black p-2",
				)}
				data-card
			>
				<div className="relative">
					<img
						src={data.image}
						alt=""
						width={300}
						height={300}
						className={cn(
							"w-full rounded-t group-data-[card=active]:[view-transition-name:character-image]",
							{
								"saturate-0": data.status === "Dead",
							},
						)}
					/>
					{data.status === "Dead" ? (
						<img
							src={crossPng.src}
							alt="Dead"
							width={360}
							height={360}
							className="absolute inset-0 opacity-50"
						/>
					) : null}
				</div>
				<div
					className={cn("bg-unknown", {
						"bg-human": data.species === "Human",
						"bg-alien": data.species === "Alien",
						"bg-humanoid": data.species === "Humanoid",
						"bg-poopybutthole text-black": data.species === "Poopybutthole",
						"bg-mythological-creature":
							data.species === "Mythological Creature",
						"bg-animal": data.species === "Animal",
						"bg-robot": data.species === "Robot",
						"bg-cronenberg": data.species === "Cronenberg",
						"bg-disease": data.species === "Disease",
					})}
				>
					<p className="px-2 pt-2 text-lg/tight font-medium uppercase">
						<span className="group-data-[card=active]:[view-transition-name:character-name]">
							{data.name}
						</span>
					</p>
					<p className="px-2 pb-2 text-sm/tight tracking-tight">{data.type}</p>

					{data.gender !== "unknown" || data.species !== "unknown" ? (
						<p className="bg-black/25 text-center text-xs italic">
							<span className="group-data-[card=active]:[view-transition-name:character-type]">
								{data.gender !== "unknown" ? data.gender : null}
								{data.gender !== "unknown" && data.species !== "unknown"
									? " • "
									: null}
								{data.species !== "unknown" ? data.species : null}
							</span>
						</p>
					) : null}
				</div>
				<div className="flex flex-1 flex-col justify-center rounded-b bg-[#ECCE8F] px-2 py-4 text-sm italic text-black">
					{data.location.name !== "unknown" ? (
						<p>
							<img
								src={pinSvg.src}
								width={pinSvg.width}
								height={pinSvg.height}
								alt="Last known location"
								className="-mt-0.5 mr-1 inline w-3.5"
							/>
							<span className="group-data-[card=active]:[view-transition-name:character-location]">
								{data.location.name}
							</span>
						</p>
					) : null}
					{data.origin.name !== "unknown" &&
					data.location.name !== data.origin.name ? (
						<p>
							<img
								src={houseSvg.src}
								width={pinSvg.width}
								height={pinSvg.height}
								alt="Origin"
								className="-mt-0.5 mr-1 inline w-3.5"
							/>
							<span className="group-data-[card=active]:[view-transition-name:character-origin]">
								{data.origin.name}
							</span>
						</p>
					) : null}
					<p className="pt-1 font-medium">
						{data.episode.length}{" "}
						{pluralize(data.episode.length, "episode", "episodes")}{" "}
					</p>
				</div>
			</a>
		)
	}

	if (isLoading) {
		return <div>loading...</div>
	}

	return <div>error</div>
}
