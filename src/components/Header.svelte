<script lang="ts">
	import MobileNav from './MobileNav.svelte';
	import HeaderLogo from './HeaderLogo.svelte';
</script>

<header>
	<div class="inner-wrapper">
		<div class="navbar">
			<HeaderLogo />

			<nav class="desktop-menu">
				<ul role="menu">
					<li role="none"><a class="link" href="/" role="menuitem">Home</a></li>
					<li role="none">
						<button class="link" role="menuitem" aria-expanded="false" aria-haspopup="true">
							Services
						</button>

						<ul role="menu" class="popup">
							<li role="none">
								<a class="link" role="menuitem" href="/">Service</a>
							</li>
							<li role="none">
								<a class="link" role="menuitem" href="/">Service</a>
							</li>
						</ul>
					</li>
					<li role="none"><a class="link" href="/blog" role="menuitem">Blog</a></li>
					<li role="none"><a class="link" href="/contact" role="menuitem">Contact</a></li>
				</ul>
			</nav>

			<MobileNav />
		</div>
	</div>
</header>

<style lang="scss">
	header {
		box-shadow: var(--box-shadow-menu);
	}

	.navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--s-2-4) 0;
	}

	.desktop-menu {
		display: none;

		ul {
			display: flex;
			align-items: center;
			flex-direction: row;

			li {
				list-style: none;

				.link {
					font-size: var(--fs-nav);
					font-weight: var(--fw-semi-bold);
					padding: var(--s-1) var(--s-2);
					transition: color var(--transition);
					background: none;
					border: none;

					&:hover,
					&.active {
						color: var(--c-orange);
					}

					&[aria-haspopup='true'] {
						display: flex;
						gap: var(--s-1);
						align-items: center;

						svg {
							min-width: 24px;
							min-height: 24px;
						}
					}
				}
			}
		}

		.popup {
			display: block;
			position: relative;
			display: none;
			position: absolute;
			background-color: var(--c-white);
			border-radius: var(--border-radius-small);
			box-shadow: var(--box-shadow-menu);
			width: fit-content;
			padding: var(--s-1-2);

			&.show {
				display: block;
				animation: fadein 0.2s;
			}
		}

		@media (min-width: 768px) {
			display: flex;
			align-items: center;
		}
	}

	@keyframes fadein {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}
</style>
