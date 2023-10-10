<script lang="ts">
	import { items } from "../../../data/Items.json";
	import { pets } from "../../../data/Pets.json";
	import { badges } from "../../../data/Badges.json";
	import type { Badge } from "../../../types/Badge";
	import type { Item } from "../../../types/Item";
	import type { RawPet } from "../../../types/Pet";
	import Modal from "../Modal.svelte";
	import FocusedItemView from "./focus/FocusedItemView.svelte";
	import FocusedPetView from "./focus/FocusedPetView.svelte";
	import FocusedBadgeView from "./focus/FocusedBadgeView.svelte";
	import { searchBadge, searchItem, searchPet } from "$lib/utility/fuzzy";

	const ITEMS = items as Item[];
	const BADGES = badges as Badge[];
	const PETS = pets as RawPet[];

	let itemsFilterChecked = false;
	let petsFilterChecked = false;
	let badgesFilterChecked = false;

	// Split focused into three variables due to Svelte complications
	let focusedItem: Item | null = null; // Bound to checkbox
	let focusedBadge: Badge | null = BADGES[4]; // Bound to checkbox
	let focusedPet: RawPet | null = null; // Bound to checkbox
	let showModal = false;

	// Handle searching
	const DEFAULT_RESULTS = [...items, ...badges, ...pets];
	const N_RESULTS = 10; // 10 results

	let searchQuery = ""; // Bound to search box
	let results: (Item | Badge | RawPet)[] = DEFAULT_RESULTS;
	function search() {
		if (!searchQuery || searchQuery.trim().length === 0) {
			if (
				!itemsFilterChecked &&
				!petsFilterChecked &&
				!badgesFilterChecked
			) {
				results = DEFAULT_RESULTS;
			} else {
				results = [
					...(itemsFilterChecked ? items : []),
					...(badgesFilterChecked ? badges : []),
					...(petsFilterChecked ? pets : []),
				];
			}
			return;
		}

		let search = [];
		if (!itemsFilterChecked && !petsFilterChecked && !badgesFilterChecked) {
			search = [
				...(searchItem(searchQuery) || []).slice(0, N_RESULTS),
				...(searchBadge(searchQuery) || []).slice(0, N_RESULTS),
				...(searchPet(searchQuery) || []).slice(0, N_RESULTS),
			];
		} else {
			if (itemsFilterChecked)
				search.push(
					...(searchItem(searchQuery) || []).slice(0, N_RESULTS)
				);
			if (petsFilterChecked)
				search.push(
					...(searchPet(searchQuery) || []).slice(0, N_RESULTS)
				);
			if (badgesFilterChecked)
				search.push(
					...(searchBadge(searchQuery) || []).slice(0, N_RESULTS)
				);
		}

		search.sort((a, b) => b.similarity - a.similarity);

		results = search.slice(0, N_RESULTS).map((i: any) => {
			if (i?.pet) return i.pet;
			if (i?.badge) return i.badge;
			if (i?.item) return i.item;
		});
	}

	function handleClickable(name: string) {
		let itemFind = ITEMS.find((i) => i.name === name);
		let petFind = PETS.find((i) => i.name === name);
		let badgeFind = BADGES.find((i) => i.name === name);
		if (!itemFind && !petFind && !badgeFind) return;

		focusedItem = null;
		focusedBadge = null;
		focusedPet = null;
		if (itemFind) focusedItem = itemFind;
		if (badgeFind) focusedBadge = badgeFind;
		if (petFind) focusedPet = petFind;

		showModal = true;
	}
</script>

