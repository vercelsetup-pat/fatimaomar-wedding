<script lang="ts">
	import Envelop from "$lib/assets/envelop.png"
	import FadeIn from "$lib/components/FadeIn.svelte";
	import { language } from "$lib/stores/languages";
    import { translations } from "$lib/i18n/translations";
    let attendance: "accepted" | "rejected" = "accepted"
    let guestNumber = 1
    let message = ""
</script>


<div class="rsvp-form">

	<div class="text-center ">
		<FadeIn><h1 class="h1 text-(--primary) mt-6" class:arabic={$language === "ar"} class:english={$language === "en"}>{translations[$language].reply}</h1></FadeIn>
		<FadeIn><img src={Envelop}  alt="envelop"  class="w-[150px] h-[150px] object-contain mx-auto "/></FadeIn>
		<FadeIn><h2 class="h2 text-(--primary)">{translations[$language].rsvptext1}</h2></FadeIn>
		<FadeIn><h2 class="h2 text-(--primary) mt-3">{translations[$language].rsvptext2}</h2></FadeIn>
	</div>
 
    <div class="field">
       <FadeIn><input id="fullName" type="text"  dir={$language === "ar" ? "rtl" : "ltr"}  placeholder={translations[$language].namePlaceholder}/></FadeIn>
    </div>

    <div class="field">
        <FadeIn><input id="email" type="email" dir={$language === "ar" ? "rtl" : "ltr"} placeholder={translations[$language].emailPlaceholder}/></FadeIn>
    </div>

    <div class="field">
        <FadeIn><input id="phoneNumber" type="tel"  dir={$language === "ar" ? "rtl" : "ltr"} placeholder={translations[$language].phonePlaceholder}/></FadeIn>
    </div>

    <div class="attendance">
        <FadeIn><span class="field-label" dir={$language === 'ar' ? 'rtl' : 'ltr'}>{translations[$language].attending} </span></FadeIn>
        <FadeIn><div class="attendance-buttons">
            <button type="button"> {translations[$language].accept}</button>
            <button type="button"> {translations[$language].decline}</button>
        </div></FadeIn>
    </div>

    <!-- Guests -->
    <div class="field">
       	<FadeIn><label for="guests" dir={$language === 'ar' ? 'rtl' : 'ltr'}>{translations[$language].numguests}</label></FadeIn>
    	<FadeIn><input id="number" type="number" dir="ltr"/></FadeIn>
    </div>


    <!-- Message -->
    <div class="field message-field">
    	<FadeIn><label for="message" dir={$language === 'ar' ? 'rtl' : 'ltr'}>{translations[$language].message}</label></FadeIn>

       	<FadeIn><textarea
            id="message"
            bind:value={message}
            placeholder={translations[$language].message_placeholder} 
			dir={$language === 'ar' ? 'rtl' : 'ltr'}
        ></textarea></FadeIn>
    </div>
    <FadeIn><button class="submit-button" type="submit">{translations[$language].confirm}</button></FadeIn>
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



	







	


	

	





	

	