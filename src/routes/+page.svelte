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

