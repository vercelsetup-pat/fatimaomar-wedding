<script lang="ts">
    import { onMount } from "svelte";
    import FadeIn from "$lib/components/FadeIn.svelte";
    import { language } from "$lib/stores/languages";
    import { translations } from "$lib/i18n/translations";

    let days = $state(0);
    let hours = $state(0);
    let minutes = $state(0);
    let seconds = $state(0);

    let timer: ReturnType<typeof setInterval> | undefined;
    const weddingDate = new Date( 2026, 7, 23, 20, 0, 0 );

    function updateCountdown() {
        const now = new Date();

        const difference = weddingDate.getTime() - now.getTime();

        if (difference <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;

            if (timer) {
                clearInterval(timer);
            }

            return;
        }

    
        days = Math.floor(difference / (1000 * 60 * 60 * 24));
        hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        minutes = Math.floor((difference / (1000 * 60)) % 60);
        seconds = Math.floor((difference / 1000) % 60);
    }

    function formatNumber(value: number) {
        return value.toString().padStart(2, "0");
    }


    onMount(() => {
        
        updateCountdown();
        timer = setInterval(() => {
            updateCountdown();
        }, 1000);

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    });
    
</script>

<section class="box-border flex w-full flex-col items-center bg-white px-5 py-16 text-center">
    <div class="space-y-4">
        <FadeIn>
            <h1 class="h1 text-(--secondary)" class:arabic={$language === "ar"} class:english={$language === "en"}>
                {translations[$language].countitle1}
            </h1>
        </FadeIn>
        <FadeIn>
            <h2 class="h2 text-(--secondary)">
                {translations[$language].countitle2}<br />
                {translations[$language].countitle3}<br />
                {translations[$language].countitle4}<br />
                {translations[$language].countitle5}<br />
                {translations[$language].countitle6}
            </h2>
        </FadeIn>
    </div>

    <div class="space-y-4 mt-6">
       <FadeIn><h1 class="h1 text-(--secondary)" class:arabic={$language === "ar"} class:english={$language === "en"}> {translations[$language].countDown}</h1></FadeIn>
       <FadeIn>
            <h2 class="h2 text-(--primary)">
                {translations[$language].moment}<br />
                {translations[$language].celebrate}
            </h2>
        </FadeIn>
    </div>

    <div class="grid grid-cols-4 gap-2 max-w-xs mx-auto mb-6 relative z-10">
        <div class="flex flex-col items-center">
            <span class="number">{formatNumber(days)}</span>
            <span class="label">{translations[$language].days}</span>
        </div>

        <div class="flex flex-col items-center">
            <span class="number">{formatNumber(hours)}</span>
            <span class="label">{translations[$language].hours}</span>
        </div>

        <div class="flex flex-col items-center">
            <span class="number">{formatNumber(minutes)}</span>
            <span class="label">{translations[$language].minutes}</span>
        </div>

        <div class="flex flex-col items-center">
            <span class="number">{formatNumber(seconds)}</span>
            <span class="label"> {translations[$language].seconds} </span>
        </div>
    </div>
</section>


<style>
    .countdown {
        width: min(100%, 420px);
        margin-top: 45px;
        padding-inline: 4px;

        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 0;

        box-sizing: border-box;
        overflow: visible;
    }

    .count-item {
        min-width: 0;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        text-align: center;
        box-sizing: border-box;

        /* Important for Italianno */
        overflow: visible;
    }

    .number {
        display: block;

        font-family: "Italianno", cursive;
        font-size: clamp(34px, 9vw, 58px);
        font-weight: 400;

        /* Do NOT use line-height: 1 with Italianno */
        line-height: 1.25;

        color: var(--primary);
        white-space: nowrap;

        box-sizing: border-box;
        overflow: visible;

        /*
         * Gives the top of the font enough space
         * so the numbers are not cut.
         */
        padding-top: 0.08em;
    }

    .label {
        display: block;

        margin-top: 8px;

        font-family: inherit;
        font-size: clamp(8px, 2.2vw, 10px);
        font-weight: 400;

        line-height: 1.2;

        letter-spacing: clamp(0.2px, 0.25vw, 1px);

        color: var(--primary);
        white-space: nowrap;

        box-sizing: border-box;
    }


    /* ========================================
       TABLET / DESKTOP
       ======================================== */

    @media (max-width: 768px) {

        .countdown {
            width: min(100%, 420px);
            margin-top: 42px;
            padding-inline: 6px;
        }

        .number {
            font-size: clamp(38px, 8vw, 50px);
            line-height: 1.25;
            padding-top: 0.08em;
        }

        .label {
            margin-top: 7px;
            font-size: 9px;
            letter-spacing: 0.5px;
            line-height: 1.2;
        }
    }


    /* ========================================
       MOBILE
       ======================================== */

    @media (max-width: 500px) {

        .countdown {
            width: 100%;
            max-width: 420px;
            margin-top: 40px;
            padding-inline: 2px;

            grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .count-item {
            min-width: 0;
            overflow: visible;
        }

        .number {
            font-size: clamp(34px, 11vw, 44px);
            line-height: 1.25;
            padding-top: 0.08em;
        }

        .label {
            margin-top: 7px;
            font-size: 9px;
            letter-spacing: 0.3px;
            line-height: 1.2;
        }
    }


    /* ========================================
       SMALL MOBILE
       ======================================== */

    @media (max-width: 380px) {

        .countdown {
            padding-inline: 0;
        }

        .number {
            font-size: clamp(30px, 10.5vw, 39px);
            line-height: 1.25;
            padding-top: 0.08em;
        }

        .label {
            margin-top: 6px;
            font-size: 8px;
            letter-spacing: 0.2px;
            line-height: 1.2;
        }
    }


    /* ========================================
       VERY SMALL MOBILE
       ======================================== */

    @media (max-width: 330px) {

        .number {
            font-size: 30px;
            line-height: 1.25;
            padding-top: 0.08em;
        }

        .label {
            font-size: 7px;
            letter-spacing: 0;
        }
    }
</style>