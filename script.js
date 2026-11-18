import Lenis from "https://cdn.jsdelivr.net/npm/lenis@1.3.8/+esm";
import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@12.23.12/+esm";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion) {
    new Lenis({ autoRaf: true, lerp: 0.1 });
}

if (!reducedMotion) {
    animate(".brand, .nav-button", { opacity: [0, 1], y: [-8, 0] }, {
        duration: 0.55,
        delay: stagger(0.06),
        easing: [0.22, 1, 0.36, 1]
    });

    if (document.querySelector(".auth-card")) {
        animate(".auth-card", { opacity: [0, 1], y: [16, 0] }, {
            duration: 0.7,
            delay: 0.12,
            easing: [0.22, 1, 0.36, 1]
        });
    }

    if (document.querySelector(".hero-copy")) {
        animate(".hero-copy", { opacity: [0, 1], y: [18, 0] }, {
            duration: 0.75,
            delay: 0.08,
            easing: [0.22, 1, 0.36, 1]
        });
        animate(".hero-illustration", { y: [14, 0] }, {
            duration: 0.9,
            delay: 0.2,
            easing: [0.22, 1, 0.36, 1]
        });
    }

    inView(".trusted, .solution-section, .site-footer", (element) => {
        animate(element, { opacity: [0, 1], y: [22, 0] }, {
            duration: 0.65,
            easing: [0.22, 1, 0.36, 1]
        });
    }, { amount: 0.15 });

    inView(".solution-copy li, .footer-top > div", (element) => {
        animate(element, { opacity: [0, 1], y: [18, 0] }, {
            duration: 0.55,
            easing: [0.22, 1, 0.36, 1]
        });
    }, { amount: 0.2 });
}