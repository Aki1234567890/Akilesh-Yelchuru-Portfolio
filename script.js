const transitionStyles = document.createElement('link');
transitionStyles.rel = 'stylesheet';
transitionStyles.href = 'project-transitions.css';
document.head.appendChild(transitionStyles);

const projectData = [
    {
        title: 'High-Performance Glider',
        description: 'Aerospace geometry moves forward first: glide ratio, drag reduction, and structural decisions resolve into one aircraft form.',
        tags: ['Aerodynamics', 'CAD', 'CFD'],
        shape: 'depth-glider'
    },
    {
        title: 'VEX U Shooter Robot',
        description: 'The scene shifts from flight surfaces to mechanism packaging, flywheel motion, intake flow, and competition-ready subsystem integration.',
        tags: ['Robotics', 'Mechanisms', 'Controls'],
        shape: 'depth-robot'
    },
    {
        title: 'L1 High-Power Rocket',
        description: 'The camera passes through the mechanical space and lands on launch, stability, recovery, simulation, and post-flight review.',
        tags: ['Rocketry', 'OpenRocket', 'Recovery'],
        shape: 'depth-rocket'
    },
    {
        title: 'NASA L’SPACE Mission Concept',
        description: 'The final transition pulls back into mission architecture: requirements, interfaces, trades, risk, and systems-level decisions.',
        tags: ['Systems', 'Mission', 'Trades'],
        shape: 'depth-mission'
    }
];

const portraitImageData = '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';

