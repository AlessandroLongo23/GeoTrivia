<script>
    import { countries } from '$lib/stores.svelte.js';
    import { onMount } from 'svelte';
    import { Motion, animate, useMotionValue } from 'svelte-motion';

    let numLevels = 10;
    let idx = $state(0);
    let countriesData = $state([]);
    let isLoaded = $state(false);
    let levels = $state([]);
    let selectedChoice = $state(null);

    const Level = () => {
        let i = Math.floor(Math.random() * countriesData.length);
        let level = {
            country: countriesData[i].country,
            correct: null,
            choices: [
                { choice: countriesData[i].capital, correct: true, selected: false },
                { choice: countriesData[(i + 1) % countriesData.length].capital, correct: false, selected: false },
                { choice: countriesData[(i + 2) % countriesData.length].capital, correct: false, selected: false },
                { choice: countriesData[(i + 3) % countriesData.length].capital, correct: false, selected: false }
            ]
        };

        level.choices.sort((a, b) => Math.random() - 0.5);
 
        return level;
    }

    onMount(() => {
        countriesData = $countries.sort((a, b) => Math.random() - 0.5);
        levels = Array.from({ length: numLevels }, () => Level());
        isLoaded = true;
    });

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    let animation = $state();

    const submitAnswer = (i) => {
        if (animation == null) {
            levels[idx].choices[i].selected = true;
            selectedChoice = i;
            if (levels[idx].correct == null)
                levels[idx].correct = levels[idx].choices[i].correct;

            if (levels[idx].choices[i].correct) {
                animation = animate(y, [y.get() - 50, y.get()], { 
                    times: [0.0, 0.15, 0.3],
                    ease: 'easeInOut',
                    duration: .3,
                });
            } else {
                animation = animate(x, [x.get() - 200, x.get() + 200, x.get() - 200, x.get()], { 
                    times: [0, .05, .1, .15, .2],
                    type: 'spring',
                    stiffness: 1000,
                    duration: .2,
                });
            }

            setTimeout(() => {
                if (levels[idx].choices[selectedChoice].correct) {
                    if (idx < numLevels - 1)
                        idx++;
                    else
                        idx = 0;
                }
                
                selectedChoice = null;
                animation = null;
            }, 1500);
        }
    };
</script>

<div class="w-full h-screen flex flex-col items-center justify-center gap-8">
    {#if isLoaded}
        <div class="flex flex-col items-center justify-center gap-4">
            <h1 class="text-4xl text-white">Question {idx + 1} of {numLevels}</h1>
            <div class="flex flex-row items-center justify-center gap-1">
                {#each levels as level}
                    <div class="w-8 h-4 bg-neutral-600 rounded">
                        <div class="h-full {level.correct == true ? 'bg-green-600 w-full' : level.correct == false ? 'bg-red-600 w-full' : 'w-0'} transition-all duration-500 ease-out rounded"></div>
                    </div>
                {/each}
            </div>
        </div>

        <div class="flex flex-col items-center justify-center gap-4">
            <p class="text-white text-2xl font-bold">Which is the capital of</p>
            <h1 class="text-6xl font-bold text-white">{levels[idx].country}?</h1>
        </div>

        <div class="flex w-1/4 flex-col items-center justify-center gap-4">
            {#each levels[idx].choices as choice, i}
                <Motion let:motion
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1, transition: { duration: 0.25, delay: i * 0.1, ease: 'easeOut' } }}
                    style={selectedChoice === i && choice.correct ? { y } : selectedChoice === i && !choice.correct ? { x } : {}}
                >
                    <button 
                        use:motion
                        onclick={() => submitAnswer(i)} 
                        class="text-white text-4xl w-full font-bold px-6 py-4 rounded transition duration-200 
                            {
                                selectedChoice === null && !choice.selected ? 'bg-earth-light hover:bg-earth-medium' :
                                choice.selected && choice.correct ? 'bg-green-600' : 
                                choice.selected && !choice.correct ? 'bg-red-600' :
                                ''  
                            }
                        "
                    >
                        {choice.choice}
                    </button>
                </Motion>
            {/each}
        </div>
    {/if}
</div>
