<script lang="ts">
    import type { Snippet } from "svelte";
    import { browser } from "$app/environment";
    

    let visible = $state(false);
    let element: HTMLDivElement;

    const {
        delay = 0,
        children
    }: {
        delay?: number;
        children: Snippet;
    } = $props();

    $effect(() => {
        if (!browser || !element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    visible = true;
                    observer.disconnect();
                }
            },
            {
                threshold: 0.15
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    });
</script>

<div
    bind:this={element}
    class="fade"
    class:show={visible}
    style={`transition-delay:${delay}ms`}
>
    {@render children()}
</div>

<style>
.fade {
    opacity: 0;
    transform: translateY(40px);
    transition:
        opacity 0.8s ease,
        transform 0.8s ease;
    will-change: opacity, transform;
}

.fade.show {
    opacity: 1;
    transform: translateY(0);
}
</style>