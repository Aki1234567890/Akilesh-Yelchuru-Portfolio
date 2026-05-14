import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";

const canvas = document.getElementById("interactiveGlobe");
const container = canvas?.parentElement;

if (canvas && container) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100);
    camera.position.set(0, 0.05, 4.75);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = -0.08;
    globeGroup.rotation.y = -2.78;
    scene.add(globeGroup);

    const radius = 2.04;

    const surfaceGeometry = new THREE.SphereGeometry(radius, 160, 160);
    const surfaceMaterial = new THREE.MeshPhongMaterial({
        color: 0x020202,
        specular: 0x222222,
        shininess: 10,
        transparent: true,
        opacity: 0.96
    });
    const surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
    globeGroup.add(surface);

    const gridGeometry = new THREE.SphereGeometry(radius * 1.004, 56, 56);
    const gridMaterial = new THREE.MeshBasicMaterial({
        color: 0x8f8f8f,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
        depthWrite: false
    });
    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    globeGroup.add(grid);

    const outerGridGeometry = new THREE.SphereGeometry(radius * 1.01, 28, 28);
    const outerGridMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.055,
        depthWrite: false
    });
    const outerGrid = new THREE.Mesh(outerGridGeometry, outerGridMaterial);
    globeGroup.add(outerGrid);

    function latLngToVector3(lat, lng, r = radius + 0.018) {
        const phi = (90 - lat) * Math.PI / 180;
        const theta = (lng + 180) * Math.PI / 180;
        return new THREE.Vector3(
            -r * Math.sin(phi) * Math.cos(theta),
            r * Math.cos(phi),
            r * Math.sin(phi) * Math.sin(theta)
        );
    }

    function addDotField(count, latRange, lngRange, size = 0.006, opacity = 0.56) {
        const positions = [];
        for (let i = 0; i < count; i++) {
            const lat = latRange[0] + Math.random() * (latRange[1] - latRange[0]);
            const lng = lngRange[0] + Math.random() * (lngRange[1] - lngRange[0]);
            const p = latLngToVector3(lat, lng, radius + 0.026);
            positions.push(p.x, p.y, p.z);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0xb8b8b8,
            size,
            transparent: true,
            opacity,
            depthWrite: false
        });

        const points = new THREE.Points(geometry, material);
        globeGroup.add(points);
        return points;
    }

    function addOutline(points, opacity = 0.9) {
        const positions = points.map(([lat, lng]) => latLngToVector3(lat, lng, radius + 0.042));
        const geometry = new THREE.BufferGeometry().setFromPoints(positions);
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

    // Dense dotted land texture, biased toward the Asia-Pacific view from the reference.
    addDotField(3000, [6, 58], [65, 145], 0.0061, 0.58);      // Asia
    addDotField(1200, [-10, 20], [95, 150], 0.0056, 0.52);    // Southeast Asia / islands
    addDotField(550, [-45, -10], [110, 155], 0.0058, 0.5);    // Australia
    addDotField(1500, [8, 72], [-170, -55], 0.0058, 0.42);    // North America, lower opacity
    addDotField(800, [35, 72], [-12, 48], 0.0055, 0.38);      // Europe
    addDotField(700, [-55, 12], [-82, -35], 0.0055, 0.38);    // South America

    // Thin outline approximations to match the white coastline/country-line look.
    addOutline([[8,77],[13,80],[20,85],[22,90],[20,97],[16,103],[13,108],[10,113],[6,109],[4,101],[6,94],[8,87],[8,77]], 0.7);
    addOutline([[52,73],[48,88],[43,96],[39,105],[35,115],[31,122],[26,121],[21,113],[20,104],[25,96],[31,88],[38,78],[45,70],[52,73]], 0.85);
    addOutline([[46,128],[42,133],[36,139],[31,140],[30,134],[34,128],[39,126],[46,128]], 0.92); // Japan/Korea region
    addOutline([[23,120],[20,122],[17,121],[18,118],[22,118],[23,120]], 0.9);
    addOutline([[14,100],[12,105],[8,106],[5,101],[8,98],[12,97],[14,100]], 0.72);
    addOutline([[1,103],[-3,108],[-6,114],[-8,119],[-5,123],[0,121],[3,115],[4,108],[1,103]], 0.68);
    addOutline([[-10,114],[-15,122],[-22,132],[-31,139],[-38,146],[-43,145],[-36,135],[-28,126],[-20,118],[-10,114]], 0.62);
    addOutline([[70,-150],[62,-132],[55,-125],[48,-124],[42,-124],[36,-121],[32,-114],[29,-104],[25,-98],[30,-90],[38,-82],[45,-74],[51,-64],[58,-62],[64,-72],[70,-92],[72,-118],[70,-150]], 0.42);
    addOutline([[50,-80],[46,-72],[43,-70],[41,-73],[43,-77],[47,-80],[50,-80]], 0.6);

    function addArc(lat1, lng1, lat2, lng2, opacity = 0.18) {
        const start = latLngToVector3(lat1, lng1, radius + 0.055);
        const end = latLngToVector3(lat2, lng2, radius + 0.055);
        const mid = start.clone().add(end).normalize().multiplyScalar(radius + 0.38);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(90));
        const material = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity,
            depthWrite: false
        });
        const arc = new THREE.Line(geometry, material);
        globeGroup.add(arc);
    }

    addArc(42.36, -71.06, 28.54, -81.38, 0.22);
    addArc(28.54, -81.38, 35.68, 139.69, 0.16);
    addArc(42.36, -71.06, 35.68, 139.69, 0.14);

    function createMarker(label, lat, lng, color = 0xff6a2d) {
        const group = new THREE.Group();
        const markerGeometry = new THREE.SphereGeometry(0.043, 24, 24);
        const markerMaterial = new THREE.MeshBasicMaterial({ color });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.copy(latLngToVector3(lat, lng, radius + 0.09));
        group.add(marker);

        const pulseGeometry = new THREE.SphereGeometry(0.086, 24, 24);
        const pulseMaterial = new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity: 0.18,
            depthWrite: false
        });
        const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
        pulse.position.copy(marker.position);
        group.add(pulse);

        globeGroup.add(group);
        return { marker, pulse, label };
    }

    const markers = [
        createMarker("Florida", 28.54, -81.38, 0xff6a2d),
        createMarker("Massachusetts", 42.36, -71.06, 0xffffff)
    ];

    scene.add(new THREE.AmbientLight(0xffffff, 0.68));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.15);
    keyLight.position.set(-2.2, 2.6, 3.0);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.32);
    rimLight.position.set(3.0, -1.5, -2.0);
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

        velocityX = dx * 0.0048;
        velocityY = dy * 0.0048;
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

        const scale = width < 800 ? 1.24 : 1.42;
        globeGroup.scale.setScalar(scale);
        globeGroup.position.y = width < 800 ? -0.92 : -0.98;
    }

    window.addEventListener("resize", resize);
    resize();

    function animate(time) {
        requestAnimationFrame(animate);

        if (!isDragging) {
            globeGroup.rotation.y += 0.00115 + velocityX * 0.03;
            globeGroup.rotation.x += velocityY * 0.018;
            velocityX *= 0.94;
            velocityY *= 0.94;
        }

        markers.forEach((item, index) => {
            const pulseScale = 1 + Math.sin(time * 0.004 + index) * 0.26;
            item.pulse.scale.setScalar(pulseScale);
        });

        renderer.render(scene, camera);
    }

    animate(0);
}
