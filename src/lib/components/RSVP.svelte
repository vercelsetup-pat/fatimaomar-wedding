<script lang="ts">
	import Envelop from "$lib/assets/envelop.png"
	
    let attendance: "accepted" | "rejected" = "accepted"
    let guestNumber = 1
    let message = ""
</script>


<div class="rsvp-section">
    <div class="rsvp-container">

        <!-- Header -->
        <section class="rsvp-header">
            <p class="rsvp-eyebrow">
                WE LOOK FORWARD TO CELEBRATING WITH YOU
            </p>

            <h1>Kindly Reply</h1>

            <p class="rsvp-description">
                Please let us know if you will be joining us<br />
                for this beautiful celebration.
            </p>
        </section>


        <!-- Name -->
        <div class="relative mt-10 w-full">
            <input
                type="text"
                id="name"
                placeholder=" "
                required
                class="form-input peer"
            />

            <label for="name" class="form-label">
                Full Name
            </label>
        </div>


        <!-- Phone -->
        <div class="relative mt-10 w-full">
            <input
                type="tel"
                id="phone_number"
                placeholder=" "
                required
                class="form-input peer"
            />

            <label for="phone_number" class="form-label">
                Phone number
            </label>
        </div>


        <!-- Email -->
        <div class="relative mt-10 w-full">
            <input
                type="email"
                id="email"
                placeholder=" "
                required
                class="form-input peer"
            />

            <label for="email" class="form-label">
                Email
            </label>
        </div>


        <!-- Attendance -->
        <div class="attendance-tabs mt-10">
            <button
                type="button"
                class:active={attendance === "accepted"}
                onclick={() => (attendance = "accepted")}
            >
                Joyfully Accept
            </button>

            <button
                type="button"
                class:active={attendance === "rejected"}
                onclick={() => (attendance = "rejected")}
            >
                Regretfully Decline
            </button>
        </div>


        <!-- Guest number -->
        {#if attendance === "accepted"}
            <div class="guest-field mt-8">
                <label for="guest_number">
                    Number of Guests
                </label>

                <input
                    type="number"
                    id="guest_number"
                    min="1"
                    max="10"
                    bind:value={guestNumber}
                    required
                />
            </div>
        {/if}


        <!-- Message -->
        <div class="message-field mt-8">
            <label for="message">
                Message
            </label>

            <textarea
                id="message"
                bind:value={message}
                rows="5"
            ></textarea>
        </div>


        <!-- Submit -->
        <button
            type="button"
            class="submit-button mt-8"
        >
            {attendance === "accepted"
                ? "Confirm Attendance"
                : "Send Response"}
        </button>

    </div>
</div>




	







	


	

	





	

	