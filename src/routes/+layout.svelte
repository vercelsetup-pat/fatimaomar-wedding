<script lang="ts">
    import './layout.css';

    let { children } = $props();
</script>

<svelte:head>
    <title>Omar & Fatima Wedding</title>

    <meta
        name="description"
        content="Join Omar & Fatima wedding on 23 August 2026 at Jupiter Bnachei, Lebanon."
    />

    <!-- Open Graph / WhatsApp -->
    <meta property="og:type" content="website" />

    <meta
        property="og:title"
        content="Omar & Fatima Wedding"
    />

    <meta
        property="og:description"
        content="23 August 2026 • Jupiter Bnachei, Lebanon"
    />

    <meta
        property="og:url"
        content="https://fatimaomar-wedding.vercel.app/"
    />

    <meta
        property="og:image"
        content="https://fatimaomar-wedding.vercel.app/card.png"
    />

    <meta
        property="og:image:url"
        content="https://fatimaomar-wedding.vercel.app/card.png"
    />

    <meta
        property="og:image:secure_url"
        content="https://fatimaomar-wedding.vercel.app/card.png"
    />

    <meta
        property="og:image:type"
        content="image/png"
    />

    <meta
        property="og:image:width"
        content="667"
    />

    <meta
        property="og:image:height"
        content="1000"
    />

    <meta
        property="og:image:alt"
        content="Omar and Fatima Wedding Invitation"
    />

    <meta
        property="og:site_name"
        content="Omar & Fatima Wedding"
    />

    <!-- Twitter / X -->
    <meta
        name="twitter:card"
        content="summary_large_image"
    />

    <meta
        name="twitter:title"
        content="Omar & Fatima Wedding"
    />

    <meta
        name="twitter:description"
        content="23 August 2026 • Jupiter Bnachei, Lebanon"
    />

    <meta
        name="twitter:image"
        content="https://fatimaomar-wedding.vercel.app/card.png"
    />

    <meta
        name="twitter:image:alt"
        content="Omar and Fatima Wedding Invitation"
    />
</svelte:head>

{@render children()}