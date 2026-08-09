const lunaboticsProjects = [
    {
        title: 'NASA Lunabotics Rover',
        description: 'The highest recruiter-impact project: a space robotics rover involving mechanical design, CAD, subsystem integration, iteration, testing, and mission-driven constraints for planetary exploration-style work.',
        tags: ['Lunabotics', 'Rover', 'CAD', 'Systems', 'Testing'],
        shape: 'depth-lunabotics'
    },
    {
        title: 'High-Performance Glider Design & Fabrication',
        description: 'Designed and built an efficient unpowered glider to maximize glide ratio and structural performance under realistic aerospace constraints, using Siemens NX, aerodynamic trade studies, structural optimization, MATLAB simulations, CFD-based analysis, and technical documentation.',
        tags: ['Aerodynamic Modeling', 'Siemens NX', 'Structural Optimization', 'MATLAB', 'CFD'],
        shape: 'depth-glider'
    },
    {
        title: 'VEX U Robotics Spin Up Dual Flywheel Shooter Robot',
        description: 'Built a VEX U Spin Up competition robot focused on fast disk intake, accurate shooting, reliable autonomous scoring, drivetrain-intake-shooter integration, rapid prototyping, odometry, PID tuning, competition debugging, and cross-functional collaboration.',
        tags: ['Fusion 360', 'Flywheel Shooter', 'Intake', 'Odometry', 'PID'],
        shape: 'depth-robot'
    },
    {
        title: 'L1 High-Power Rocket Project',
        description: 'Designed, built, simulated, launched, and recovered a high-power rocket for NAR Level 1 certification, with emphasis on stability, recovery reliability, fabrication, launch checklists, and post-flight data review.',
        tags: ['CAD', 'OpenRocket', 'Stability', 'Recovery', 'Post-Flight Review'],
        shape: 'depth-rocket'
    },
    {
        title: 'NASA L’SPACE Mission Concept',
        description: 'Mission design and systems engineering work focused on requirements, interfaces, trade studies, risk, documentation, and mission architecture for air and space systems.',
        tags: ['Requirements', 'Interfaces', 'Mission Design', 'Trades', 'Risk'],
        shape: 'depth-mission'
    }
];

