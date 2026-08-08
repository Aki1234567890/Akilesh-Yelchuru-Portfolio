const portraitScaleStyle = document.createElement('style');
portraitScaleStyle.textContent = `
.about-founder .portrait-panel {
    background:
        radial-gradient(circle at 74% 52%, rgba(248, 176, 64, 0.55), rgba(0, 0, 0, 0) 34%),
        linear-gradient(135deg, #c96638 0%, #d87a3e 57%, #080808 100%) !important;
}

.about-founder .portrait-panel .portrait-photo {
    inset: -2% !important;
    width: 104% !important;
    height: 104% !important;
    object-fit: contain !important;
    object-position: 50% 48% !important;
    transform: scale(0.96) !important;
    transform-origin: center center !important;
}

@media (max-width: 768px) {
    .about-founder .portrait-panel .portrait-photo {
        inset: -1% !important;
        width: 102% !important;
        height: 102% !important;
        transform: scale(0.97) !important;
    }
}
`;
document.head.appendChild(portraitScaleStyle);