<div class="w-full h-full flex flex-col font-dm gap-4 p-7">
	<div class="flex gap-2 items-end">
		<div class="font-bold text-3xl">Finder</div>
		<div>Search in the data</div>
	</div>

	<div class="relative">
		<iconify-icon
			icon="fa6-solid:magnifying-glass"
			class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500"
		/>
		<input
			type="search"
			class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			placeholder="Search items, badges or pets..."
			required
			bind:value={searchQuery}
			on:keyup={search}
		/>
	</div>

	<div class="flex gap-2 items-center">
		<div class="text-xl">Filters</div>
		<div class="checkbox-rect">
			<input
				type="checkbox"
				id="select_pets"
				name="pets"
				bind:checked={petsFilterChecked}
				on:change={search}
			/>
			<label for="select_pets">Pets</label>
		</div>
		<div class="checkbox-rect">
			<input
				type="checkbox"
				id="select_items"
				name="items"
				bind:checked={itemsFilterChecked}
				on:change={search}
			/>
			<label for="select_items">Items</label>
		</div>
		<div class="checkbox-rect">
			<input
				type="checkbox"
				id="select_badges"
				name="badges"
				bind:checked={badgesFilterChecked}
				on:change={search}
			/>
			<label for="select_badges">Badges</label>
		</div>
	</div>

	<div class="flex-1 overflow-y-auto flex flex-wrap gap-4 p-3" id="data">
		{#each results as item}
			<button
				class="clickable"
				on:click={() => handleClickable(item.name)}
			>
				{item.name}
			</button>
		{/each}
	</div>

	<Modal bind:showModal>
		<h1 class="text-xl" slot="header">
			{#if focusedItem}
				Item Information
			{:else if focusedPet}
				Pet Information
			{:else if focusedBadge}
				Badge Information
			{/if}
		</h1>

		<div class="font-dm w-96 h-80 flex flex-col gap-2 text-sm">
			{#if focusedItem}
				<FocusedItemView item={focusedItem} />
			{:else if focusedPet}
				<FocusedPetView pet={focusedPet} />
			{:else if focusedBadge}
				<FocusedBadgeView badge={focusedBadge} />
			{/if}
		</div>
	</Modal>
</div>

<style>
	.clickable {
		width: 160px;
		height: 160px;
		background-color: rgb(51, 65, 85);
		border-radius: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		transition-property: scale, background-color;
		transition-duration: 0.3s;
	}

	.clickable:hover {
		background-color: rgb(33, 41, 53);
		scale: 1.1;
	}

	.checkbox-rect input[type="checkbox"] {
		display: none;
	}
	.checkbox-rect input[type="checkbox"] + label {
		display: block;
		position: relative;
		padding-left: 25px;
		margin-bottom: 20px;
		font: 14px/20px "Open Sans", Arial, sans-serif;
		cursor: pointer;
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
	}
	.checkbox-rect input[type="checkbox"]:hover + label:before {
		background: var(--color-special);
		box-shadow: inset 0px 0px 0px 2px #f7f2f2;
	}
	.checkbox-rect input[type="checkbox"] + label:last-child {
		margin-bottom: 0;
	}
	.checkbox-rect input[type="checkbox"] + label:before {
		content: "";
		display: block;
		width: 1.4em;
		height: 1.4em;
		border: 1px solid #343a3f;
		border-radius: 0.2em;
		position: absolute;
		left: 0;
		top: 0;
		-webkit-transition: all 0.2s, 0.2s ease-in-out;
		transition: all 0.2s, 0.2s ease-in-out;
		background: #f3f3f3;
	}
	.checkbox-rect input[type="checkbox"]:checked + label:before {
		width: 1.3em;
		height: 1.3em;
		border-radius: 0.2em;
		border: 2px solid #fff;
		-webkit-transform: rotate(90deg);
		transform: rotate(90deg);
		background: rgb(var(--accent-light));
		box-shadow: 0 0 0 1px #000;
	}

	#data::-webkit-scrollbar {
		width: 20px;
	}

	#data::-webkit-scrollbar-track {
		background-color: #0000000d;
		border-radius: 100px;
	}

	#data::-webkit-scrollbar-thumb {
		border-radius: 100px;
		border: 5px solid transparent;
		background-clip: content-box;
		background-color: rgb(var(--accent-light));
	}
</style>
