<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import Header from "$lib/components/Header.svelte";
    import CountDown from "$lib/components/CountDown.svelte";
    import Venue from "$lib/components/Venue.svelte";
    import RSVP from "$lib/components/RSVP.svelte";
</script>


<div class="min-h-screen bg-neutral-100 p-0 md:px-6 md:py-10 flex justify-center">
    <div class="w-full max-w-md overflow-hidden bg-white shadow-2xl md:rounded-lg">
        <Header />
        <CountDown/>
       <Venue/>
       <RSVP/>
      
    </div>
</div>



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