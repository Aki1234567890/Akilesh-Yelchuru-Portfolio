const projectDetails = {
    lunabotics: {
        kicker: '01 / Recruiter Impact',
        title: 'NASA Lunabotics Rover',
        summary: 'A space robotics rover project focused on mechanical design, subsystem integration, iteration, testing mindset, and mission-driven constraints.',
        shape: 'depth-lunabotics',
        timeline: '2025 — Present',
        tags: ['Lunabotics', 'Rover', 'CAD', 'Systems', 'Testing'],
        overview: 'A NASA Lunabotics rover effort centered on space robotics, mechanical design, subsystem integration, and mission-ready iteration. The project is structured around building a rover that can connect CAD decisions, physical constraints, drivetrain packaging, mechanism design, testing feedback, and competition requirements into one coherent system.',
        technical: [
            'Developed rover-centered mechanical and subsystem thinking for a planetary exploration-style competition context.',
            'Balanced packaging, manufacturability, subsystem interfaces, testing feedback, and iteration instead of treating the rover as a single isolated component.',
            'Connected CAD decisions to real build constraints and mission-style performance requirements.',
            'Built the strongest recruiter-facing project in the portfolio because it shows integration depth, design judgment, and space robotics relevance.'
        ],
        tools: ['CAD and mechanical design', 'Subsystem integration', 'Testing and iteration', 'Systems engineering', 'Mission constraints'],
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
    document.querySelector('[data-project-tools]').innerHTML = project.tools.map((item) => `<span>${item}</span>`).join('');
    document.querySelector('[data-project-links]').innerHTML = project.links.map((item) => `<a href="${item.href}" target="_blank" rel="noreferrer">${item.label} ↗</a>`).join('');

    const visual = document.querySelector('[data-project-visual]');
    visual.className = `project-page-visual ${project.shape}`;
}

renderProject();
