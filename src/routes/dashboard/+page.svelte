<script lang="ts">
	import SideBar from "../../components/dashboard/SideBar.svelte";
	import DefaultView from "../../components/dashboard/views/DefaultView.svelte";
	import FinderView from "../../components/dashboard/views/FinderView.svelte";
	import type { SidebarID } from "../../constants/SideBar";

	let currentDashboard: SidebarID | null = null;
	function handleDashboardChange(event: CustomEvent<any>) {
		const id = event.detail.id as SidebarID;
		if(!id) return;

		if(currentDashboard === id) return;
		currentDashboard = id;
	}
</script>

<main>
	<SideBar on:button={handleDashboardChange} selected={currentDashboard}/>

	<div class="flex-1 bg-slate-600 rounded-xl w-full h-full">
		{#if !currentDashboard}
			<DefaultView/>
		{:else if currentDashboard === "pets"}
			<!-- empty -->
		{:else if currentDashboard === "economy"}
			<!-- empty -->
		{:else if currentDashboard === "logbook"}
			<!-- empty -->
		{:else if currentDashboard === "finder"}
			<FinderView/>
		{:else if currentDashboard === "badges"}
			<!-- empty -->
		{/if}
	</div>
</main>

<style>
	main {
		color: white;
		padding: 16px;
		padding-top: 4px;
		display: flex;
		height: 100%;
		width: 100%;
		gap: 12px;
	}
</style>
