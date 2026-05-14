import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";

const canvas = document.getElementById("interactiveGlobe");
const container = canvas?.parentElement;

if (canvas && container) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.35, 4.4);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = -0.28;
    globeGroup.rotation.y = -0.55;
    scene.add(globeGroup);

    const radius = 1.82;

    const sphereGeometry = new THREE.SphereGeometry(radius, 96, 96);
    const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.18
    });
    const wireSphere = new THREE.Mesh(sphereGeometry, wireMaterial);
    globeGroup.add(wireSphere);

    const haloGeometry = new THREE.SphereGeometry(radius * 1.002, 96, 96);
    const haloMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.035
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    globeGroup.add(halo);

    function latLngToVector3(lat, lng, r = radius + 0.012) {
        const phi = (90 - lat) * Math.PI / 180;
        const theta = (lng + 180) * Math.PI / 180;
        return new THREE.Vector3(
            -r * Math.sin(phi) * Math.cos(theta),
            r * Math.cos(phi),
            r * Math.sin(phi) * Math.sin(theta)
        );
    }

    function makeDotCloud(count, latRange, lngRange, size = 0.008) {
        const positions = [];
        for (let i = 0; i < count; i++) {
            const lat = latRange[0] + Math.random() * (latRange[1] - latRange[0]);
            const lng = lngRange[0] + Math.random() * (lngRange[1] - lngRange[0]);
            const p = latLngToVector3(lat, lng, radius + 0.02);
            positions.push(p.x, p.y, p.z);
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        const mat = new THREE.PointsMaterial({
            color: 0xffffff,
            size,
            transparent: true,
            opacity: 0.64,
            depthWrite: false
        });
        return new THREE.Points(geo, mat);
    }

    const dotClouds = new THREE.Group();
    dotClouds.add(makeDotCloud(1200, [8, 72], [-170, -50]));
    dotClouds.add(makeDotCloud(600, [-55, 12], [-82, -35]));
    dotClouds.add(makeDotCloud(1150, [35, 72], [-12, 45]));
    dotClouds.add(makeDotCloud(900, [5, 60], [45, 140]));
    globeGroup.add(dotClouds);

    function addArc(lat1, lng1, lat2, lng2, opacity = 0.42) {
        const start = latLngToVector3(lat1, lng1, radius + 0.035);
        const end = latLngToVector3(lat2, lng2, radius + 0.035);
        const mid = start.clone().add(end).normalize().multiplyScalar(radius + 0.28);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(60);
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity });
        const line = new THREE.Line(geo, mat);
        globeGroup.add(line);
    }

    addArc(42.36, -71.06, 28.54, -81.38, 0.52);
    addArc(28.54, -81.38, 51.5, -0.12, 0.22);
    addArc(42.36, -71.06, 37.77, -122.42, 0.22);
    addArc(28.54, -81.38, 35.68, 139.69, 0.18);

    function createMarker(label, lat, lng, color = 0xff6a2d) {
        const group = new THREE.Group();
        const markerGeo = new THREE.SphereGeometry(0.04, 24, 24);
        const markerMat = new THREE.MeshBasicMaterial({ color });
        const marker = new THREE.Mesh(markerGeo, markerMat);
        marker.position.copy(latLngToVector3(lat, lng, radius + 0.08));
        group.add(marker);

        const pulseGeo = new THREE.SphereGeometry(0.075, 24, 24);
        const pulseMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.22 });
        const pulse = new THREE.Mesh(pulseGeo, pulseMat);
        pulse.position.copy(marker.position);
        group.add(pulse);

        globeGroup.add(group);
        return { marker, pulse, label };
    }

    const markers = [
        createMarker("Florida", 28.54, -81.38),
        createMarker("Massachusetts", 42.36, -71.06, 0xffffff)
    ];

    const ambient = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambient);

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

        velocityX = dx * 0.006;
        velocityY = dy * 0.006;
        globeGroup.rotation.y += velocityX;
        globeGroup.rotation.x += velocityY;
        globeGroup.rotation.x = Math.max(-1.25, Math.min(1.05, globeGroup.rotation.x));
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

        const scale = width < 800 ? 0.95 : 1.12;
        globeGroup.scale.setScalar(scale);
        globeGroup.position.y = width < 800 ? -0.25 : -0.42;
    }

    window.addEventListener("resize", resize);
    resize();

    function animate(time) {
        requestAnimationFrame(animate);

        if (!isDragging) {
            globeGroup.rotation.y += 0.0022 + velocityX * 0.04;
            globeGroup.rotation.x += velocityY * 0.025;
            velocityX *= 0.94;
            velocityY *= 0.94;
        }

        markers.forEach((item, index) => {
            const pulseScale = 1 + Math.sin(time * 0.004 + index) * 0.28;
            item.pulse.scale.setScalar(pulseScale);
        });

        renderer.render(scene, camera);
    }

    animate(0);
}
