<script>
	import Close from 'svelte-material-icons/Close.svelte';
	import Menu from 'svelte-material-icons/Menu.svelte';
	import { focusTrap } from 'svelte-focus-trap';

	let showMenu = false;

	function handleMenuToggle() {
		showMenu = !showMenu;
		document.body.classList.toggle('no-scroll');
	}

	export let size = '3.2rem';
</script>

<button ariaLabel="Toggle menu" on:click={handleMenuToggle}>
	{#if showMenu}
		<Close {size} />
	{:else}
		<Menu {size} />
	{/if}
</button>

{#if showMenu}
	<div class="mobile-menu">
		<nav use:focusTrap>
			<div class="links">
				<a class="link" href="/">Home</a>
				<a class="link" href="/blog/posts">Blog</a>
				<a class="link" href="/contact">Contact</a>
			</div>
		</nav>
	</div>
{/if}

<style lang="scss">
	button {
		z-index: 150;
		position: relative;
		background: none;
		border: none;
		display: block;

		@media (min-width: 768px) {
			display: none;
		}
	}

	.mobile-menu {
		height: 100%;
		position: absolute;
		right: 0;
		top: 0;
		width: 100%;
		background-color: var(--c-white);
		padding: calc(var(--s-4-5) + 72px) var(--s-4-5) var(--s-4-5);
	}

	nav {
		display: flex;
		gap: var(--size-medium);
		flex-direction: column;
		align-items: flex-start;
		width: fit-content;
	}

	.links {
		color: var(--color-text);
		font-size: var(--font-size-body);
		text-decoration: none;
		padding: var(--size-base);
		font-weight: var(--font-weight-bold);
		display: flex;
		gap: var(--size-medium);
		flex-direction: column;
		align-items: flex-start;
		height: 100%;
	}
</style>
