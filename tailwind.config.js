import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'earth-light': '#272d3f',
				'earth-medium': '#191d2d',
				'earth-dark': '#0d111c',
			},
		},
	},

	plugins: [typography, forms, containerQueries, aspectRatio]
};
