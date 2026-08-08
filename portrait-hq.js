const portraitScaleStyle = document.createElement('style');
portraitScaleStyle.textContent = `
.about-founder {
    grid-template-columns: minmax(360px, 486px) minmax(640px, 1fr) !important;
    align-items: stretch !important;
    gap: 10px !important;
    padding-right: 10px !important;
    padding-bottom: 10px !important;
}

.about-founder .portrait-panel,
.about-founder .founder-copy {
    height: clamp(500px, 31vw, 580px) !important;
    min-height: 0 !important;
}

.about-founder .portrait-panel {
    width: 100% !important;
    max-width: 486px !important;
    justify-self: end !important;
    background: #070707 !important;
}

.about-founder .portrait-panel .portrait-photo {
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: 50% 46% !important;
    transform: none !important;
    transform-origin: center center !important;
    filter: saturate(1.03) contrast(1.04);
}

.about-founder .portrait-panel .portrait-glow {
    background:
        linear-gradient(180deg, rgba(0, 0, 0, 0) 58%, rgba(0, 0, 0, 0.72) 100%),
        linear-gradient(90deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0) 46%) !important;
}

.about-founder .founder-copy {
    align-self: stretch !important;
    display: flex !important;
    justify-content: center !important;
    padding: clamp(46px, 4.2vw, 66px) clamp(54px, 5vw, 86px) !important;
}

.about-founder .founder-copy p {
    max-width: 980px !important;
}

@media (max-width: 1100px) {
    .about-founder {
        grid-template-columns: 1fr !important;
        padding-right: 0 !important;
    }

    .about-founder .portrait-panel,
    .about-founder .founder-copy {
        height: auto !important;
        min-height: 430px !important;
        max-width: none !important;
        justify-self: stretch !important;
    }
}

@media (max-width: 768px) {
    .about-founder .portrait-panel {
        min-height: 500px !important;
    }

    .about-founder .portrait-panel .portrait-photo {
        object-position: 50% 48% !important;
    }

    .about-founder .founder-copy {
        min-height: 0 !important;
        padding: 42px 24px !important;
    }
}
`;
document.head.appendChild(portraitScaleStyle);
