<script lang="ts">
	let fullName = '';
	let email = '';
	let phone = '';
	let attendance: 'accept' | 'decline' | '' = '';
	let guests = 1;
	let message = '';

	let submitted = false;

	function confirmRsvp() {
		if (!fullName || !email || !phone || !attendance) {
			return;
		}

		submitted = true;

		// Replace this later with your backend/API call
		console.log({
			fullName,
			email,
			phone,
			attendance,
			guests,
			message
		});
	}
</script>

<svelte:head>
	<title>Wedding RSVP</title>
	<meta
		name="description"
		content="Wedding RSVP for Omar and Fatima"
	/>
</svelte:head>

<div class="rsvp-page">

	<div class="rsvp-card">

		<section class="header-section">
			<h2 class="h2 text-(--primary)">WE LOOK FORWARD TO CELEBRATING WITH YOU</h2>
			<h1 class="h1 text-(-primary)">Kindly Reply</h1>

			<h2 class="h2 text-(--primary)">
				Please let us know if you will be joining us
				for this beautiful celebration.
			</h2>
		</section>

		<form on:submit|preventDefault={confirmRsvp}>

			<!-- Personal information -->
			<div class="form-section">

				<div class="field">
					<label for="fullName">Full Name</label>

					<div class="input-wrapper">
						<span class="input-icon">♧</span>

						<input
							id="fullName"
							type="text"
							bind:value={fullName}
							placeholder="Your full name"
							required
						/>
					</div>
				</div>


				<div class="field">
					<label for="email">Email Address</label>

					<div class="input-wrapper">
						<span class="input-icon">@</span>

						<input
							id="email"
							type="email"
							bind:value={email}
							placeholder="Your email address"
							required
						/>
					</div>
				</div>


				<div class="field">
					<label for="phone">Phone Number</label>

					<div class="input-wrapper">
						<span class="input-icon">⌕</span>

						<input
							id="phone"
							type="tel"
							bind:value={phone}
							placeholder="Your phone number"
							required
						/>
					</div>
				</div>

			</div>


			<!-- Attendance -->
			<section class="attendance-section">

				<div class="section-title">
					<span></span>
					<h2>Will You Be Joining Us?</h2>
					<span></span>
				</div>


				<div class="attendance-options">

					<button
						type="button"
						class:active={attendance === 'accept'}
						class="attendance-card"
						on:click={() => attendance = 'accept'}
					>
						<span class="radio">
							{#if attendance === 'accept'}
								<span class="radio-dot"></span>
							{/if}
						</span>

						<div>
							<strong>Joyfully Accept</strong>
							<small>We can't wait to celebrate with you</small>
						</div>
					</button>


					<button
						type="button"
						class:active={attendance === 'decline'}
						class="attendance-card"
						on:click={() => attendance = 'decline'}
					>
						<span class="radio">
							{#if attendance === 'decline'}
								<span class="radio-dot"></span>
							{/if}
						</span>

						<div>
							<strong>Regretfully Decline</strong>
							<small>We will miss celebrating with you</small>
						</div>
					</button>

				</div>

			</section>


			<!-- Guests -->
			<section class="guest-section">

				<div class="section-title">
					<span></span>
					<h2>Number of Guests</h2>
					<span></span>
				</div>


				<div class="guest-counter">

					<button
						type="button"
						aria-label="Decrease guests"
						on:click={() => guests = Math.max(1, guests - 1)}
					>
						−
					</button>

					<div class="guest-number">
						<strong>{guests}</strong>
						<span>{guests === 1 ? 'Guest' : 'Guests'}</span>
					</div>

					<button
						type="button"
						aria-label="Increase guests"
						on:click={() => guests = Math.min(10, guests + 1)}
					>
						+
					</button>

				</div>

			</section>


			<!-- Message -->
			<section class="message-section">

				<div class="section-title">
					<span></span>
					<h2>Message To The Couple</h2>
					<span></span>
				</div>

				<textarea
					bind:value={message}
					placeholder="Write your message here..."
					rows="5"
				></textarea>

				<p class="optional">Optional</p>

			</section>


			<!-- Confirm -->
			<div class="confirm-container">

				<button
					type="submit"
					class="confirm-button"
					class:disabled={!fullName || !email || !phone || !attendance}
				>
					<span>♡</span>
					CONFIRM RSVP
				</button>

			</div>

		</form>


		<!-- Success message -->
		{#if submitted}

			<div class="success-message">
				<div class="success-heart">♡</div>

				<h3>Thank You</h3>

				<p>
					Your RSVP has been received.
					We look forward to celebrating
					this beautiful day with you.
				</p>
			</div>

		{/if}


		<!-- Bottom ornament -->
		<div class="bottom-ornament">
			<span></span>
			<i>♡</i>
			<span></span>
		</div>

	</div>

</div>


<style>
	/* ================================
	   PAGE
	================================ */

	.rsvp-page {
		width: 100%;
		min-height: 100vh;

		margin: 0;
		padding: 0;

		background: #ffffff;

		color: #a85f59;
	}


	/* ================================
	   RSVP CONTAINER
	================================ */

	.rsvp-card {
		position: relative;

		width: 100%;
		max-width: none;

		margin: 0;
		padding: 55px 46px 45px;

		background: #ffffff;

		border: none;
		box-shadow: none;

		overflow: hidden;
	}


	/* Remove the inner card border */
	.rsvp-card::before {
		display: none;
	}


	.rsvp-card::after {
		display: none;
	}


	/* ================================
	   HEADER
	================================ */

	.header-section {
		text-align: center;

		margin: 0 0 42px;
	}


	.small-heading {
		margin: 0 0 14px;

		font-family: Georgia, serif;

		font-size: 10px;

		letter-spacing: 2px;

		color: #a85f59;
	}





	.reply-text {
		max-width: 390px;

		margin: 20px auto 0;

		font-family: Arial, sans-serif;

		font-size: 11px;

		line-height: 1.7;

		letter-spacing: 0.4px;

		color: #a85f59;
	}


	/* ================================
	   ORNAMENT
	================================ */

	.ornament,
	.bottom-ornament {
		display: flex;

		align-items: center;

		justify-content: center;

		gap: 10px;

		margin: 0 0 30px;
	}


	.ornament span,
	.bottom-ornament span {
		width: 60px;

		height: 1px;

		background: #c88982;
	}


	.ornament i,
	.bottom-ornament i {
		font-style: normal;

		font-size: 16px;

		color: #b56b64;
	}


	/* ================================
	   FORM
	================================ */

	form {
		width: 100%;
	}


	.form-section {
		width: 100%;

		display: flex;
		flex-direction: column;

		gap: 19px;
	}


	.field {
		width: 100%;

		display: flex;
		flex-direction: column;

		gap: 7px;
	}


	label {
		padding: 0 4px;

		font-family: Georgia, serif;

		font-size: 11px;

		letter-spacing: 1.5px;

		text-transform: uppercase;

		color: #a85f59;
	}


	/* ================================
	   INPUTS
	================================ */

	.input-wrapper {
		width: 100%;
		height: 55px;

		display: flex;
		align-items: center;

		border: 1px solid #d99d97;

		background: #ffffff;

		box-sizing: border-box;
	}


	.input-wrapper:focus-within {
		border-color: #b96d66;
	}


	.input-icon {
		width: 51px;
		height: 31px;

		flex-shrink: 0;

		display: flex;
		align-items: center;
		justify-content: center;

		font-size: 16px;

		color: #b96d66;

		border-right: 1px solid #e2c1bd;
	}


	input {
		display: block;

		width: 100%;
		height: 100%;

		padding: 0 16px;

		border: none;
		outline: none;

		background: #ffffff;

		font-family: Arial, sans-serif;

		font-size: 12px;

		color: #8f514c;

		box-sizing: border-box;
	}


	input::placeholder {
		color: #c58b85;

		opacity: 1;
	}


	/* ================================
	   SECTION TITLES
	================================ */

	.attendance-section,
	.guest-section,
	.message-section {
		width: 100%;

		margin-top: 40px;
	}


	.section-title {
		width: 100%;

		display: flex;
		align-items: center;

		gap: 11px;

		margin-bottom: 20px;
	}


	.section-title span {
		flex: 1;

		height: 1px;

		background: #d6aaa5;
	}


	.section-title h2 {
		flex-shrink: 0;

		margin: 0;

		font-family: Georgia, serif;

		font-size: 11px;

		font-weight: 400;

		letter-spacing: 1.8px;

		text-transform: uppercase;

		white-space: nowrap;

		color: #a45f59;
	}


	/* ================================
	   ACCEPT / DECLINE
	================================ */

	.attendance-options {
		width: 100%;

		display: grid;

		grid-template-columns: 1fr 1fr;

		gap: 14px;
	}


	.attendance-card {
		width: 100%;
		min-height: 105px;

		display: flex;
		align-items: center;

		gap: 12px;

		padding: 15px;

		border: 1px solid #d99d97;

		background: #ffffff;

		cursor: pointer;

		text-align: left;

		color: #a45f59;

		box-sizing: border-box;

		transition:
			background 0.2s ease,
			border-color 0.2s ease;
	}


	.attendance-card:hover {
		background: #fff9f8;

		border-color: #b96d66;
	}


	.attendance-card.active {
		background: #fff6f4;

		border-color: #ae665f;
	}


	.radio {
		width: 21px;
		height: 21px;

		flex-shrink: 0;

		display: flex;
		align-items: center;
		justify-content: center;

		border: 1px solid #b86d66;

		border-radius: 50%;
	}


	.radio-dot {
		width: 9px;
		height: 9px;

		border-radius: 50%;

		background: #b56a63;
	}


	.attendance-card strong {
		display: block;

		font-family: Georgia, serif;

		font-size: 10px;

		font-weight: 400;

		line-height: 1.4;

		letter-spacing: 1px;

		text-transform: uppercase;
	}


	.attendance-card small {
		display: block;

		margin-top: 5px;

		font-family: Arial, sans-serif;

		font-size: 9px;

		line-height: 1.4;

		color: #bd827c;
	}


	/* ================================
	   GUEST COUNTER
	================================ */

	.guest-counter {
		width: 220px;
		height: 58px;

		display: flex;
		align-items: center;

		margin: 0 auto;

		border: 1px solid #d99d97;

		background: #ffffff;
	}


	.guest-counter button {
		width: 58px;
		height: 100%;

		flex-shrink: 0;

		border: none;

		background: #ffffff;

		font-size: 21px;

		font-weight: 300;

		color: #a85f59;

		cursor: pointer;
	}


	.guest-counter button:hover {
		background: #fff7f5;
	}


	.guest-number {
		flex: 1;

		height: 100%;

		display: flex;
		flex-direction: column;

		align-items: center;
		justify-content: center;

		border-left: 1px solid #e2c1bd;
		border-right: 1px solid #e2c1bd;
	}


	.guest-number strong {
		font-family: Georgia, serif;

		font-size: 18px;

		font-weight: 400;

		line-height: 1;
	}


	.guest-number span {
		margin-top: 5px;

		font-family: Arial, sans-serif;

		font-size: 8px;

		letter-spacing: 1px;

		text-transform: uppercase;

		color: #b87973;
	}


	/* ================================
	   MESSAGE
	================================ */

	textarea {
		display: block;

		width: 100%;
		min-height: 120px;

		padding: 15px;

		resize: vertical;

		border: 1px solid #d99d97;

		outline: none;

		background: #ffffff;

		font-family: Arial, sans-serif;

		font-size: 12px;

		line-height: 1.6;

		color: #8f514c;

		box-sizing: border-box;
	}


	textarea:focus {
		border-color: #b96d66;
	}


	textarea::placeholder {
		color: #c58b85;

		opacity: 1;
	}


	.optional {
		margin: 5px 2px 0;

		text-align: right;

		font-family: Arial, sans-serif;

		font-size: 8px;

		font-style: italic;

		color: #c18b85;
	}


	/* ================================
	   CONFIRM BUTTON
	================================ */

	.confirm-container {
		display: flex;

		justify-content: center;

		margin-top: 38px;
	}


	.confirm-button {
		width: 280px;
		height: 54px;

		display: flex;
		align-items: center;
		justify-content: center;

		gap: 12px;

		border: none;

		background: #b66d66;

		color: #ffffff;

		font-family: Georgia, serif;

		font-size: 11px;

		letter-spacing: 2.5px;

		cursor: pointer;

		transition:
			background 0.2s ease,
			transform 0.2s ease;
	}


	.confirm-button:hover:not(.disabled) {
		background: #a55f59;

		transform: translateY(-1px);
	}


	.confirm-button.disabled {
		opacity: 0.5;

		cursor: not-allowed;
	}


	/* ================================
	   SUCCESS
	================================ */

	.success-message {
		margin-top: 30px;

		padding: 25px;

		text-align: center;

		border: 1px solid #d99d97;

		background: #fff8f6;
	}


	.success-heart {
		font-size: 25px;

		color: #ad625b;
	}


	.success-message h3 {
		margin: 5px 0 8px;

		font-family:
			"Snell Roundhand",
			"Segoe Script",
			cursive;

		font-size: 35px;

		font-weight: 400;
	}


	.success-message p {
		margin: 0 auto;

		max-width: 350px;

		font-family: Arial, sans-serif;

		font-size: 10px;

		line-height: 1.7;

		color: #9e6a65;
	}


	/* ================================
	   BOTTOM
	================================ */

	.bottom-ornament {
		margin-top: 42px;

		margin-bottom: 0;
	}


	/* ================================
	   MOBILE
	================================ */

	@media (max-width: 500px) {

		.rsvp-card {
			padding: 45px 30px 40px;
		}


		h1 {
			font-size: 53px;
		}


		.attendance-options {
			grid-template-columns: 1fr 1fr;

			gap: 10px;
		}


		.attendance-card {
			min-height: 105px;

			padding: 12px;

			gap: 9px;
		}


		.attendance-card strong {
			font-size: 9px;
		}


		.attendance-card small {
			font-size: 8px;
		}
	}


	@media (max-width: 380px) {

		.rsvp-card {
			padding-left: 20px;
			padding-right: 20px;
		}


		.section-title span {
			display: none;
		}


		.section-title {
			justify-content: center;
		}


		.attendance-card {
			padding: 10px;
		}


		.attendance-card small {
			font-size: 7px;
		}
	}

</style>