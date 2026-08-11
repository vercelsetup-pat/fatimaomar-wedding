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

    <div class="countdown">
        <div class="count-item">
            <FadeIn><span class="number">{formatNumber(days)}</span></FadeIn>
             <FadeIn><span class="label">{translations[$language].days}</span></FadeIn>
        </div>

        <div class="count-item">
            <FadeIn><span class="number">{formatNumber(hours)}</span></FadeIn>
            <FadeIn><span class="label">{translations[$language].hours}</span></FadeIn>
        </div>

        <div class="count-item">
            <FadeIn><span class="number">{formatNumber(minutes)}</span></FadeIn>
            <FadeIn><span class="label">{translations[$language].minutes}</span></FadeIn>
        </div>

        <div class="count-item">
            <FadeIn><span class="number">{formatNumber(seconds)}</span></FadeIn>
            <FadeIn><span class="label"> {translations[$language].seconds} </span></FadeIn>
        </div>
    </div>
</section>


<style>
    .countdown {
        width: min(100%, 420px);
        margin-top: 45px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        column-gap: 15px;
    }

    .count-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }


    .number {
       font-family: "Italianno", cursive;;
        font-size: clamp(42px, 7vw,58px );
        font-weight: 400;
        line-height: 1;
        color: var(--primary);
    }


    .label {
        margin-top: 8px;
        font-size: 10px;
        font-weight: 400;
        letter-spacing: 1px;
        line-height: 1;
        color: var(--primary);
    }


    @media (max-width: 500px) {
        .countdown {
            width: 100%;
            column-gap: 8px;
            margin-top: 40px;
        }
        .number {
            font-size: 42px;
        }
        .label {
            margin-top: 7px;
            font-size: 10px;
            letter-spacing: 0.5px;
        }
    }


    @media (max-width: 350px) {
        .countdown {
            column-gap: 4px;
        }
        .number {
            font-size: 36px;
        }
    }

</style>