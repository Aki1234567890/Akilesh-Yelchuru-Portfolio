import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";

const canvas = document.getElementById("interactiveGlobe");
const container = canvas?.parentElement;

if (canvas && container) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0.06, 4.85);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
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

    const nightTexture = textureLoader.load(
        "https://upload.wikimedia.org/wikipedia/commons/b/b3/Solarsystemscope_texture_8k_earth_nightmap.jpg"
    );
    nightTexture.colorSpace = THREE.SRGBColorSpace;
    nightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const dayTexture = textureLoader.load(
        "https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg"
    );
    dayTexture.colorSpace = THREE.SRGBColorSpace;
    dayTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const bumpTexture = textureLoader.load(
        "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r164/examples/textures/planets/earth_bump_2048.jpg"
    );
    bumpTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const cloudTexture = textureLoader.load(
        "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r164/examples/textures/planets/earth_clouds_1024.png"
    );
    cloudTexture.colorSpace = THREE.SRGBColorSpace;
    cloudTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const earthGeometry = new THREE.SphereGeometry(radius, 256, 256);

    const nightMaterial = new THREE.MeshPhongMaterial({
        map: nightTexture,
        bumpMap: bumpTexture,
        bumpScale: 0.022,
        color: new THREE.Color(0xb8c8ff),
        emissive: new THREE.Color(0xffc46f),
        emissiveMap: nightTexture,
        emissiveIntensity: 1.55,
        specular: new THREE.Color(0x111111),
        shininess: 7
    });

    const nightEarth = new THREE.Mesh(earthGeometry, nightMaterial);
    globeGroup.add(nightEarth);

    const dayOverlayMaterial = new THREE.MeshPhongMaterial({
        map: dayTexture,
        bumpMap: bumpTexture,
        bumpScale: 0.014,
        color: new THREE.Color(0x0d1d3c),
        transparent: true,
        opacity: 0.12,
        specular: new THREE.Color(0x0a1225),
        shininess: 8
    });

    const dayOverlay = new THREE.Mesh(
        new THREE.SphereGeometry(radius * 1.0015, 256, 256),
        dayOverlayMaterial
    );
    globeGroup.add(dayOverlay);

    const cityGlowMaterial = new THREE.MeshBasicMaterial({
        map: nightTexture,
        color: new THREE.Color(0xffd596),
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const cityGlow = new THREE.Mesh(
        new THREE.SphereGeometry(radius * 1.006, 224, 224),
        cityGlowMaterial
    );
    globeGroup.add(cityGlow);

    const cloudGeometry = new THREE.SphereGeometry(radius * 1.014, 192, 192);
    const cloudMaterial = new THREE.MeshLambertMaterial({
        map: cloudTexture,
        color: new THREE.Color(0x9bb8ff),
        transparent: true,
        opacity: 0.14,
        depthWrite: false
    });

    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    globeGroup.add(clouds);

    const atmosphereGeometry = new THREE.SphereGeometry(radius * 1.042, 192, 192);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x5d86ff,
        transparent: true,
        opacity: 0.12,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    globeGroup.add(atmosphere);

    const rimGeometry = new THREE.SphereGeometry(radius * 1.048, 192, 192);
    const rimMaterial = new THREE.MeshBasicMaterial({
        color: 0x88aaff,
        transparent: true,
        opacity: 0.055,
        side: THREE.BackSide,
        depthWrite: false
    });

    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    globeGroup.add(rim);

    scene.add(new THREE.AmbientLight(0x1f2d55, 1.25));

    const moonLight = new THREE.DirectionalLight(0x9eb9ff, 1.0);
    moonLight.position.set(-2.8, 2.4, 3.8);
    scene.add(moonLight);

    const warmCityBoost = new THREE.DirectionalLight(0xffcc88, 0.45);
    warmCityBoost.position.set(1.8, -0.6, 2.5);
    scene.add(warmCityBoost);

    const rimLight = new THREE.DirectionalLight(0x90b7ff, 0.5);
    rimLight.position.set(2.5, 1.2, -3.5);
    scene.add(rimLight);

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

        clouds.rotation.y += 0.00042;
        cityGlow.rotation.y += 0.00004;
        renderer.render(scene, camera);
    }

    animate();
}
