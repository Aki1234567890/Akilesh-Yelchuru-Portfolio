const projectDetails = {
    lunabotics: {
        kicker: '01 / Recruiter Impact',
        title: 'NASA Lunabotics Rover',
        summary: 'Designed and analyzed mechanical systems for a NASA Lunabotics rover intended to traverse simulated lunar regolith, excavate material, and remain within strict mass and power constraints.',
        shape: 'depth-lunabotics',
        timeline: 'May 2025 — Jun 2026',
        tags: ['Fusion 360', 'ANSYS FEA', 'PDR', 'CDR', 'CAD', 'Manufacturing', 'Risk Analysis', 'Subsystem Integration'],
        overview: 'Designed and analyzed mechanical systems for a NASA Lunabotics rover intended to traverse simulated lunar regolith, excavate material, and remain within strict mass and power constraints. My work focused on the quad-screw drivetrain, auger excavation system, drivetrain sizing, CAD integration, FEA, actuator and gearbox selection, subsystem packaging, and mechanical-electrical interface coordination. The rover design operated around key constraints including ≈40 kg mechanical mass and ≤1200 W mechanical power.',
        technical: [
            'Produced and maintained Fusion 360 CAD models for drivetrain screws, auger integration, chassis layout, and mechanical subsystem packaging.',
            'Developed first-principles drivetrain and excavation models relating geometry, torque, thrust, slip, power draw, friction, helix angle effects, and mechanical efficiency to rover performance.',
            'Performed FEA on rover drivetrain components to evaluate stress, load transfer, and structural reliability under mobility and excavation loading conditions.',
            'Sized and selected actuators and gearboxes to meet drawbar-pull and excavation-rate targets while staying within current, mass, and thermal limits.',
            'Supported architecture downselect for a quad-screw drivetrain enabling strafing and point-turn maneuvers through screw-thread geometry.',
            'Supported the auger vs. bucket-drum comparison framework; team prototype results showed auger excavation collected 1620 g versus 750 g for the bucket drum in the same internal-volume test setup.',
            'Coordinated with electrical subsystem leads to resolve mechanical-electrical integration constraints for drivetrain layout, sensor mounting, packaging, and power distribution.',
            'Delivered a quantitative screw sizing and verification framework used to guide drivetrain and excavation design decisions within the rover’s mass and power envelope.'
        ],
        details: [
            'The Lunabotics rover is framed as a space robotics systems project rather than a single mechanism build. The work emphasizes subsystem interfaces, chassis packaging, drivetrain constraints, excavation architecture, and the mechanical decisions required to make a rover survive practical testing in simulated lunar regolith.',
            'The strongest value of this project is the integration challenge: CAD choices have to account for manufacturing limits, serviceability, subsystem access, weight distribution, reliability, sensor placement, actuator sizing, and mission-style scoring constraints. That makes it a higher-signal recruiter project than a narrow certification build.',
            'The project combines mechanical design, analysis, and system-level coordination through PDR/CDR-style review work, drivetrain and excavation trade studies, and CAD packages that connect geometry to real subsystem constraints.'
        ],
        data: [
            'Analysis work focused on first-principles drivetrain and excavation modeling, including geometry, torque, thrust, slip, friction, helix angle effects, power draw, and mechanical efficiency.',
            'FEA was used to evaluate stress, load transfer, and structural reliability under mobility and excavation loading conditions. These results supported actuator sizing, gearbox selection, drivetrain architecture decisions, and mechanical-electrical packaging coordination.'
        ],
        gallery: [
            {
                src: 'assets/lunabotics/rover-cad.webp',
                alt: 'NASA Lunabotics rover CAD assembly with auger and screw drivetrain',
                title: 'Rover CAD Assembly',
                caption: 'Integrated rover CAD showing auger excavation layout, chassis packaging, and quad-screw drivetrain architecture.'
            },
            {
                src: 'assets/lunabotics/drivetrain-fea.webp',
                alt: 'Blue rover drivetrain structural analysis render',
                title: 'Drivetrain Structure Analysis',
                caption: 'Structural analysis view used to evaluate load transfer and reliability across the screw drivetrain frame.'
            }
        ],
        tools: ['Fusion 360', 'ANSYS FEA', 'PDR', 'CDR', 'CAD', 'Manufacturing', 'Risk Analysis', 'Subsystem Integration'],
        links: [{ label: 'LowInertia Portfolio', href: 'https://lowinertia.com/portfolio/akileshyelchuru' }]
    },
    glider: {
        kicker: '02 / Aerospace Fundamentals',
        title: 'High-Performance Glider Design & Fabrication',
        summary: 'Designed and built an efficient unpowered glider focused on glide ratio, structural performance, aerodynamic modeling, and design trade studies.',
        shape: 'depth-glider',
        timeline: 'Feb 2024 — Present',
        tags: ['Aerodynamic Modeling', 'Siemens NX', 'Structural Optimization', 'MATLAB', 'CFD'],
        overview: 'Designed and built an efficient unpowered glider capable of maximizing glide ratio and structural performance under realistic aerospace constraints. The project involved optimizing a lightweight fuselage and high-aspect-ratio wings in Siemens NX, performing structural and aerodynamic trade studies, and validating performance through MATLAB simulations and scaled model testing.',
        technical: [
            'Delivered a glider concept focused on higher lift-to-drag ratio, glide range, structural resilience, and weight efficiency.',
            'Conducted structural and material trade studies to select carbon-fiber composite strategies for stiffness-to-weight benefits.',
            'Modeled and refined aerodynamic shape using Siemens NX and CFD-based analysis.',
            'Validated performance through MATLAB simulations, physical prototyping, documentation, and performance benchmarks.'
        ],
        details: [
            'Designed and built a performance-optimized glider using carbon-reinforced foam components to meet strict dimensional constraints while preserving efficient glide behavior. The project followed a full aerospace engineering lifecycle, including design exploration, aerodynamic sizing, CAD modeling, theoretical performance validation, and prototype planning.',
            'Key features include a low-Reynolds-number SD7037 airfoil for laminar flow stability, a calculated glide ratio target near 40:1, and tail volume coefficient selection for optimized longitudinal and directional stability. The design process incorporated multiple airframe concepts, including SD7037 and SH-30m configurations, structural sizing, CG analysis with and without payload, and lift/drag estimation validated against expected flight behavior.',
            'Major components were 3D-modeled in Siemens NX, with material selection favoring lightweight polyurethane foam reinforced by acrylic elements. The predicted unpowered glide range was approximately 64 meters from a 1.5-meter drop, with no stored energy or propulsion used. The work was completed under NASA-inspired systems engineering principles with documented roles, reviews, and testable performance metrics.'
        ],
        bom: {
            columns: ['Item', 'Component', 'Part Description', 'Qty', 'Material', 'Cost (USD)', 'Source / Notes'],
            rows: [
                ['1', 'Wing Core', 'High-aspect foam wing panels', '2', 'Polyurethane Foam', '$20.00', 'Cut to shape, reinforced internally'],
                ['2', 'Fuselage Block', 'Streamlined center-body structure', '1', 'Polyurethane Foam', '$15.00', 'CNC trimmed for balance'],
                ['3', 'Tail Surfaces', 'Horizontal and vertical stabilizers', '2', 'Foam & Acrylic Rods', '$10.00', 'Custom dimensions based on stability ratios'],
                ['4', 'Structural Reinforcements', 'Spars, ribs, joints', '6', 'Acrylic', '$12.00', 'Support load transfer at critical joints'],
                ['5', 'Adhesive (Structural)', 'Foam-safe epoxy', '1', '5-min Epoxy', '$6.00', 'Used for key bond locations'],
                ['6', 'Payload Compartment Housing', 'Box enclosure embedded in fuselage', '1', 'Plastic', '$5.00', 'Houses payload volume'],
                ['7', 'Surface Finish', 'Sandpaper and surface treatment', '1', 'N/A', '$3.00', 'Polishing for reduced surface drag'],
                ['8', 'Paint Marker for Visibility', 'Wing and tail edge markings', '1', 'Acrylic Paint', '$2.00', 'Non-reflective coating']
            ]
        },
        data: [
            'No onboard electronics or actuation were used. However, MATLAB scripts were utilized to calculate Reynolds number, lift and drag forces, predict glide ratio and range, analyze center-of-gravity shifts with payload, and estimate stability coefficients for horizontal and vertical tail volume ratios.',
            'These analytical results guided component sizing, aerodynamic shaping, balance decisions, and final CAD refinement before prototype fabrication.'
        ],
        tools: ['Aerodynamic modeling', 'CAD (Siemens NX)', 'Structural optimization', 'Composite material selection', 'MATLAB simulations', 'CFD-based analysis', 'Project management', 'Engineering trade studies', 'Technical documentation'],
        links: [{ label: 'LowInertia Portfolio', href: 'https://lowinertia.com/portfolio/akileshyelchuru' }]
    },
    vex: {
        kicker: '03 / Robotics Integration',
        title: 'VEX U Robotics Spin Up Dual Flywheel Shooter Robot',
        summary: 'Built a VEX U Spin Up competition robot focused on intake speed, dual-flywheel shooting, autonomous scoring, and integrated competition-ready subsystems.',
        shape: 'depth-robot',
        timeline: '2023 — 2024',
        tags: ['Fusion 360', 'Flywheel Shooter', 'Intake', 'Odometry', 'PID'],
        overview: 'Built a VEX U Spin Up competition robot with a focus on fast intake behavior, dual-flywheel shooting consistency, autonomous scoring, and integration between drivetrain, shooter, controls, and mechanical packaging.',
        technical: [
            'Led mechanical design and CAD of multiple intake and dual-flywheel shooter iterations.',
            'Integrated drivetrain, intake, and shooter subsystems into a competition-ready robot architecture.',
            'Improved reliability through rapid prototyping, subsystem testing, competition debugging, and iteration.',
            'Worked across odometry, PID tuning, mechanical constraints, and practical field performance.'
        ],
        details: [
            'The robot centered on a dual-flywheel scoring system, disk intake consistency, drivetrain packaging, and rapid iteration under competition pressure. Design work connected CAD, mechanism layout, shooter geometry, and integration with controls constraints.',
            'Iteration focused on balancing shooting consistency, intake reliability, serviceability, and competition readiness. The project demonstrates practical debugging and subsystem integration rather than isolated CAD modeling.'
        ],
        data: [
            'Controls work included autonomous scoring logic, drivetrain response, odometry awareness, and PID tuning for more repeatable mechanism behavior.',
            'Useful performance metrics include shooter consistency, intake cycle time, drivetrain repeatability, and subsystem failure points found during field testing.'
        ],
        tools: ['Fusion 360', 'Mechanical design', 'Robot drivetrain integration', 'Flywheel shooter design', 'Intake mechanisms', 'PID control tuning', 'Odometry', 'Rapid prototyping'],
        links: [{ label: 'LowInertia Portfolio', href: 'https://lowinertia.com/portfolio/akileshyelchuru' }]
    },
    rocket: {
        kicker: '04 / Certification Build',
        title: 'L1 High-Power Rocket Project',
        summary: 'Designed, built, simulated, launched, and recovered a high-power rocket for NAR Level 1 certification.',
        shape: 'depth-rocket',
        timeline: '2024',
        tags: ['CAD', 'OpenRocket', 'Stability', 'Recovery', 'Post-Flight Review'],
        overview: 'Designed, built, simulated, launched, and recovered a high-power rocket for NAR Level 1 certification. The project emphasized launch readiness, stability checks, fabrication quality, recovery planning, and post-flight review.',
        technical: [
            'Designed and simulated the rocket with attention to stability, recovery reliability, and prediction versus flight behavior.',
            'Moved through fabrication, assembly, test preparation, launch checklists, recovery, and review.',
            'Used OpenRocket and CAD workflows to evaluate flight-readiness decisions.',
            'Completed the project as a focused certification milestone and rocketry safety/process demonstration.'
        ],
        details: [
            'The L1 rocket project followed a focused certification workflow: design, simulation, fabrication, launch preparation, recovery planning, and post-flight review. The main engineering value is process discipline and flight-readiness validation.',
            'Compared with Lunabotics, this project should be presented as a clean certification milestone rather than the portfolio centerpiece. It still supports aerospace credibility by showing stability analysis, recovery thinking, and safety-aware execution.'
        ],
        data: [
            'Simulation and review work centered on OpenRocket predictions, stability margin, center of gravity, center of pressure, expected apogee, recovery timing, and post-flight comparison.',
            'Useful metrics include predicted versus observed flight behavior, recovery outcome, stability margin, and checklist completeness.'
        ],
        tools: ['Computer-aided design', 'OpenRocket', 'Rocket stability', 'Recovery design', 'Fabrication and assembly', 'Launch checklist', 'Post-flight data review'],
        links: [{ label: 'LowInertia Portfolio', href: 'https://lowinertia.com/portfolio/akileshyelchuru' }]
    },
    lspace: {
        kicker: '05 / Systems Engineering',
        title: 'NASA L’SPACE Mission Concept',
        summary: 'Mission design and systems engineering work focused on requirements, interfaces, trade studies, risk, documentation, and mission architecture.',
        shape: 'depth-mission',
        timeline: '2024 — 2025',
        tags: ['Requirements', 'Interfaces', 'Mission Design', 'Trades', 'Risk'],
        overview: 'NASA L’SPACE demonstrates mission-level thinking and systems engineering communication: turning broad mission goals into requirements, trades, interfaces, risks, constraints, and documentation.',
        technical: [
            'Developed mission architecture thinking through requirements and constraints.',
            'Used trade studies and interface thinking to connect subsystem decisions to mission-level priorities.',
            'Practiced technical documentation and systems communication for air and space systems.',
            'Connected technical choices to mission feasibility, stakeholder communication, and risk.'
        ],
        details: [
            'The mission concept work emphasizes systems engineering: translating open-ended mission goals into requirements, interface decisions, risk documentation, trades, and communication artifacts.',
            'The project is strongest when presented as evidence of structured engineering judgment: how constraints are identified, how tradeoffs are documented, and how subsystem choices connect to mission-level objectives.'
        ],
        data: [
            'Analysis work centered on requirements traceability, interface decisions, trade-study reasoning, risk ranking, and documentation clarity.',
            'Useful metrics include requirement coverage, decision rationale, risk mitigation completeness, and how clearly technical trades support the mission architecture.'
        ],
        tools: ['Requirements analysis', 'Trade studies', 'Interface thinking', 'Risk documentation', 'Mission architecture', 'Systems engineering', 'Technical writing'],
        links: [{ label: 'LowInertia Portfolio', href: 'https://lowinertia.com/portfolio/akileshyelchuru' }]
    }
};

