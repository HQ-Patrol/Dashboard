// Credits: Badosz from the Dank Memer team
import { items } from "../../data/Items.json";
import { pets } from "../../data/Pets.json";
import { badges } from "../../data/Badges.json";
import type { Item } from "../../types/Item";
import type { RawPet } from "../../types/Pet";
import type { Badge } from "../../types/Badge";

function similarityBetween(s1: string, s2: string) {
	let longer = s1;
	let shorter = s2;
	if (s1.length < s2.length) {
		longer = s2;
		shorter = s1;
	}
	const longerLength = longer.length;
	if (longerLength === 0) {
		return 1.0;
	}
	return (
		(longerLength - editDistance(longer, shorter)) /
		parseFloat(longerLength.toString())
	);
}

function editDistance(s1: string, s2: string) {
	s1 = s1.toLowerCase();
	s2 = s2.toLowerCase();

	const costs = [];
	for (let i = 0; i <= s1.length; i++) {
		let lastValue = i;
		for (let j = 0; j <= s2.length; j++) {
			if (i === 0) {
				costs[j] = j;
			} else {
				if (j > 0) {
					let newValue = costs[j - 1];
					if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
						newValue =
							Math.min(Math.min(newValue, lastValue), costs[j]) +
							1;
					}
					costs[j - 1] = lastValue;
					lastValue = newValue;
				}
			}
		}
		if (i > 0) {
			costs[s2.length] = lastValue;
		}
	}
	return costs[s2.length];
}

interface SearchItemCandidate {
	item: Item,
	similarity: number
}

export function searchItem(query: string): SearchItemCandidate[] | false {
	query = query.toLowerCase();

	const target = items;
	const candidates: SearchItemCandidate[] = [];

	for (const item in target) {
		const candidate = {
			item: target[item],
			similarity: 0,
		};

		if (candidate.item.name2.toLowerCase() === query) {
			candidate.similarity = 1;
		} else if (candidate.item.name.toLowerCase() === query) {
			candidate.similarity = 0.999;
		} else if (
			candidate.item.name.toLowerCase().includes(" " + query + " ") ||
			candidate.item.name2.includes(" " + query + " ")
		) {
			candidate.similarity = 0.998;
		} else if (
			candidate.item.name.toLowerCase().includes(query + " ") ||
			candidate.item.name2.includes(query + " ")
		) {
			candidate.similarity = 0.997;
		} else if (
			candidate.item.name.toLowerCase().includes(" " + query) ||
			candidate.item.name2.includes(" " + query)
		) {
			candidate.similarity = 0.997;
		} else if (
			candidate.item.name.toLowerCase().includes(query) ||
			candidate.item.name2.includes(query)
		) {
			candidate.similarity = 0.996;
		} else {
			const similarity = similarityBetween(query, candidate.item.name);
			candidate.similarity = similarity;
		}

		candidates.push(candidate as SearchItemCandidate);
	}

	return candidates.length
		? candidates.sort((a, b) => b.similarity - a.similarity)
		: false;
}

interface SearchPetCandidate {
	pet: RawPet,
	similarity: number
}

export function searchPet(query: string): SearchPetCandidate[] | false {
	query = query.toLowerCase();

	const target = pets;
	const candidates: SearchPetCandidate[] = [];

	for (const pet in target) {
		const candidate = {
			pet: target[pet],
			similarity: 0,
		};

		if (candidate.pet.name.toLowerCase() === query) {
			candidate.similarity = 1;
		} else if (
			candidate.pet.name.toLowerCase().includes(" " + query + " ")
		) {
			candidate.similarity = 0.998;
		} else if (
			candidate.pet.name.toLowerCase().includes(query + " ")
		) {
			candidate.similarity = 0.997;
		} else if (
			candidate.pet.name.toLowerCase().includes(" " + query)
		) {
			candidate.similarity = 0.997;
		} else if (
			candidate.pet.name.toLowerCase().includes(query)
		) {
			candidate.similarity = 0.996;
		} else {
			const similarity = similarityBetween(query, candidate.pet.name);
			candidate.similarity = similarity;
		}

		candidates.push(candidate as SearchPetCandidate);
	}

	return candidates.length
		? candidates.sort((a, b) => b.similarity - a.similarity)
		: false;
}

interface SearchBadgeCandidate {
	badge: Badge,
	similarity: number
}

export function searchBadge(query: string): SearchBadgeCandidate[] | false {
	query = query.toLowerCase();

	const target = badges;
	const candidates: SearchBadgeCandidate[] = [];

	for (const badge in target) {
		const candidate = {
			badge: target[badge],
			similarity: 0,
		};

		if (candidate.badge.name.toLowerCase() === query) {
			candidate.similarity = 1;
		} else if (
			candidate.badge.name.toLowerCase().includes(" " + query + " ")
		) {
			candidate.similarity = 0.998;
		} else if (
			candidate.badge.name.toLowerCase().includes(query + " ")
		) {
			candidate.similarity = 0.997;
		} else if (
			candidate.badge.name.toLowerCase().includes(" " + query)
		) {
			candidate.similarity = 0.997;
		} else if (
			candidate.badge.name.toLowerCase().includes(query)
		) {
			candidate.similarity = 0.996;
		} else if (
			candidate.badge.description.toLowerCase().includes(query)
		) {
			candidate.similarity = 0.996;
		} else {
			const similarity = similarityBetween(query, candidate.badge.name);
			candidate.similarity = similarity;
		}

		candidates.push(candidate as SearchBadgeCandidate);
	}

	return candidates.length
		? candidates.sort((a, b) => b.similarity - a.similarity)
		: false;
}
