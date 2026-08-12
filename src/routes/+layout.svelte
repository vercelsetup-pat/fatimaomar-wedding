<script lang="ts">
    import './layout.css';

    let { children } = $props();
</script>

<svelte:head>
	<title>Jebrine &yrine Wedding</title>

	<meta name="description" content="Join  Jebrine & Cyrine's wedding on 13 September 2026 at Green Land Akkar Edbel,Lebanon."	/>

	<meta property="og:type" content="website" />
	<meta property="og:title" content="Jebrine & Cyrine Wedding" />
	<meta property="og:description" content="13 September 2026 • Green Land, Akkar Edbel, Lebanon"/>
	<meta property="og:image" content="https://fatimaomar-wedding.vercel.app/card.png"/>
	<meta property="og:image:secure_url" content="https://fatimaomar-wedding.vercel.app/card.png"/>

	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta property="og:url" content="https://fatimaomar-wedding.vercel.app/"/>

	<meta name="twitter:card" content="summary_large_image"/>
	<meta name="twitter:title" content="Ali & Mireille Wedding"/>
	<meta name="twitter:description" content="13 September 2026 Green Land, Akkar Edbel, Lebanon"/>
	<meta name="twitter:image" content="https://fatimaomar.vercel.app/card.png"/>
</svelte:head>

{@render children()}