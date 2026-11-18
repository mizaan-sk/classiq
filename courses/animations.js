import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@12.23.12/+esm";

if (document.body.classList.contains("courses-page") &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let hasAnimated = false;

    inView(".course-list-section", (element) => {
        if (hasAnimated) return;
        hasAnimated = true;

        animate(element.querySelector(".course-list-title"), {
            opacity: [0, 1],
            y: [14, 0]
        }, {
            duration: 0.55,
            easing: [0.22, 1, 0.36, 1]
        });

        animate(Array.from(element.querySelectorAll(".course-placeholder")), {
            opacity: [0, 1],
            y: [28, 0],
            scale: [0.96, 1]
        }, {
            duration: 0.65,
            delay: stagger(0.14),
            easing: [0.22, 1, 0.36, 1]
        });
    }, { amount: 0.15 });
}
