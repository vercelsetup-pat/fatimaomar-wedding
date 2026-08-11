<script lang="ts">
	import Envelop from "$lib/assets/envelop.png"
	import FadeIn from "$lib/components/FadeIn.svelte";

    let attendance: "accepted" | "rejected" = "accepted"
    let guestNumber = 1
    let message = ""
</script>


<div class="rsvp-form " >

	<div class="text-center ">
		<FadeIn><h1 class="h1 text-(--primary) mt-6">Kindly Reply</h1></FadeIn>
		<FadeIn><img src={Envelop}  alt="envelop"  class="w-[150px] h-[150px] object-contain mx-auto "/></FadeIn>
		<FadeIn><h2 class="h2 text-(--primary)">WE LOOK FORWARD TO CELEBRATING WITH YOU</h2></FadeIn>
		<FadeIn><h2 class="h2 text-(--primary) mt-3">Please let us know if you will be joining us for this beautiful celebration.</h2></FadeIn>
	</div>
 
    <div class="field">
       <FadeIn><input id="fullName" type="text" placeholder="Your Name"/></FadeIn>
    </div>

    <div class="field">
        <FadeIn><input id="email" type="email" placeholder="Your Email"/></FadeIn>
    </div>

    <div class="field">
        <FadeIn><input id="phoneNumber" type="tel" placeholder="+961 ..."/></FadeIn>
    </div>

    <div class="attendance">
        <FadeIn><span class="field-label">Attending </span></FadeIn>
        <FadeIn><div class="attendance-buttons">
            <button type="button"> Accept</button>
            <button type="button"> Decline</button>
        </div></FadeIn>
    </div>


    <!-- Guests -->
    <div class="field">
       	<FadeIn><label for="guests">Number of Guests</label></FadeIn>
    	<FadeIn><input id="number" type="number"/></FadeIn>
    </div>


    <!-- Message -->
    <div class="field message-field">
        <FadeIn><label for="message">Message</label></FadeIn>

       <FadeIn><textarea
            id="message"
            bind:value={message}
            placeholder="Leave us a little note..."
        ></textarea></FadeIn>
    </div>
    <FadeIn><button class="submit-button" type="submit"> Kindly Reply </button></FadeIn>
</div>

<style>
	.rsvp-form {
		width: 90%;
		display: flex;
		flex-direction: column;
	
		gap: 22px;
		padding: 20px;
		margin-left:20px;
		margin-top: 20px;
		margin-bottom: 20px;
	}


	.field {
		position: relative;
		width: 100%;
	}

	.field label,
	.field-label {
		display: block;
		margin-bottom: 5px;
		color: #9d5a4f;
		font-family: "Italianno", cursive;
		font-size: 20px;
		line-height: 1;
	}


	.field input,
	.field textarea {
		width: 100%;
		box-sizing: border-box;
		border: none;
		border: 1px solid #d8b8b2;
		border-radius: 0;
		background: transparent;
		padding: 7px 2px 8px 7px;
		color: #76534e;
		font-family: "Cormorant Garamond", serif;
		font-size: 16px;
		outline: none;
		transition:
			border-color 0.25s ease,
			padding-left 0.25s ease;
	}


	.field input::placeholder,
	.field textarea::placeholder {
		color: #b99b96;
		font-family: "Cormorant Garamond", serif;
		font-size: 13px;
		font-style: italic;
		opacity: 0.8;
	}


	.field input:focus,
	.field textarea:focus {
		border-bottom-color: #9d5a4f;
		padding-left: 5px;
	}

	.message-field textarea {
		min-height: 75px;
		resize: none;
		line-height: 1.5;
	}

	.attendance {
		width: 100%;
	}

	.attendance-buttons {
		display: flex;
		width: 100%;
		margin-top: 7px;
		border: 1px solid #d8b8b2;
		border-radius: 4px;
		overflow: hidden;
	}

.attendance-buttons button {
    flex: 1;
    border: none;
    background: transparent;
    padding: 8px 5px;
    color: #9d5a4f;
    font-family: "Italianno", cursive;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.25s ease;
}

.attendance-buttons button + button {
    border-left: 1px solid #d8b8b2;
}

.submit-button {
    width: 100%;
    margin-top: 2px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background: #b6867f;
    color: white;
    font-family: "Italianno", cursive;
    font-size: 17px;
    cursor: pointer;
    transition:
        background 0.25s ease,
        transform 0.25s ease;
}

.submit-button:hover {
    background: #9d5a4f;
    transform: translateY(-1px);
}
</style>



	







	


	

	





	

	