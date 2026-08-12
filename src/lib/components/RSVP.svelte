<script lang="ts">
    import Envelop from "$lib/assets/envelop.png";
    import FadeIn from "$lib/components/FadeIn.svelte";
    import { language } from "$lib/stores/languages";
    import { translations } from "$lib/i18n/translations";

    let fullName = $state("");
    let email = $state("");
    let phoneNumber = $state("");

    let attendance: "accepted" | "rejected" = $state("accepted");

    let guestNumber = $state(1);
    let message = $state("");

    let submitting = $state(false);
    let successMessage = $state("");
    let errorMessage = $state("");

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        successMessage = "";
        errorMessage = "";

        if (!fullName.trim()) {
            errorMessage = "Please enter your name.";
            return;
        }

        if (guestNumber < 1 && attendance === "accepted") {
            errorMessage = "Number of guests must be at least 1.";
            return;
        }

        submitting = true;

        try {
            const response = await fetch("/api/rsvp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullName: fullName.trim(),

                    // Email is optional
                    email: email.trim(),

                    phoneNumber: phoneNumber.trim(),

                    attendance,

                    // If rejected, don't send guests
                    guestNumber:
                        attendance === "accepted"
                            ? guestNumber
                            : 0,

                    // If rejected, don't send message
                    message:
                        attendance === "accepted"
                            ? message.trim()
                            : ""
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to submit RSVP."
                );
            }

            successMessage =
                result.message || "RSVP submitted successfully.";

            // Reset form
            fullName = "";
            email = "";
            phoneNumber = "";
            attendance = "accepted";
            guestNumber = 1;
            message = "";

        } catch (error) {
            console.error("RSVP submission error:", error);

            errorMessage =
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again.";
        } finally {
            submitting = false;
        }
    }
</script>


<form class="rsvp-form" onsubmit={handleSubmit}>

    <div class="text-center">

        <FadeIn>
            <h1
                class="h1 text-(--primary) mt-6"
                class:arabic={$language === "ar"}
                class:english={$language === "en"}
            >
                {translations[$language].reply}
            </h1>
        </FadeIn>

        <FadeIn>
            <img
                src={Envelop}
                alt="envelop"
                class="w-[150px] h-[150px] object-contain mx-auto"
            />
        </FadeIn>

        <FadeIn>
            <h2 class="h2 text-(--primary)">
                {translations[$language].rsvptext1}
            </h2>
        </FadeIn>

        <FadeIn>
            <h2 class="h2 text-(--primary) mt-3">
                {translations[$language].rsvptext2}
            </h2>
        </FadeIn>

    </div>


    <!-- Full Name -->
    <div class="field">
        <FadeIn>
            <input
                id="fullName"
                type="text"
                bind:value={fullName}
                dir={$language === "ar" ? "rtl" : "ltr"}
                placeholder={translations[$language].namePlaceholder}
                autocomplete="name"
                required
            />
        </FadeIn>
    </div>


    <!-- Email - OPTIONAL -->
    <div class="field">
        <FadeIn>
            <input
                id="email"
                type="email"
                bind:value={email}
                dir={$language === "ar" ? "rtl" : "ltr"}
                placeholder={translations[$language].emailPlaceholder}
                autocomplete="email"
            />
        </FadeIn>
    </div>


    <!-- Phone -->
    <div class="field">
        <FadeIn>
            <input
                id="phoneNumber"
                type="tel"
                bind:value={phoneNumber}
                dir={$language === "ar" ? "rtl" : "ltr"}
                placeholder={translations[$language].phonePlaceholder}
                autocomplete="tel"
            />
        </FadeIn>
    </div>


    <!-- Attendance -->
    <div class="attendance">

        <FadeIn>
            <span
                class="field-label"
                dir={$language === "ar" ? "rtl" : "ltr"}
            >
                {translations[$language].attending}
            </span>
        </FadeIn>

        <FadeIn>
            <div class="attendance-buttons">

                <!-- ACCEPT -->
                <button
                    type="button"
                    class:active={attendance === "accepted"}
                    onclick={() => {
                        attendance = "accepted";
                    }}
                >
                    {translations[$language].accept}
                </button>

                <!-- DECLINE -->
                <button
                    type="button"
                    class:active={attendance === "rejected"}
                    onclick={() => {
                        attendance = "rejected";
                    }}
                >
                    {translations[$language].decline}
                </button>

            </div>
        </FadeIn>

    </div>


    <!-- Only show these when ACCEPTED -->
    {#if attendance === "accepted"}

        <!-- Guests -->
        <div class="field">

            <FadeIn>
                <label
                    for="number"
                    dir={$language === "ar" ? "rtl" : "ltr"}
                >
                    {translations[$language].numguests}
                </label>
            </FadeIn>

            <FadeIn>
                <input
                    id="number"
                    type="number"
                    bind:value={guestNumber}
                    min="1"
                     dir={$language === "ar" ? "rtl" : "ltr"}
                />
            </FadeIn>

        </div>


        <!-- Message -->
        <div class="field message-field">

            <FadeIn>
                <label
                    for="message"
                    dir={$language === "ar" ? "rtl" : "ltr"}
                >
                    {translations[$language].message}
                </label>
            </FadeIn>

            <FadeIn>
                <textarea
                    id="message"
                    bind:value={message}
                    placeholder={translations[$language].message_placeholder}
                    dir={$language === "ar" ? "rtl" : "ltr"}
                ></textarea>
            </FadeIn>

        </div>

    {/if}


    <!-- Success -->
    {#if successMessage}
        <div class="success-message">
            {successMessage}
        </div>
    {/if}


    <!-- Error -->
    {#if errorMessage}
        <div class="error-message">
            {errorMessage}
        </div>
    {/if}


    <!-- Submit -->
    <FadeIn>
        <button
            class="submit-button"
            type="submit"
            disabled={submitting}
        >
            {submitting
                ? "Sending..."
                : translations[$language].confirm}
        </button>
    </FadeIn>

</form>


<style>
    .rsvp-form {
        width: 90%;
        display: flex;
        flex-direction: column;
        gap: 22px;
        padding: 20px;
        margin-left: 20px;
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

    /* Arabic labels */
    .field label[dir="rtl"],
    .field-label[dir="rtl"] {
        font-family: "Amiri", serif;
        font-size: 16px;
    }

    .field input,
    .field textarea {
        width: 100%;
        box-sizing: border-box;
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

    .attendance-buttons button.active {
        background: #b6867f;
        color: white;
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

    .submit-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }

    .success-message {
        text-align: center;
        color: #6f8b6b;
        font-family: "Cormorant Garamond", serif;
        font-size: 15px;
    }

    .error-message {
        text-align: center;
        color: #a34f4f;
        font-family: "Cormorant Garamond", serif;
        font-size: 15px;
    }
</style>