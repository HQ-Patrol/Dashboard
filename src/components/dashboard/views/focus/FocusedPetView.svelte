<script lang="ts">
	import type { RawPet } from "../../../../types/Pet";

	export let pet: RawPet;
</script>

<div class="border-2 border-sky-400 flex flex-col p-3 rounded-xl w-full">
	<div class="text-base text-sky-400">Display</div>
	<div>Name: {pet.name}</div>
	<div>UID: {pet.UID}</div>
	<div>Evolution: {"⭐️".repeat(pet.id)}</div>
	<div>Species: {pet.species}</div>
	<div>Rarity: {pet?.rarity ?? "None Provided"}</div>
</div>
