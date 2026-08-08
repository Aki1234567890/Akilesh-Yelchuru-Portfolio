const transitionStyles = document.createElement('link');
transitionStyles.rel = 'stylesheet';
transitionStyles.href = 'project-transitions.css';
document.head.appendChild(transitionStyles);

const projectData = [
    {
        title: 'High-Performance Glider',
        description: 'Aerospace geometry moves forward first: glide ratio, drag reduction, and structural decisions resolve into one aircraft form.',
        tags: ['Aerodynamics', 'CAD', 'CFD'],
        shape: 'depth-glider',
        slug: 'project-glider'
    },
    {
        title: 'VEX U Shooter Robot',
        description: 'The scene shifts from flight surfaces to mechanism packaging, flywheel motion, intake flow, and competition-ready subsystem integration.',
        tags: ['Robotics', 'Mechanisms', 'Controls'],
        shape: 'depth-robot',
        slug: 'project-vex-shooter'
    },
    {
        title: 'L1 High-Power Rocket',
        description: 'The camera passes through the mechanical space and lands on launch, stability, recovery, simulation, and post-flight review.',
        tags: ['Rocketry', 'OpenRocket', 'Recovery'],
        shape: 'depth-rocket',
        slug: 'project-l1-rocket'
    },
    {
        title: 'NASA L’SPACE Mission Concept',
        description: 'The final transition pulls back into mission architecture: requirements, interfaces, trades, risk, and systems-level decisions.',
        tags: ['Systems', 'Mission', 'Trades'],
        shape: 'depth-mission',
        slug: 'project-nasa-lspace'
    }
];

function createProjectTransitionStage() {
    const projectIndex = document.querySelector('.project-index');
    const detailStack = document.querySelector('[data-project-details]');
    if (!projectIndex || !detailStack || document.querySelector('.project-transition-stage')) return;

    const stage = document.createElement('div');
    stage.className = 'project-transition-stage';
    stage.innerHTML = `
        <div class="project-transition-copy">
            <span class="project-counter" data-project-counter></span>
            <h3 data-project-title></h3>
            <p data-project-description></p>
            <div class="project-transition-tags" data-project-tags></div>
            <button class="project-open-link" type="button" data-project-open>Open Project <span>➜</span></button>
        </div>
        <div class="project-depth-scene" data-project-scene></div>
        <div class="project-transition-strip" data-project-strip></div>
        <div class="project-transition-controls">
            <button type="button" data-project-prev aria-label="Previous project">‹</button>
            <button type="button" data-project-next aria-label="Next project">›</button>
        </div>
    `;

    detailStack.before(stage);

    const scene = stage.querySelector('[data-project-scene]');
    const strip = stage.querySelector('[data-project-strip]');

    function openProject(index) {
        const target = document.getElementById(projectData[index].slug);
        if (!target) return;

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', `#${projectData[index].slug}`);
    }

    projectData.forEach((project, index) => {
        const object = document.createElement('div');
        object.className = `project-depth-object ${project.shape}`;
        object.dataset.projectObject = String(index);
        object.setAttribute('role', 'button');
        object.setAttribute('tabindex', '0');
        object.setAttribute('aria-label', `Open ${project.title}`);
        object.innerHTML = '<span></span><span></span><span></span>';
        scene.appendChild(object);

        object.addEventListener('click', () => {
            if (object.classList.contains('is-active')) openProject(index);
            else setActiveProject(index);
        });

        object.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            if (object.classList.contains('is-active')) openProject(index);
            else setActiveProject(index);
        });

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

        const openButton = stage.querySelector('[data-project-open]');
        openButton.setAttribute('aria-label', `Open ${activeProject.title}`);

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
    stage.querySelector('[data-project-open]').addEventListener('click', () => openProject(activeIndex));

    stage.querySelectorAll('[data-project-jump]').forEach((button) => {
        button.addEventListener('click', () => {
            const targetIndex = Number(button.dataset.projectJump);
            if (targetIndex === activeIndex) openProject(targetIndex);
            else setActiveProject(targetIndex);
        });
    });

    setActiveProject(0);
}

createProjectTransitionStage();

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
