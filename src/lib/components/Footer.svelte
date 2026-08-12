<script lang="ts">
	import FadeIn from "$lib/components/FadeIn.svelte";
</script>

<FadeIn>
    <footer class="footer">
        <p>© 2026 <span class="brand">bluProject </span>. All rights reserved.</p>
    </footer>
</FadeIn>

<style>
.footer {
	padding: 1rem 1rem;
	text-align: center;
	background: #fff;
	border-top: 1px solid #f1e5e6;
}

.footer p {
	margin: 0.35rem 0;
	font-size: 0.80rem;
	color: #8b7b7c;
	letter-spacing: 0.3px;
}

.footer .brand,
.footer .partner {
	color: #964b54;
	font-weight: 600;
}

.footer .collaboration {
	font-size: 0.85rem;
	color: #a89b9c;
}

@media (max-width: 640px) {
	.footer {
		padding: 1.5rem 1rem;
	}

	.footer p {
		font-size: 0.85rem;
	}

	.footer .collaboration {
		font-size: 0.8rem;
	}
}
</style>