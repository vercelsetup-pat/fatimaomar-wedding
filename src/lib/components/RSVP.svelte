<script lang="ts">
	import Envelop from "$lib/assets/envelop.png"
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

<div class=" w-full">
	<div class="relative w-full py-12">

		<section class="text-center">
			<h2 class="h2 text-(--primary)">WE LOOK FORWARD TO CELEBRATING WITH YOU</h2>
			<h1 class="h1 text-(--primary) my-2">Kindly Reply</h1>

			<h2 class="h2 text-(--primary)">
				Please let us know if you will be joining us
				for this beautiful celebration.
			</h2>
		</section>

		<img src={Envelop} alt="envelop"/>

	</div>

</div>






	







	


	

	





	

	