import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";

const canvas = document.getElementById("interactiveGlobe");
const container = canvas?.parentElement;

if (canvas && container) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0.06, 4.85);

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 3));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = -0.08;
    globeGroup.rotation.y = -2.78;
    scene.add(globeGroup);

    const radius = 2.08;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");

    // Clean high-resolution night Earth texture. No day overlay, cloud overlay, or glow layer.
    const nightTexture = textureLoader.load(
        "https://upload.wikimedia.org/wikipedia/commons/b/b3/Solarsystemscope_texture_8k_earth_nightmap.jpg"
    );
    nightTexture.colorSpace = THREE.SRGBColorSpace;
    nightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const bumpTexture = textureLoader.load(
        "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r164/examples/textures/planets/earth_bump_2048.jpg"
    );
    bumpTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const earthGeometry = new THREE.SphereGeometry(radius, 256, 256);

    const earthMaterial = new THREE.MeshPhongMaterial({
        map: nightTexture,
        bumpMap: bumpTexture,
        bumpScale: 0.012,
        color: new THREE.Color(0xffffff),
        emissive: new THREE.Color(0xffffff),
        emissiveMap: nightTexture,
        emissiveIntensity: 0.42,
        specular: new THREE.Color(0x050505),
        shininess: 3
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    globeGroup.add(earth);

    // Subtle rim only, placed behind the sphere so it does not cover the image.
    const atmosphereGeometry = new THREE.SphereGeometry(radius * 1.035, 192, 192);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x4d75ff,
        transparent: true,
        opacity: 0.025,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    globeGroup.add(atmosphere);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));

    const softMoonLight = new THREE.DirectionalLight(0x9eb9ff, 0.28);
    softMoonLight.position.set(-2.8, 2.4, 3.8);
    scene.add(softMoonLight);

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let velocityX = 0;
    let velocityY = 0;

    function onPointerDown(event) {
        isDragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
        container.setPointerCapture?.(event.pointerId);
    }

    function onPointerMove(event) {
        if (!isDragging) return;

        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;

        lastX = event.clientX;
        lastY = event.clientY;

        velocityX = dx * 0.0047;
        velocityY = dy * 0.0047;

        globeGroup.rotation.y += velocityX;
        globeGroup.rotation.x += velocityY;
        globeGroup.rotation.x = Math.max(-1.05, Math.min(0.9, globeGroup.rotation.x));
    }

    function onPointerUp(event) {
        isDragging = false;
        container.releasePointerCapture?.(event.pointerId);
    }

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointerleave", onPointerUp);

    function resize() {
        const width = container.clientWidth;
        const height = container.clientHeight;

        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        const scale = width < 800 ? 1.2 : 1.38;
        globeGroup.scale.setScalar(scale);
        globeGroup.position.y = width < 800 ? -0.92 : -0.96;
    }

    window.addEventListener("resize", resize);
    resize();

    function animate() {
        requestAnimationFrame(animate);

        if (!isDragging) {
            globeGroup.rotation.y += 0.0011 + velocityX * 0.03;
            globeGroup.rotation.x += velocityY * 0.018;
            velocityX *= 0.94;
            velocityY *= 0.94;
        }

        renderer.render(scene, camera);
    }

    animate();
}
