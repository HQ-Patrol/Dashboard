<script lang="ts">
	export let showModal = false;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" class="text-xl" />
		<hr class="my-2" />
		<div id="modal">
			<slot />
		</div>
		<!-- svelte-ignore a11y-autofocus -->
		<div class="flex justify-center items-center">
			<button
				autofocus
				on:click={() => dialog.close()}
				class="px-6 py-2 bg-green-500 mt-5 rounded-xl hover:bg-green-700 transition-colors"
				>Close</button
			>
		</div>
	</div>
</dialog>

<style>
	dialog {
		border-radius: 16px;
		border: none;
		padding: 0;
		background-color: rgba(0, 0, 0, 0.8);
		color: white;
		z-index: 100;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(2px);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}

	#modal {
		overflow-y: auto;
	}
	#modal::-webkit-scrollbar {
		width: 20px;
	}

	#modal::-webkit-scrollbar-track {
		background-color: #0000000d;
		border-radius: 100px;
	}

	#modal::-webkit-scrollbar-thumb {
		border-radius: 100px;
		border: 5px solid transparent;
		background-clip: content-box;
		background-color: rgb(var(--accent-light));
	}
</style>
