<script lang="ts">
	import type { Badge } from "../../../../types/Badge";

	export let badge: Badge;
</script>

<div class="border-2 border-sky-400 flex flex-col p-3 rounded-xl w-full">
	<div class="text-base text-sky-400">Display</div>
	<div>Badge Name: {badge.name}</div>
	<div>Badge Description: {badge?.description ?? "None Provided"}</div>
</div>
