<script>
	import '../app.css';
	let { children } = $props();
</script>

<div class="w-full h-screen bg-earth-dark">
	{@render children()}
</div>