function rebuildProjectTransitionWithLunabotics() {
    const projectIndex = document.querySelector('.project-index');
    const projectHeading = projectIndex?.querySelector('.architecture-heading');
    if (!projectIndex || !projectHeading) return;

    projectIndex.querySelector('.project-transition-stage')?.remove();

    const stage = document.createElement('div');
    stage.className = 'project-transition-stage';
    stage.innerHTML = `
        <div class="project-transition-copy">
            <span class="project-counter" data-lunabotics-counter></span>
            <h3 data-lunabotics-title></h3>
            <p data-lunabotics-description></p>
            <div class="project-transition-tags" data-lunabotics-tags></div>
        </div>
        <div class="project-depth-scene" data-lunabotics-scene></div>
        <div class="project-transition-strip" data-lunabotics-strip></div>
        <div class="project-transition-controls">
            <button type="button" data-lunabotics-prev aria-label="Previous project">‹</button>
            <button type="button" data-lunabotics-next aria-label="Next project">›</button>
        </div>
    `;

    projectHeading.after(stage);

    const scene = stage.querySelector('[data-lunabotics-scene]');
    const strip = stage.querySelector('[data-lunabotics-strip]');

    lunaboticsProjects.forEach((project, index) => {
        const object = document.createElement('div');
        object.className = `project-depth-object ${project.shape}`;
        object.dataset.projectObject = String(index);
        object.innerHTML = '<span></span><span></span><span></span><span></span>';
        scene.appendChild(object);

        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.projectJump = String(index);
        button.textContent = project.title;
        strip.appendChild(button);
    });

    let activeIndex = 0;

    function setActiveProject(nextIndex) {
        activeIndex = (nextIndex + lunaboticsProjects.length) % lunaboticsProjects.length;
        const activeProject = lunaboticsProjects[activeIndex];

        stage.querySelector('[data-lunabotics-counter]').textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(lunaboticsProjects.length).padStart(2, '0')}`;
        stage.querySelector('[data-lunabotics-title]').textContent = activeProject.title;
        stage.querySelector('[data-lunabotics-description]').textContent = activeProject.description;
        stage.querySelector('[data-lunabotics-tags]').innerHTML = activeProject.tags.map((tag) => `<span>${tag}</span>`).join('');

        stage.querySelectorAll('[data-project-object]').forEach((object) => {
            const objectIndex = Number(object.dataset.projectObject);
            const diff = (objectIndex - activeIndex + lunaboticsProjects.length) % lunaboticsProjects.length;
            object.classList.remove('is-active', 'is-prev', 'is-next', 'is-far');

            if (diff === 0) object.classList.add('is-active');
            else if (diff === lunaboticsProjects.length - 1) object.classList.add('is-prev');
            else if (diff === 1) object.classList.add('is-next');
            else object.classList.add('is-far');
        });

        stage.querySelectorAll('[data-project-jump]').forEach((button) => {
            button.classList.toggle('is-active', Number(button.dataset.projectJump) === activeIndex);
        });
    }

    stage.querySelector('[data-lunabotics-prev]').addEventListener('click', () => setActiveProject(activeIndex - 1));
    stage.querySelector('[data-lunabotics-next]').addEventListener('click', () => setActiveProject(activeIndex + 1));
    stage.querySelectorAll('[data-project-jump]').forEach((button) => {
        button.addEventListener('click', () => setActiveProject(Number(button.dataset.projectJump)));
    });

    setActiveProject(0);
}

function importLowInertiaBioCopy() {
    const heroParagraph = document.querySelector('.hero-copy p');
    if (heroParagraph) {
        heroParagraph.textContent = 'Aerospace engineering student at Florida Institute of Technology focused on efficient, mission-driven systems for air and space: NASA L’SPACE mission design, VEX U robotics, glider aerodynamics, thermal analysis, and mechanical systems integration.';
    }

    const about = document.querySelector('.founder-copy');
    if (about) {
        const paragraphs = about.querySelectorAll('p');
        if (paragraphs[0]) paragraphs[0].textContent = 'Akilesh Yelchuru is an aerospace engineering student at Florida Institute of Technology with a passion for designing efficient, mission-driven systems for air and space.';
        if (paragraphs[1]) paragraphs[1].textContent = 'His experience spans NASA L’SPACE mission design, competitive VEX U robotics, hands-on glider aerodynamics, thermal analysis, structural and thermal simulation, mechanical systems integration, and technical documentation.';
        if (paragraphs[2]) paragraphs[2].textContent = 'He brings a strong foundation in 3D CAD modeling with NX, SolidWorks, and Fusion 360; Python, C++, MATLAB, and Arduino for automation and data analysis; engineering documentation; cross-team collaboration; and trade-study-driven decision making.';
    }

    const focusCard = Array.from(document.querySelectorAll('.about-contact-grid div')).find((card) => card.textContent.includes('Focus'));
    const focusText = focusCard?.querySelector('strong');
    if (focusText) {
        focusText.textContent = 'Aerospace systems, CAD, simulation, robotics, thermal analysis';
    }

    const askCopy = document.querySelector('.ask-content p');
    if (askCopy) {
        askCopy.textContent = 'Ask about NASA Lunabotics, recruiter impact, CAD, FEA, glider aerodynamics, VEX robotics, L1 rocketry, NASA L’SPACE, simulation, controls, or systems engineering.';
    }

    const promptList = document.querySelector('.prompt-list');
    if (promptList && !promptList.querySelector('[data-chat-prompt="What project has the most recruiter impact?"]')) {
        const prompts = [
            'What project has the most recruiter impact?',
            'Explain the NASA Lunabotics rover.',
            'Show my CAD and simulation experience.'
        ];

        prompts.forEach((prompt) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.dataset.chatPrompt = prompt;
            button.textContent = prompt;
            promptList.appendChild(button);
        });
    }
}

function addSmartPortfolioAnswers() {
    const chatForm = document.querySelector('[data-chat-form]');
    const chatMessages = document.querySelector('[data-chat-messages]');
    const chatbot = document.querySelector('[data-chatbot]');
    const chatToggle = document.querySelector('.chat-toggle');
    if (!chatForm || !chatMessages) return;

    function openChat() {
        chatbot?.classList.add('is-open');
        chatToggle?.setAttribute('aria-expanded', 'true');
    }

    function addMessage(text, type = 'bot') {
        const message = document.createElement('p');
        message.className = type === 'user' ? 'user-message' : 'bot-message';
        message.textContent = text;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function smartAnswer(input) {
        const text = input.toLowerCase();

        if (text.includes('lunabotics') || text.includes('rover')) {
            return 'NASA Lunabotics Rover is the strongest recruiter-impact project in the portfolio. It shows space robotics relevance, CAD/mechanical design, subsystem integration, testing mindset, iteration, and mission-driven constraints.';
        }

        if (text.includes('impressive') || text.includes('recruiter') || text.includes('impact') || text.includes('best project')) {
            return 'For recruiter impact, NASA Lunabotics Rover is the strongest project. It shows deeper engineering effort than the L1 rocket: mechanical design, subsystem integration, testing, iteration, and space robotics relevance. The L1 is useful as a certification project, but Lunabotics gives recruiters more technical depth to evaluate.';
        }

        if (text.includes('cad') || text.includes('simulation') || text.includes('thermal')) {
            return 'The portfolio shows CAD and simulation through NX, SolidWorks, Fusion 360, MATLAB, CFD-based analysis, structural and thermal simulation, and design trade studies across glider, robotics, rocketry, and mission-system work.';
        }

        return '';
    }

    chatForm.addEventListener('submit', (event) => {
        const input = chatForm.elements.message;
        const value = input?.value?.trim() || '';
        const response = smartAnswer(value);
        if (!response) return;

        event.preventDefault();
        event.stopImmediatePropagation();
        openChat();
        addMessage(value, 'user');
        input.value = '';
        window.setTimeout(() => addMessage(response, 'bot'), 220);
    }, true);

    document.addEventListener('click', (event) => {
        const button = event.target.closest('[data-chat-prompt]');
        if (!button) return;

        const prompt = button.dataset.chatPrompt || button.textContent || '';
        const response = smartAnswer(prompt);
        if (!response) return;

        event.preventDefault();
        event.stopImmediatePropagation();
        openChat();
        addMessage(prompt, 'user');
        window.setTimeout(() => addMessage(response, 'bot'), 220);
    }, true);
}

rebuildProjectTransitionWithLunabotics();
importLowInertiaBioCopy();
addSmartPortfolioAnswers();
