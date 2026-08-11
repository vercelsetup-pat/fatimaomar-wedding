<script lang="ts">
	import venueImage from '$lib/assets/venue.png';
	import FadeIn from "$lib/components/FadeIn.svelte";

	function openLocation() {
		window.open(
			'https://www.google.com/maps/search/?api=1&query=Wedding+Venue',
			'_blank'
		);

	};
</script>

<div class="relative mx-auto min-h-[503px] w-full max-w-[430px] overflow-hidden bg-white">
	<div class="absolute left-0 top-[198px] z-0 h-[calc(100%-198px)] w-full bg-[#b98983]"></div>
	<div class="image-container">
		<FadeIn><img src={venueImage} alt="Wedding venue"/></FadeIn>
	</div>

	<!-- Content -->
	<div class="relative z-[3] px-[46px] pb-[42px] pt-[15px] text-center">
		<div class="space-y-4">
			<FadeIn><h1 class="h1 text-white">Wedding Venue</h1></FadeIn>
			<FadeIn>
				<h2 class="h2 text-white">
					EVERY MOMENT BRING US ONE STEP CLOSER TO<br />
					CELEBRATING TOGETHER
				</h2>
			</FadeIn>
		</div>
		<section class="details-section">
			<FadeIn><h1 class="h1 text-white">Details</h1></FadeIn>
			<FadeIn>
				<h2 class="text-lg text-white">
					7:00 PM<br />
					Jupiter Bnachii<br/>
				</h2>
			</FadeIn>
		</section>
		<FadeIn>
			<button type="button" class="location-button mt-3" onclick={openLocation}>
				<svg width="21" height="21" viewBox="0 0 24 24" fill="none">
					<path
						d="M20 10C20 15 12 22 12 22C12 22 4 15 4 10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10Z"
						fill="currentColor"
					/>
					<circle
						cx="12"
						cy="10"
						r="2.5"
						fill="white"
					/>
				</svg>

				<span>Tap to open the location</span>
			</button>
		</FadeIn>
	</div>
</div>

<style>
	.image-container {
		position: relative;
		z-index: 2;
		width: calc(100% - 44px);
		margin-left: 22px;
		padding-top: 20px;
	}

	.image-container img {
		display: block;
		width: 100%;
		height: 257px;
		object-fit: cover;
		object-position: center;
	}

	.location-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		width: 100%;
		height: 47px;
		border: none;
		border-radius: 11px;
		background: white;
		color: #ad5f56;
		font-family: 'Montserrat', sans-serif;
		font-size: 16px;
		font-weight: 400;
		cursor: pointer;
	}

	.location-button svg {
		flex-shrink: 0;
	}

	@media (max-width: 430px) {
		
		.image-container {
			width: calc(100% - 44px);
			margin-left: 22px;
		}

		.image-container img {
			height: auto;
			aspect-ratio: 384 / 257;
		}
	}

	.details-section {
		width: 100%;
		max-width: 430px;
		margin: 0 auto;
		padding-top: 35px;
		padding-bottom: 35px;
		text-align: center;
		color: #a85f57;
	}

	@media (max-width: 430px) {

		.details-section {
			padding-top: 45px;
		}
	
	}
</style>