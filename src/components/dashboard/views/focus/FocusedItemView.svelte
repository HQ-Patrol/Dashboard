<script lang="ts">
	import type { Item } from "../../../../types/Item";

	export let item: Item;
</script>

<div class="border-2 border-sky-400 flex flex-col p-3 rounded-xl w-full">
	<div class="text-base text-sky-400">Display</div>
	<div>Item Name: {item.name}</div>
	<div>
		Other names: {[item?.name2, item?.alias].filter(Boolean).join(", ")}
	</div>
	<div>Description: {item?.description}</div>
</div>

<div class="border-2 border-yellow-400 flex flex-col p-3 rounded-xl w-full">
	<div class="text-base text-yellow-400">Economy</div>
	<div>Price: {item?.price ?? "Priceless"}</div>
	<div>
		Sell Price: {item?.sellPrice ?? "None Provided"}
	</div>
	<div>
		Collateral Price: {item?.collateralPrice ?? "None Provided"}
	</div>
</div>

<div class="border-2 border-slate-400 flex flex-col p-3 rounded-xl w-full">
	<div class="text-base text-slate-400">Metadata</div>
	<div>Item Type: {item?.type ?? "None Provided"}</div>
	<div>
		Can Be Sold: {item?.data?.canBeSold ? "Yes" : "No"}
	</div>
	<div>
		Can Be Bought: {item?.data?.canBeBought ? "Yes" : "No"}
	</div>
	<div>
		Can Be Traded: {item?.data?.canBeTraded ? "Yes" : "No"}
	</div>
	<div>
		Can Be Used: {item?.data?.canBeUsed ? "Yes" : "No"}
	</div>
</div>
