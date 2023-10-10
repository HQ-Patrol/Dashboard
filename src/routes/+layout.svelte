<script lang="ts">
	import "../app.css";
	import "iconify-icon";
	import NavBar from "../components/NavBar.svelte";
</script>

<div class="flex flex-col h-screen w-screen">
	<NavBar />
	<div class="flex-1 w-full h-full">
		<slot />
	</div>
</div>
