<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import Header from "$lib/components/Header.svelte";
    import CountDown from "$lib/components/CountDown.svelte";
    import Venue from "$lib/components/Venue.svelte";
    import RSVP from "$lib/components/RSVP.svelte";
    import Footer from "$lib/components/Footer.svelte";

    let music: HTMLAudioElement | null = null;

    let isMuted = $state(false);
    let hasStarted = $state(false);

    // Loader
    let imageLoaded = $state(false);
    let loaderDone = $state(false);

    // Invitation
    let showSplash = $state(true);
    let isOpening = $state(false);

    async function enterSite() {
        if (isOpening) return;

        isOpening = true;

        if (music && !hasStarted) {
            try {
                await music.play();
                hasStarted = true;
                isMuted = false;
            } catch (err) {
                console.log(err);
            }
        }

        await new Promise((resolve) => setTimeout(resolve, 1200));

        showSplash = false;
    }

    function toggleMute() {
        if (!music) return;

        music.muted = !music.muted;
        isMuted = music.muted;
    }

    onMount(() => {
        history.scrollRestoration = "manual";
        window.scrollTo(0, 0);

        music = new Audio("/wedding.mp3");
        music.loop = true;
        music.volume = 0.4;

        const invitation = new Image();

        invitation.onload = () => {
            imageLoaded = true;

            setTimeout(() => {
                loaderDone = true;
            }, 600);
        };

        invitation.src = "/card.png";
    });

    onDestroy(() => {
        if (music) {
            music.pause();
            music.src = "";
            music = null;
        }
    });
</script>

{#if !loaderDone}
<div class="loader-screen">
    <div class="loader-content">
        <p class="heading-1 mb-3"> Loading Invitation... </p>
        <div class="loader-bar">
            <div class="loader-progress"></div>
        </div>
         <p class="loader-subtitle">
            You're invited
        </p>
    </div>
</div>

{:else if showSplash}
<button onclick={enterSite} class="splash" class:is-opening={isOpening} aria-label="Open invitation">
    <img src="/card.png" alt="Wedding Invitation"/>
    <div class="tap-message">
        <p>Tap to Open</p>
    </div>
    <div class="light"></div>
</button>
{/if}

<div class="min-h-screen bg-neutral-100 p-0 md:px-6 md:py-10 flex justify-center">
    <div class="w-full max-w-md overflow-hidden bg-white shadow-2xl md:rounded-lg">
        <Header />
        <CountDown/>
       <Venue/>
       <RSVP/>
       <Footer/>
    </div>
</div>

<button
    onclick={toggleMute}
    style="width: 56px; height: 56px; min-width: 56px; min-height: 56px;"
    class="fixed bottom-5 right-5 z-50 rounded-full bg-white shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 flex items-center justify-center border border-neutral-200"
    aria-label={isMuted ? "Unmute music" : "Mute music"}
>
    {#if isMuted}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-neutral-700 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
    {:else}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-neutral-700 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
    {/if}
</button>

<style>
    .loader-screen{
        position:fixed;
        inset:0;
        z-index:999;
        background:white;
        display:flex;
        align-items:center;
        justify-content:center;
    }

    .loader-content{
        width:280px;
        text-align:center;
    }


    .loader-subtitle{
        margin-top:18px;
        font-size:15px;
        color:#999;
    }

    .loader-bar{
        width:100%;
        height:3px;
        background:#ececec;
        border-radius:999px;
        overflow:hidden;
    }

    .loader-progress{
        width:40%;
        height:100%;
        background:#b28287;
        animation:loading 1.3s linear infinite;
    }

    @keyframes loading{

        from{
            transform:translateX(-150%);
        }

        to{
            transform:translateX(320%);
        }

    }


    .splash{
        position:fixed;
        inset:0;
        z-index:500;
        overflow:hidden;
        border:none;
        background:white;
        cursor:pointer;
        padding:0;
    }

    .splash img{
        width:100%;
        height:100%;
        object-fit:cover;

        transition:
            transform 1.2s ease,
            opacity 1.2s ease,
            filter 1.2s ease;
    }

    .light{
        position:absolute;
        inset:0;

        background:
            radial-gradient(
                circle,
                rgba(255,255,255,0) 10%,
                rgba(255,255,255,.25) 45%,
                rgba(255,255,255,.98) 100%
            );

        opacity:0;
        pointer-events:none;
    }

    .splash.is-opening img{
        transform:scale(1.05);
        opacity:0;
        filter:brightness(1.5);
    }

    .splash.is-opening .light{
        animation:glow 1.2s forwards ease;
    }

    .tap-message{
        position:absolute;
        bottom:90px;
        left:50%;
        transform:translateX(-50%);
        color:white;
        text-align:center;
        text-shadow:0 2px 10px rgba(0,0,0,.35);
    }

    .tap-message p{
        font-size:18px;
        animation:pulse 1.6s infinite;
    }

    @keyframes pulse{

        0%,100%{
            opacity:.45;
        }

        50%{
            opacity:1;
        }

    }

    @keyframes glow{

        0%{
            opacity:0;
            transform:scale(.8);
        }

        40%{
            opacity:.35;
        }

        70%{
            opacity:.75;
        }

        100%{
            opacity:1;
            transform:scale(1.4);
        }

    }
</style>