const aliases = {
    'nasa-lunabotics-rover': 'lunabotics',
    lunabotics: 'lunabotics',
    rover: 'lunabotics',
    glider: 'glider',
    'high-performance-glider-design-fabrication': 'glider',
    vex: 'vex',
    robot: 'vex',
    'vex-u-robotics-spin-up-dual-flywheel-shooter-robot': 'vex',
    rocket: 'rocket',
    'l1-high-power-rocket-project': 'rocket',
    lspace: 'lspace',
    'nasa-lspace-mission-concept': 'lspace'
};

function slugify(value) {
    return value
        .toLowerCase()
        .replace(/[’']/g, '')
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function getProjectKey() {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('project') || 'lunabotics';
    return aliases[raw] || aliases[slugify(raw)] || 'lunabotics';
}

function renderParagraphs(target, items) {
    target.innerHTML = items.map((item) => `<p>${item}</p>`).join('');
}

function renderBom(project) {
    const section = document.querySelector('[data-bom-section]');
    const head = document.querySelector('[data-project-bom-head]');
    const body = document.querySelector('[data-project-bom-body]');

    if (!project.bom) {
        section.hidden = true;
        head.innerHTML = '';
        body.innerHTML = '';
        return;
    }

    section.hidden = false;
    head.innerHTML = `<tr>${project.bom.columns.map((column) => `<th>${column}</th>`).join('')}</tr>`;
    body.innerHTML = project.bom.rows
        .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`)
        .join('');
}

function renderGallery(project) {
    const section = document.querySelector('[data-gallery-section]');
    const gallery = document.querySelector('[data-project-gallery]');
    const items = project.gallery || [];

    if (!items.length) {
        section.hidden = true;
        gallery.innerHTML = '';
        return;
    }

    section.hidden = false;
    gallery.innerHTML = items.map((item) => `
        <figure class="case-gallery-card">
            <img src="${item.src}" alt="${item.alt}" loading="lazy" />
            <figcaption>
                <strong>${item.title}</strong>
                <span>${item.caption}</span>
            </figcaption>
        </figure>
    `).join('');
}

function setupCaseTabs() {
    const tabs = [...document.querySelectorAll('[data-case-tabs] a')];

    tabs.forEach((tab) => {
        tab.addEventListener('click', (event) => {
            const target = document.querySelector(tab.getAttribute('href'));
            if (!target) return;

            event.preventDefault();
            tabs.forEach((item) => item.classList.remove('is-active'));
            tab.classList.add('is-active');
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.replaceState(null, '', tab.getAttribute('href'));
        });
    });
}

function renderProject() {
    const project = projectDetails[getProjectKey()] || projectDetails.lunabotics;
    document.title = `${project.title} | Akilesh Yelchuru`;

    document.querySelector('[data-project-kicker]').textContent = project.kicker;
    document.querySelector('[data-project-title]').textContent = project.title;
    document.querySelector('[data-project-summary]').textContent = project.summary;
    document.querySelector('[data-project-tags]').innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join('');
    document.querySelector('[data-case-title]').textContent = project.title;
    document.querySelector('[data-project-timeline]').textContent = project.timeline;
    document.querySelector('[data-project-overview]').textContent = project.overview;
    document.querySelector('[data-project-technical]').innerHTML = project.technical.map((item) => `<li>${item}</li>`).join('');
    renderParagraphs(document.querySelector('[data-project-details]'), project.details || []);
    renderBom(project);
    renderParagraphs(document.querySelector('[data-project-data]'), project.data || []);
    renderGallery(project);
    document.querySelector('[data-project-tools]').innerHTML = project.tools.map((item) => `<span>${item}</span>`).join('');
    document.querySelector('[data-project-links]').innerHTML = project.links.map((item) => `<a href="${item.href}" target="_blank" rel="noreferrer">${item.label} ↗</a>`).join('');

    const visual = document.querySelector('[data-project-visual]');
    visual.className = `project-page-visual ${project.shape}`;
}

renderProject();
setupCaseTabs();
