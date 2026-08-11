<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Jebrine &yrine Wedding</title>

	<meta name="description" content="Join Omar & Fatima wedding on 23 August 2026 atJupiter Bnachiil,Lebanon."	/>

	<meta property="og:type" content="website" />
	<meta property="og:title" content="Omar & Fatima Wedding" />
	<meta property="og:description" content="23 August 2026 • Jupiter Bnachii, Lebanon"/>
	<meta property="og:image" content="https://fatimaomar-wedding.vercel.app//envAr.png"/>
	<meta property="og:image:secure_url" content="https://fatimaomar-wedding.vercel.app//envAr.png"/>

	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta property="og:url" content="https://fatimaomar-wedding.vercel.app/"/>

	<meta name="twitter:card" content="summary_large_image"/>
	<meta name="twitter:title" content="Ali & Mireille Wedding"/>
	<meta name="twitter:description" content="13 September 2026 Green Land, Akkar Edbel, Lebanon"/>
	<meta name="twitter:image" content="https://fatimaomar-wedding.vercel.app/envEn1.jpeg"/>
</svelte:head>
{@render children()}
