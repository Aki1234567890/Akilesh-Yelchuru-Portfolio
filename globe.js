import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";

const canvas = document.getElementById("interactiveGlobe");
const container = canvas?.parentElement;

if (canvas && container) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0.06, 4.85);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
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
        "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r164/examples/textures/planets/earth_lights_2048.png"
    );
    nightTexture.colorSpace = THREE.SRGBColorSpace;
    nightTexture.anisotropy = 16;

    const dayTexture = textureLoader.load(
        "https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg"
    );
    dayTexture.colorSpace = THREE.SRGBColorSpace;
    dayTexture.anisotropy = 16;

    const bumpTexture = textureLoader.load(
        "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r164/examples/textures/planets/earth_bump_2048.jpg"
    );
    bumpTexture.anisotropy = 16;

    const cloudTexture = textureLoader.load(
        "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r164/examples/textures/planets/earth_clouds_1024.png"
    );
    cloudTexture.colorSpace = THREE.SRGBColorSpace;
    cloudTexture.anisotropy = 16;

    const earthGeometry = new THREE.SphereGeometry(radius, 192, 192);

    const nightMaterial = new THREE.MeshPhongMaterial({
        map: nightTexture,
        bumpMap: bumpTexture,
        bumpScale: 0.025,
        color: new THREE.Color(0x9fb7ff),
        emissive: new THREE.Color(0xffcf78),
        emissiveMap: nightTexture,
        emissiveIntensity: 1.35,
        specular: new THREE.Color(0x111111),
        shininess: 6
    });

    const nightEarth = new THREE.Mesh(earthGeometry, nightMaterial);
    globeGroup.add(nightEarth);

    const dayOverlayMaterial = new THREE.MeshPhongMaterial({
        map: dayTexture,
        bumpMap: bumpTexture,
        bumpScale: 0.018,
        color: new THREE.Color(0x152443),
        transparent: true,
        opacity: 0.18,
        specular: new THREE.Color(0x111827),
        shininess: 10
    });

    const dayOverlay = new THREE.Mesh(
        new THREE.SphereGeometry(radius * 1.002, 192, 192),
        dayOverlayMaterial
    );
    globeGroup.add(dayOverlay);

    const cityGlowMaterial = new THREE.MeshBasicMaterial({
        map: nightTexture,
        color: new THREE.Color(0xffd18a),
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const cityGlow = new THREE.Mesh(
        new THREE.SphereGeometry(radius * 1.006, 160, 160),
        cityGlowMaterial
    );
    globeGroup.add(cityGlow);

    const cloudGeometry = new THREE.SphereGeometry(radius * 1.014, 160, 160);
    const cloudMaterial = new THREE.MeshLambertMaterial({
        map: cloudTexture,
        color: new THREE.Color(0x9bb8ff),
        transparent: true,
        opacity: 0.18,
        depthWrite: false
    });

    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    globeGroup.add(clouds);

    const atmosphereGeometry = new THREE.SphereGeometry(radius * 1.042, 160, 160);
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

    const rimGeometry = new THREE.SphereGeometry(radius * 1.048, 160, 160);
    const rimMaterial = new THREE.MeshBasicMaterial({
        color: 0x88aaff,
        transparent: true,
        opacity: 0.055,
        side: THREE.BackSide,
        depthWrite: false
    });

    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    globeGroup.add(rim);

    scene.add(new THREE.AmbientLight(0x1f2d55, 1.35));

    const moonLight = new THREE.DirectionalLight(0x9eb9ff, 1.1);
    moonLight.position.set(-2.8, 2.4, 3.8);
    scene.add(moonLight);

    const warmCityBoost = new THREE.DirectionalLight(0xffcc88, 0.42);
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
