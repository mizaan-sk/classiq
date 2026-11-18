import Lenis from "https://cdn.jsdelivr.net/npm/lenis@1.3.8/+esm";
import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@12.23.12/+esm";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const authForm = document.querySelector("#auth-form");
const authMessage = document.querySelector("#form-message");
const newsletterForm = document.querySelector("#newsletter-form");
const newsletterMessage = document.querySelector("#newsletter-message");

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

        inView(".trusted, .courses-section, .solution-section, .site-footer", (element) => {
            animate(element, { opacity: [0, 1], y: [22, 0] }, {
                duration: 0.65,
                easing: [0.22, 1, 0.36, 1]
            });
        });

        inView(".course-card", (element) => {
            animate(element, { opacity: [0, 1], y: [18, 0] }, {
                duration: 0.55,
                easing: [0.22, 1, 0.36, 1]
            });
        });
    }
}

if (authForm && authMessage) {
    const isSignup = authForm.dataset.formType === "signup";
    const emailField = authForm.elements.namedItem("email");
    const nameField = authForm.elements.namedItem("fullname");
    const passwordField = authForm.elements.namedItem("password");

    authForm.addEventListener("input", (event) => {
        if (event.target instanceof HTMLInputElement) {
            event.target.setCustomValidity("");
        }
        authMessage.classList.add("hidden");
    });

    authForm.addEventListener("submit", (event) => {
        event.preventDefault();
        authMessage.classList.remove("hidden");

        emailField.setCustomValidity("");
        if (emailField.value !== emailField.value.trim()) {
            emailField.setCustomValidity("Email cannot start or end with spaces.");
        }

        if (nameField) {
            nameField.setCustomValidity("");
            if (nameField.value.trim().length === 0) {
                nameField.setCustomValidity("Please enter your full name.");
            } else if (nameField.value.trim().length < 2) {
                nameField.setCustomValidity("Your full name must be at least 2 characters.");
            }
        }

        passwordField.setCustomValidity("");
        if (/\s/.test(passwordField.value)) {
            passwordField.setCustomValidity("Password cannot contain spaces.");
        } else if (passwordField.value.length > 0 && passwordField.value.length < 8) {
            passwordField.setCustomValidity("Password must be at least 8 characters.");
        }

        if (!authForm.reportValidity()) {
            authMessage.textContent = "Please fix the highlighted fields and try again.";
            authMessage.setAttribute("class", "mt-3 text-center text-xs leading-relaxed text-red-700");
            return;
        }

        authMessage.textContent = isSignup
            ? "Your details are ready. Connect this form to your signup service to create your account."
            : "Your details are ready. Connect this form to your authentication service to sign in.";
        authMessage.setAttribute("class", "mt-3 text-center text-xs leading-relaxed text-[#385a0c]");
    });
}

if (newsletterForm && newsletterMessage) {
    newsletterForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!newsletterForm.reportValidity()) {
            newsletterMessage.textContent = "Please enter a valid email address.";
            newsletterMessage.style.color = "#b42318";
            return;
        }

        newsletterMessage.textContent = "Your email is ready to connect to the newsletter service.";
        newsletterMessage.style.color = "#507a1b";
    });
}