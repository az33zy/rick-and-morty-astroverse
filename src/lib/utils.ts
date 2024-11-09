import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getIdFromUrl(url: string): number {
	const idMatch = url.match(/\d+$/)
	if (idMatch === null) return 0
	return parseInt(idMatch[0], 10)
}

export function pluralize(count: number, singular: string, plural: string) {
	return count === 1 ? singular : plural
}
