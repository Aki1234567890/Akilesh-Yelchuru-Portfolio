import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";

const canvas = document.getElementById("interactiveGlobe");
const container = canvas?.parentElement;

if (canvas && container) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.22, 4.55);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x070707, 0);

    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = -0.18;
    globeGroup.rotation.y = -0.82;
    scene.add(globeGroup);

    const radius = 1.95;

    const surfaceGeometry = new THREE.SphereGeometry(radius, 128, 128);
    const surfaceMaterial = new THREE.MeshPhongMaterial({
        color: 0x050505,
        specular: 0x444444,
        shininess: 18,
        transparent: true,
        opacity: 0.92
    });
    const surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
    globeGroup.add(surface);

    const wireGeometry = new THREE.SphereGeometry(radius * 1.003, 64, 64);
    const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0xd8d8d8,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
        depthWrite: false
    });
    const wireSphere = new THREE.Mesh(wireGeometry, wireMaterial);
    globeGroup.add(wireSphere);

    const outerWireGeometry = new THREE.SphereGeometry(radius * 1.007, 32, 32);
    const outerWireMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.055,
        depthWrite: false
    });
    const outerWire = new THREE.Mesh(outerWireGeometry, outerWireMaterial);
    globeGroup.add(outerWire);

    function latLngToVector3(lat, lng, r = radius + 0.018) {
        const phi = (90 - lat) * Math.PI / 180;
        const theta = (lng + 180) * Math.PI / 180;
        return new THREE.Vector3(
            -r * Math.sin(phi) * Math.cos(theta),
            r * Math.cos(phi),
            r * Math.sin(phi) * Math.sin(theta)
        );
    }

    function addLandDots(count, latRange, lngRange, size = 0.0065, opacity = 0.58) {
        const positions = [];
        for (let i = 0; i < count; i++) {
            const lat = latRange[0] + Math.random() * (latRange[1] - latRange[0]);
            const lng = lngRange[0] + Math.random() * (lngRange[1] - lngRange[0]);
            const p = latLngToVector3(lat, lng, radius + 0.025);
            positions.push(p.x, p.y, p.z);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0xd6d6d6,
            size,
            transparent: true,
            opacity,
            depthWrite: false
        });

        const dots = new THREE.Points(geometry, material);
        globeGroup.add(dots);
        return dots;
    }

    addLandDots(2400, [8, 73], [-168, -52]);
    addLandDots(1150, [-55, 12], [-82, -35]);
    addLandDots(1850, [35, 72], [-12, 48]);
    addLandDots(1500, [5, 60], [45, 142]);
    addLandDots(450, [-42, -10], [110, 155], 0.006, 0.48);

    function addOutline(points, opacity = 0.85) {
        const curvePoints = points.map(([lat, lng]) => latLngToVector3(lat, lng, radius + 0.035));
        const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
        const material = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity,
            depthWrite: false
        });
        const line = new THREE.Line(geometry, material);
        globeGroup.add(line);
        return line;
    }

    addOutline([[70,-150],[62,-132],[55,-125],[48,-124],[42,-124],[36,-121],[32,-114],[29,-104],[25,-98],[30,-90],[38,-82],[45,-74],[51,-64],[58,-62],[64,-72],[70,-92],[72,-118],[70,-150]], 0.72);
    addOutline([[50,-80],[46,-72],[43,-70],[41,-73],[43,-77],[47,-80],[50,-80]], 0.82);
    addOutline([[72,-52],[66,-45],[60,-44],[59,-52],[64,-58],[70,-58],[72,-52]], 0.7);
    addOutline([[36,-10],[44,0],[52,10],[58,22],[62,38],[56,48],[47,42],[40,28],[36,10],[36,-10]], 0.6);

    function addArc(lat1, lng1, lat2, lng2, opacity = 0.28) {
        const start = latLngToVector3(lat1, lng1, radius + 0.055);
        const end = latLngToVector3(lat2, lng2, radius + 0.055);
        const mid = start.clone().add(end).normalize().multiplyScalar(radius + 0.42);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(80));
        const material = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity,
            depthWrite: false
        });
        const line = new THREE.Line(geometry, material);
        globeGroup.add(line);
    }

    addArc(42.36, -71.06, 28.54, -81.38, 0.35);
    addArc(42.36, -71.06, 51.5, -0.12, 0.18);
    addArc(28.54, -81.38, 37.77, -122.42, 0.16);

    function createMarker(label, lat, lng, color = 0xff6a2d) {
        const markerGroup = new THREE.Group();

        const markerGeometry = new THREE.SphereGeometry(0.042, 24, 24);
        const markerMaterial = new THREE.MeshBasicMaterial({ color });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.copy(latLngToVector3(lat, lng, radius + 0.09));
        markerGroup.add(marker);

        const pulseGeometry = new THREE.SphereGeometry(0.085, 24, 24);
        const pulseMaterial = new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity: 0.19,
            depthWrite: false
        });
        const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
        pulse.position.copy(marker.position);
        markerGroup.add(pulse);

        globeGroup.add(markerGroup);
        return { marker, pulse, label };
    }

    const markers = [
        createMarker("Florida", 28.54, -81.38, 0xff6a2d),
        createMarker("Massachusetts", 42.36, -71.06, 0xffffff)
    ];

    scene.add(new THREE.AmbientLight(0xffffff, 0.72));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(-2.5, 2.4, 3.2);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.42);
    rimLight.position.set(3, -1.5, -2);
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

        velocityX = dx * 0.005;
        velocityY = dy * 0.005;
        globeGroup.rotation.y += velocityX;
        globeGroup.rotation.x += velocityY;
        globeGroup.rotation.x = Math.max(-1.05, Math.min(0.85, globeGroup.rotation.x));
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

        const scale = width < 800 ? 1.18 : 1.35;
        globeGroup.scale.setScalar(scale);
        globeGroup.position.y = width < 800 ? -1.05 : -1.18;
    }

    window.addEventListener("resize", resize);
    resize();

    function animate(time) {
        requestAnimationFrame(animate);

        if (!isDragging) {
            globeGroup.rotation.y += 0.00145 + velocityX * 0.035;
            globeGroup.rotation.x += velocityY * 0.02;
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