function createProjectTransitionStage() {
    const projectIndex = document.querySelector('.project-index');
    const projectHeading = projectIndex?.querySelector('.architecture-heading');
    if (!projectIndex || document.querySelector('.project-transition-stage')) return;

    const stage = document.createElement('div');
    stage.className = 'project-transition-stage';
    stage.innerHTML = `
        <div class="project-transition-copy">
            <span class="project-counter" data-project-counter></span>
            <h3 data-project-title></h3>
            <p data-project-description></p>
            <div class="project-transition-tags" data-project-tags></div>
        </div>
        <div class="project-depth-scene" data-project-scene></div>
        <div class="project-transition-strip" data-project-strip></div>
        <div class="project-transition-controls">
            <button type="button" data-project-prev aria-label="Previous project">‹</button>
            <button type="button" data-project-next aria-label="Next project">›</button>
        </div>
    `;

    if (projectHeading) projectHeading.after(stage);
    else projectIndex.appendChild(stage);

    const scene = stage.querySelector('[data-project-scene]');
    const strip = stage.querySelector('[data-project-strip]');

    projectData.forEach((project, index) => {
        const object = document.createElement('div');
        object.className = `project-depth-object ${project.shape}`;
        object.dataset.projectObject = String(index);
        object.innerHTML = '<span></span><span></span><span></span>';
        scene.appendChild(object);

        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.projectJump = String(index);
        button.textContent = project.title;
        strip.appendChild(button);
    });

    let activeIndex = 0;

    function setActiveProject(nextIndex) {
        activeIndex = (nextIndex + projectData.length) % projectData.length;
        const activeProject = projectData[activeIndex];

        stage.querySelector('[data-project-counter]').textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(projectData.length).padStart(2, '0')}`;
        stage.querySelector('[data-project-title]').textContent = activeProject.title;
        stage.querySelector('[data-project-description]').textContent = activeProject.description;

        const tagWrap = stage.querySelector('[data-project-tags]');
        tagWrap.innerHTML = activeProject.tags.map((tag) => `<span>${tag}</span>`).join('');

        stage.querySelectorAll('[data-project-object]').forEach((object) => {
            const objectIndex = Number(object.dataset.projectObject);
            const diff = (objectIndex - activeIndex + projectData.length) % projectData.length;
            object.classList.remove('is-active', 'is-prev', 'is-next', 'is-far');

            if (diff === 0) object.classList.add('is-active');
            else if (diff === projectData.length - 1) object.classList.add('is-prev');
            else if (diff === 1) object.classList.add('is-next');
            else object.classList.add('is-far');
        });

        stage.querySelectorAll('[data-project-jump]').forEach((button) => {
            button.classList.toggle('is-active', Number(button.dataset.projectJump) === activeIndex);
        });
    }

    stage.querySelector('[data-project-prev]').addEventListener('click', () => setActiveProject(activeIndex - 1));
    stage.querySelector('[data-project-next]').addEventListener('click', () => setActiveProject(activeIndex + 1));
    stage.querySelectorAll('[data-project-jump]').forEach((button) => {
        button.addEventListener('click', () => setActiveProject(Number(button.dataset.projectJump)));
    });

    setActiveProject(0);
}

function loadAboutPortrait() {
    const portraitPanel = document.querySelector('.portrait-panel');
    if (!portraitPanel || portraitPanel.querySelector('.portrait-photo')) return;

    const photo = document.createElement('img');
    photo.className = 'portrait-photo';
    photo.alt = '';
    photo.decoding = 'async';
    photo.src = `data:image/webp;base64,${portraitImageData}`;
    photo.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 42%;z-index:1;display:block;';

    const glow = portraitPanel.querySelector('.portrait-glow');
    const silhouette = portraitPanel.querySelector('.helmet-silhouette');
    const label = portraitPanel.querySelector('.portrait-label');

    portraitPanel.style.background = '#070707';
    portraitPanel.classList.add('has-portrait-image');
    silhouette?.remove();
    if (glow) glow.style.zIndex = '2';
    if (label) label.style.zIndex = '5';
    portraitPanel.prepend(photo);
}

createProjectTransitionStage();
loadAboutPortrait();
document.querySelectorAll('[data-project-details], .index-grid, .architecture-map').forEach((section) => section.remove());

const chatbot = document.querySelector('[data-chatbot]');
const chatToggle = document.querySelector('.chat-toggle');
const chatClose = document.querySelector('[data-chat-close]');
const chatForm = document.querySelector('[data-chat-form]');
const chatMessages = document.querySelector('[data-chat-messages]');
const promptButtons = document.querySelectorAll('[data-chat-prompt]');

const responses = [
    {
        keywords: ['fea', 'structural', 'structure', 'load'],
        text: 'Structural Analysis & FEA is the best category to start with. It connects to rocketry structures, load paths, simulation-ready components, and design validation.'
    },
    {
        keywords: ['cad', 'fusion', 'nx', 'mechanical', 'design'],
        text: 'CAD & Mechanical Design maps to the glider, VEX U robot, and future 3D project viewers. Look for assembly design, mechanism iteration, and design-for-build decisions.'
    },
    {
        keywords: ['rocket', 'recovery', 'openrocket', 'launch'],
        text: 'The L1 High-Power Rocket project is the strongest match. It covers OpenRocket simulation, stability checks, fabrication, launch, recovery, and post-flight review.'
    },
    {
        keywords: ['glider', 'aero', 'aerodynamic', 'flight', 'cfd'],
        text: 'Aerodynamics & Flight Systems links directly to the High-Performance Glider and rocket stability work: drag reduction, glide ratio, flight prediction, and validation.'
    },
    {
        keywords: ['robot', 'vex', 'shooter', 'flywheel'],
        text: 'The VEX U Shooter Robot is the main robotics project. It highlights dual-flywheel shooting, intake design, drivetrain integration, and mechanical iteration.'
    },
    {
        keywords: ['systems', 'mission', 'nasa', 'requirements'],
        text: 'Systems Engineering & Mission Design connects to NASA L’SPACE-style work: requirements, interfaces, constraints, trade studies, and mission architecture.'
    }
];

function setChatOpen(isOpen) {
    if (!chatbot || !chatToggle) return;
    chatbot.classList.toggle('is-open', isOpen);
    chatToggle.setAttribute('aria-expanded', String(isOpen));
}

function addMessage(text, type = 'bot') {
    if (!chatMessages) return;

    const message = document.createElement('p');
    message.className = type === 'user' ? 'user-message' : 'bot-message';
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getResponse(input) {
    const normalized = input.toLowerCase();
    const match = responses.find((item) => item.keywords.some((keyword) => normalized.includes(keyword)));

    if (match) return match.text;

    return 'Try asking about CAD, FEA, rocketry, glider aerodynamics, VEX robotics, simulation, controls, or systems engineering. I can point you to the right portfolio section.';
}

function submitPrompt(prompt) {
    const value = prompt.trim();
    if (!value) return;

    setChatOpen(true);
    addMessage(value, 'user');

    window.setTimeout(() => {
        addMessage(getResponse(value), 'bot');
    }, 260);
}

chatToggle?.addEventListener('click', () => {
    setChatOpen(!chatbot?.classList.contains('is-open'));
});

chatClose?.addEventListener('click', () => setChatOpen(false));

chatForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = chatForm.elements.message;
    submitPrompt(input.value);
    input.value = '';
});

promptButtons.forEach((button) => {
    button.addEventListener('click', () => submitPrompt(button.dataset.chatPrompt || button.textContent || ''));
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const selector = anchor.getAttribute('href');
        if (!selector || selector === '#') return;

        const target = document.querySelector(selector);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
