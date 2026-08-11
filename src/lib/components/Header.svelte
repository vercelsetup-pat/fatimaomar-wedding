<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { language } from '$lib/stores/languages';
	import englishInvitation from '$lib/assets/envEn.png';
	import arabicInvitation from "$lib/assets/envAr.png"

	let visible = $state(false);

	onMount(() => {
		visible = true;
	});
</script>

{#if visible}
	<div class="invitation-page" in:fade={{ duration: 800 }}>
		<!-- Language switch -->
		<div class="top-bar">
			<div class="language-switch gap-2">
				<button
					type="button"
					class:active={$language === 'ar'}
					onclick={() => language.set('ar')}
					aria-label="Switch to Arabic"
				>
					Ar
				</button>

				<button
					type="button"
					class:active={$language === 'en'}
					onclick={() => language.set('en')}
					aria-label="Switch to English"
				>
					En
				</button>
			</div>
		</div>

		<!-- Invitation image -->
		<!-- svelte-ignore a11y_img_redundant_alt -->
		<img
			src={$language === 'ar' ? arabicInvitation : englishInvitation}
			alt={$language === 'ar'
				? 'دعوة زفاف جبرين وسيرين'
				: 'Jebrine and Cyrine wedding invitation'}
			class="invitation-image"
		/>
	</div>
{/if}

<style>
	/* Main page */
	.invitation-page {
		position: relative;
		width: 100%;
		max-width: 430px;
		min-height: 100vh;
		margin: 0 auto;
		overflow: hidden;
		background: #f8f2ef;
		box-shadow:
			0 20px 50px rgba(130, 80, 90, 0.14);
	}

	/* Invitation image */
	.invitation-image {
		display: block;
		width: 100%;
		height: 100vh;
		object-fit: cover;
		object-position: center;
		user-select: none;
		transition: opacity 0.4s ease, transform 0.4s ease;
	}

	.top-bar {
		position: absolute;
		top: 30px;
		right: 18px;
		z-index: 10;
	}

	.language-switch {
		display: flex;
		align-items: center;
		padding: 5px 8px;
		background: rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(255, 255, 255, 0.8);
		border-radius: 999px;
		box-shadow:0 10px 25px rgba(75, 45, 45, 0.16);
	}

	.language-switch button {
		padding: 8px 14px;
		border: none;
		border-radius: 999px;
		background: transparent;
		cursor: pointer;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 0.85rem;
		color: #9c6268;
		transition:
			background 0.25s ease,
			color 0.25s ease;
	}

	.language-switch button:hover {
		background: rgba(157, 98, 104, 0.08);
	}

	.language-switch button.active {
		color: white;
        background-color: var(--primary);
		font-weight: 600;
	}

	/* Mobile */
	@media (max-width: 480px) {
		.invitation-page {
			max-width: 100%;
		}

		.top-bar {
			top: 16px;
			right: 16px;
		}

		.invitation-image {
			min-height: 100svh;
		}
	}
</style>