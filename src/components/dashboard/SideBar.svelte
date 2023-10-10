<script lang="ts">
	import { fade } from "svelte/transition";
	import { createEventDispatcher } from "svelte";
	import { SidebarButtons } from "../../constants/SideBar";

	let expandSidebar = false;
	
	export let selected: string | null = "pets";

	// Create dispatcher for button events
	const dispatcher = createEventDispatcher();
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
	id="sidebar"
	class="bg-slate-700 rounded-xl flex flex-col w-16 h-full pt-4"
	class:w-40={expandSidebar}
	on:mouseover={() => (expandSidebar = true)}
	on:mouseleave={() => (expandSidebar = false)}
>
	{#each SidebarButtons as SidebarButton}
		<button
			id={SidebarButton.id}
			class="sidebar_button mr-auto flex w-full h-14 items-center"
			class:bg-slate-600={SidebarButton.id === selected}
			on:click={() => dispatcher("button", { id: SidebarButton.id })}
		>
			<div
				class="sidebar_button_contents flex gap-3"
				class:text-accent-light={SidebarButton.id === selected}
			>
				<iconify-icon
					class="ml-4"
					icon={SidebarButton.icon}
					height="30"
					width="30"
				/>
				{#if expandSidebar}
					<div class="text-xl" transition:fade={{ duration: 250 }}>
						{SidebarButton.name}
					</div>
				{/if}
			</div>
		</button>
	{/each}
</div>

<style>
	#sidebar {
		transition: width 0.2s ease-in-out;
	}

	.sidebar_button {
		transition: background-color 0.4s;
	}
	
	.sidebar_button_contents {
		transition-property: color, transform;
		transition-duration: 0.2s;
	}

	.sidebar_button_contents:hover {
		color: rgb(var(--accent-light));
		transform: translateX(4px);
	}
</style>
