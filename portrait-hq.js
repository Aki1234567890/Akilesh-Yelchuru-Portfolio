const portraitScaleStyle = document.createElement('style');
portraitScaleStyle.textContent = `
.about-founder {
    display: grid !important;
    grid-template-columns: minmax(380px, 504px) minmax(0, 1fr) !important;
    align-items: stretch !important;
    gap: 0 !important;
    margin: 0 12px 12px !important;
    padding: 14px !important;
    min-height: 0 !important;
    background: #050505 !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 8px !important;
    overflow: hidden !important;
}

.about-founder .portrait-panel,
.about-founder .founder-copy {
    height: 438px !important;
    min-height: 0 !important;
}

.about-founder .portrait-panel {
    width: 100% !important;
    max-width: none !important;
    justify-self: stretch !important;
    border: 0 !important;
    border-radius: 4px 0 0 4px !important;
    background: #070707 !important;
    overflow: hidden !important;
}

.about-founder .portrait-panel .portrait-photo {
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: 50% 46% !important;
    transform: none !important;
    transform-origin: center center !important;
    filter: saturate(1.04) contrast(1.03) !important;
    image-rendering: auto !important;
}

.about-founder .portrait-panel .portrait-glow {
    background:
        linear-gradient(180deg, rgba(0, 0, 0, 0) 52%, rgba(0, 0, 0, 0.76) 100%),
        linear-gradient(90deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0) 48%) !important;
}

.about-founder .portrait-label {
    left: 18px !important;
    bottom: 18px !important;
    z-index: 5 !important;
}

.about-founder .portrait-label strong {
    font-size: clamp(22px, 2vw, 26px) !important;
    line-height: 0.95 !important;
    letter-spacing: 0 !important;
}

.about-founder .portrait-label span {
    margin-top: 8px !important;
    font-size: 11px !important;
    letter-spacing: 0 !important;
}

.about-founder .founder-copy {
    align-self: stretch !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
    border: 0 !important;
    border-radius: 0 4px 4px 0 !important;
    padding: 44px clamp(48px, 5.5vw, 88px) 28px 34px !important;
    background: #050505 !important;
}

.about-founder .founder-copy .section-kicker {
    display: none !important;
}

.about-founder .founder-copy h2 {
    margin: 0 0 30px !important;
    font-size: clamp(23px, 2vw, 27px) !important;
    line-height: 1 !important;
    letter-spacing: 0 !important;
    font-weight: 500 !important;
}

.about-founder .founder-copy p {
    max-width: 760px !important;
    margin: 0 0 20px !important;
    font-size: clamp(12px, 1vw, 14px) !important;
    line-height: 1.55 !important;
    letter-spacing: 0 !important;
    color: #f3f3f3 !important;
}

.about-founder .founder-mark {
    margin-top: 12px !important;
    color: #f5f1eb !important;
    font-size: 24px !important;
    line-height: 1 !important;
}

.about-founder .founder-cta {
    margin-top: auto !important;
    width: max-content !important;
    color: #cfc8bf !important;
    text-decoration: none !important;
    font-size: 13px !important;
    line-height: 1 !important;
    letter-spacing: 0 !important;
}

.about-founder .founder-cta span {
    margin-left: 4px !important;
}

@media (max-width: 1100px) {
    .about-founder {
        grid-template-columns: 1fr !important;
        margin: 0 10px 10px !important;
        padding: 10px !important;
    }

    .about-founder .portrait-panel,
    .about-founder .founder-copy {
        height: auto !important;
        min-height: 430px !important;
        max-width: none !important;
        justify-self: stretch !important;
        border-radius: 4px !important;
    }

    .about-founder .founder-copy {
        min-height: 0 !important;
        padding: 42px 26px 30px !important;
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
        padding: 38px 22px 28px !important;
    }
}
`;
document.head.appendChild(portraitScaleStyle);
