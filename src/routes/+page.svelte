<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import * as THREE from 'three';

    let canvas;

    onMount(() => {
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        if (browser) {
            let scene = new THREE.Scene();
            let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 4);
            let renderer = new THREE.WebGLRenderer({ canvas: canvas });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

            const textureLoader = new THREE.TextureLoader();
            const earthTexture = textureLoader.load('/assets/textures/earth_8k/earth.jpg');
            earthTexture.colorSpace = THREE.SRGBColorSpace;
            const cloudTexture = textureLoader.load('/assets/textures/earth_4k/clouds.webp');
            cloudTexture.colorSpace = THREE.SRGBColorSpace;
            const normalTexture = textureLoader.load('/assets/textures/earth_4k/normal.webp');
            // const specularTexture = textureLoader.load('/assets/textures/earth_8k/specular.tif');

            const earth = new THREE.Group();

            const surface = new THREE.Mesh(
                new THREE.SphereGeometry(1, 64, 64),
                new THREE.MeshStandardMaterial({ 
                    map: earthTexture,
                    normalMap: normalTexture,
                    // specularMap: specularTexture,
                })
            );
            earth.add(surface);

            const clouds = new THREE.Mesh(
                new THREE.SphereGeometry(1.01, 64, 64),
                new THREE.MeshStandardMaterial({ 
                    transparent: true,
                    alphaMap: cloudTexture,
                    map: cloudTexture,
                })
            );
            earth.add(clouds);

            scene.add(earth);
            earth.position.y = -0.5;
            earth.position.z = 3;
            earth.rotation.z = Math.PI / 4;

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
            directionalLight.position.set(0, 1.5, -1);
            scene.add(directionalLight);

            const orbitControls = new OrbitControls(camera, canvas);
            orbitControls.enableDamping = true;
            orbitControls.dampingFactor = 0.05;

            const init = () => {
                camera.position.z = 5;

                const animate = () => {
                    requestAnimationFrame(animate);

                    earth.rotation.x += 0.001;

                    orbitControls.update();
                    renderer.render(scene, camera);
                };

                animate();
            }

            window.addEventListener('resize', () => {
                sizes.width = window.innerWidth
                sizes.height = window.innerHeight

                camera.aspect = sizes.width / sizes.height
                camera.updateProjectionMatrix()

                renderer.setSize(sizes.width, sizes.height)
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            })

            init();
        }
    });
</script>

<canvas bind:this={canvas} class="absolute background pointer-events-none"></canvas>

<div class="absolute w-full h-screen flex flex-col items-center gap-16 justify-center">
    <div class="flex flex-col items-center justify-center gap-4 mt-40">
        <h1 class="text-9xl font-bold text-white ">GeoTrivia</h1>
        <p class="text-white text-4xl font-bold">The quiz game about the Earth</p>
    </div>
    <a href='home' class="text-white text-2xl font-bold bg-earth-light rounded-full py-2 px-8 hover:bg-earth-medium active:bg-earth-dark transition-all duration-200 ease-out">Start</a>
</div>
