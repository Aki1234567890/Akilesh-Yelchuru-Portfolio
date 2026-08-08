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
