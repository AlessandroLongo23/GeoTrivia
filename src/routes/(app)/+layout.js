import { countries } from '$lib/stores.svelte.js';

export async function load({ fetch }) {
    const response = await fetch('/data/countries.json');
    let data = await response.json();

    countries.set(data);
    return {};
}