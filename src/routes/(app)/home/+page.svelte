<script>
    import { Motion } from 'svelte-motion';

    const menuItems = [
        { text: 'Capitals', href: '/capitals' },
        { text: 'Countries', href: '/countries' },
        { text: 'Flags', href: '/flags' }
    ];
</script>

<div class="w-full h-screen flex flex-col items-center justify-center">
    <Motion initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: 'easeOut'}} let:motion>
        <h1 use:motion class="text-white text-8xl font-bold mb-16">GeoTrivia</h1>
    </Motion>

    <div class="flex flex-col items-center justify-center gap-8">
        {#each menuItems as item, i}
            <Motion let:motion
                initial={{ x: i % 2 == 0 ? -100 : 100, opacity: 0 }} 
                animate={{ x: 0, opacity: 1, transition: { duration: 0.25, delay: i * 0.1, ease: 'easeOut' } }}
                whileHover={{ scale: 1.25, transition: { duration: 0.1, delay: 0.0, ease: 'easeOut' }}}
            >
                <a use:motion href={item.href} class="text-4xl text-white hover:text-gray-300 transition-colors">
                    {item.text}
                </a>
            </Motion>
        {/each}
    </div>
</div>