const lunaboticsProjects = [
    {
        title: 'NASA Lunabotics Rover',
        description: 'The strongest recruiter-impact project: a space robotics system with mechanical design, subsystem integration, fabrication thinking, testing, iteration, and mission-driven constraints.',
        tags: ['Lunabotics', 'Rover', 'CAD', 'Systems'],
        shape: 'depth-lunabotics'
    },
    {
        title: 'High-Performance Glider',
        description: 'Aerospace geometry moves forward through glide ratio, drag reduction, and structural decisions resolved into one aircraft form.',
        tags: ['Aerodynamics', 'CAD', 'CFD'],
        shape: 'depth-glider'
    },
    {
        title: 'VEX U Shooter Robot',
        description: 'Mechanism packaging, flywheel motion, intake flow, drivetrain layout, and competition-ready subsystem integration.',
        tags: ['Robotics', 'Mechanisms', 'Controls'],
        shape: 'depth-robot'
    },
    {
        title: 'L1 High-Power Rocket',
        description: 'A focused certification project covering launch readiness, stability, recovery, simulation, fabrication, and post-flight review.',
        tags: ['Rocketry', 'OpenRocket', 'Recovery'],
        shape: 'depth-rocket'
    },
    {
        title: 'NASA L’SPACE Mission Concept',
        description: 'Mission architecture thinking through requirements, interfaces, technical trades, risk, and systems-level decisions.',
        tags: ['Systems', 'Mission', 'Trades'],
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
            return 'NASA Lunabotics Rover is the strongest space robotics project in the portfolio. It shows mechanical design, subsystem integration, iteration, testing mindset, CAD, and mission-driven constraints.';
        }

        if (text.includes('impressive') || text.includes('recruiter') || text.includes('impact') || text.includes('best project')) {
            return 'For recruiter impact, NASA Lunabotics Rover is the strongest project. It shows deeper engineering effort than the L1 rocket: mechanical design, subsystem integration, testing, iteration, and space robotics relevance. The L1 is still useful as a certification project, but Lunabotics gives recruiters more technical depth to evaluate.';
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

    document.querySelectorAll('[data-chat-prompt]').forEach((button) => {
        const prompt = button.dataset.chatPrompt || button.textContent || '';
        if (!/impressive|recruiter|lunabotics|rover/i.test(prompt)) return;

        button.addEventListener('click', (event) => {
            const response = smartAnswer(prompt);
            if (!response) return;

            event.preventDefault();
            event.stopImmediatePropagation();
            openChat();
            addMessage(prompt, 'user');
            window.setTimeout(() => addMessage(response, 'bot'), 220);
        }, true);
    });
}

rebuildProjectTransitionWithLunabotics();
addSmartPortfolioAnswers();
