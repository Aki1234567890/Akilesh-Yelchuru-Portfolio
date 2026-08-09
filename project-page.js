const projectDetails = {
    lunabotics: {
        kicker: '01 / Recruiter Impact',
        title: 'NASA Lunabotics Rover',
        summary: 'A space robotics rover project focused on mechanical design, subsystem integration, iteration, testing mindset, and mission-driven constraints.',
        shape: 'depth-lunabotics',
        tags: ['Lunabotics', 'Rover', 'CAD', 'Systems', 'Testing'],
        overview: 'This is the strongest recruiter-impact project because it gives reviewers the most technical depth to evaluate. It connects mechanical design, CAD, subsystem coordination, build constraints, testing, and iteration inside a space robotics context.',
        technical: [
            'Developed rover-centered mechanical and subsystem thinking for a planetary exploration-style competition context.',
            'Focused on packaging, manufacturability, subsystem interfaces, testing feedback, and iteration rather than a single isolated component.',
            'Connected CAD decisions to real build constraints and mission-style performance requirements.'
        ],
        tools: ['CAD and mechanical design', 'Subsystem integration', 'Testing and iteration', 'Systems engineering', 'Mission constraints'],
        impact: 'Most impressive for recruiters because it shows deeper effort than the L1 rocket: more integration, more design judgment, stronger space robotics relevance, and more technical conversation depth.'
    },
    glider: {
        kicker: '02 / Aerospace Fundamentals',
        title: 'High-Performance Glider Design & Fabrication',
        summary: 'Designed and built an efficient unpowered glider focused on glide ratio, structural performance, aerodynamic modeling, and design trade studies.',
        shape: 'depth-glider',
        tags: ['Aerodynamic Modeling', 'Siemens NX', 'Structural Optimization', 'MATLAB', 'CFD'],
        overview: 'The glider project demonstrates core aerospace fundamentals through aerodynamic geometry, lightweight structure, CAD modeling, performance analysis, and documentation under realistic constraints.',
        technical: [
            'Optimized lightweight fuselage and high-aspect-ratio wing geometry in Siemens NX.',
            'Used aerodynamic and structural trade studies to balance glide performance, drag reduction, and integrity.',
            'Supported decisions with MATLAB simulations, CFD-based analysis, composite material selection, and technical documentation.'
        ],
        tools: ['Siemens NX', 'MATLAB', 'CFD-based analysis', 'Composite material selection', 'Engineering trade studies'],
        impact: 'Strong for aerospace roles because it shows fundamentals recruiters expect: CAD, aerodynamics, performance tradeoffs, structural reasoning, and documented iteration.'
    },
    vex: {
        kicker: '03 / Robotics Integration',
        title: 'VEX U Robotics Spin Up Dual Flywheel Shooter Robot',
        summary: 'Built a VEX U Spin Up competition robot focused on intake speed, dual-flywheel shooting, autonomous scoring, and integrated competition-ready subsystems.',
        shape: 'depth-robot',
        tags: ['Fusion 360', 'Flywheel Shooter', 'Intake', 'Odometry', 'PID'],
        overview: 'The VEX U robot shows mechanical design and mechatronics integration through drivetrain, intake, shooter, controls, testing, and competition debugging.',
        technical: [
            'Led mechanical design and CAD of multiple intake and dual-flywheel shooter iterations.',
            'Integrated drivetrain, intake, and shooter subsystems into a competition-ready robot architecture.',
            'Worked through rapid prototyping, odometry, PID tuning, test iteration, and competition debugging.'
        ],
        tools: ['Fusion 360', 'Mechanical design', 'Robot drivetrain integration', 'Flywheel shooter design', 'PID control tuning'],
        impact: 'Strong for robotics and mechanical roles because it proves subsystem integration, iteration under pressure, controls awareness, and practical debugging.'
    },
    rocket: {
        kicker: '04 / Certification Build',
        title: 'L1 High-Power Rocket Project',
        summary: 'Designed, built, simulated, launched, and recovered a high-power rocket for NAR Level 1 certification.',
        shape: 'depth-rocket',
        tags: ['CAD', 'OpenRocket', 'Stability', 'Recovery', 'Post-Flight Review'],
        overview: 'The L1 rocket is a focused certification project that demonstrates launch readiness, stability checks, recovery design, fabrication, assembly, checklists, and post-flight review.',
        technical: [
            'Designed and simulated the rocket with attention to stability, recovery reliability, and prediction versus flight behavior.',
            'Moved through fabrication, assembly, test preparation, launch checklists, recovery, and review.',
            'Used the project as a concrete certification milestone and rocketry safety/process demonstration.'
        ],
        tools: ['Computer-Aided Design', 'OpenRocket', 'Rocket stability and recovery design', 'Fabrication and assembly', 'Post-flight data review'],
        impact: 'Useful as a certification and launch-readiness project, but less effort-intensive than Lunabotics. It should support the portfolio rather than be framed as the top project.'
    },
    lspace: {
        kicker: '05 / Systems Engineering',
        title: 'NASA L’SPACE Mission Concept',
        summary: 'Mission design and systems engineering work focused on requirements, interfaces, trade studies, risk, documentation, and mission architecture.',
        shape: 'depth-mission',
        tags: ['Requirements', 'Interfaces', 'Mission Design', 'Trades', 'Risk'],
        overview: 'NASA L’SPACE demonstrates mission-level thinking and systems engineering communication: turning broad mission goals into requirements, trades, interfaces, risks, and documentation.',
        technical: [
            'Developed mission architecture thinking through requirements and constraints.',
            'Used trade studies and interface thinking to connect subsystem decisions to mission-level priorities.',
            'Practiced technical documentation and systems communication for air and space systems.'
        ],
        tools: ['Requirements analysis', 'Trade studies', 'Interface thinking', 'Risk documentation', 'Mission architecture'],
        impact: 'Best for systems engineering conversations because it shows requirements, documentation, interfaces, and design decision traceability.'
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
    document.querySelector('[data-project-overview]').textContent = project.overview;
    document.querySelector('[data-project-technical]').innerHTML = project.technical.map((item) => `<li>${item}</li>`).join('');
    document.querySelector('[data-project-tools]').innerHTML = project.tools.map((item) => `<li>${item}</li>`).join('');
    document.querySelector('[data-project-impact]').textContent = project.impact;

    const visual = document.querySelector('[data-project-visual]');
    visual.className = `project-page-visual ${project.shape}`;
}

renderProject();
