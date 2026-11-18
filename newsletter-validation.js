const newsletterForm = document.querySelector("#newsletter-form");
const newsletterEmail = document.querySelector("#newsletter-email");
const newsletterEmailError = document.querySelector("#newsletter-email-error");
const newsletterMessage = document.querySelector("#newsletter-message");
const emailPattern = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;

if (newsletterForm instanceof HTMLFormElement
    && newsletterEmail instanceof HTMLInputElement
    && newsletterEmailError instanceof HTMLParagraphElement
    && newsletterMessage instanceof HTMLParagraphElement) {
    const validateEmail = () => {
        const message = !newsletterEmail.value
            ? "Please enter your email address."
            : !emailPattern.test(newsletterEmail.value)
                ? "Enter a valid email address, such as name@example.com."
                : "";
        newsletterEmail.setAttribute("aria-invalid", message ? "true" : "false");
        newsletterEmail.classList.toggle("has-error", Boolean(message));
        newsletterEmailError.textContent = message;
        return !message;
    };

    newsletterEmail.setAttribute("aria-describedby", "newsletter-email-error");
    newsletterEmail.setAttribute("aria-invalid", "false");
    newsletterEmail.addEventListener("input", () => {
        if (newsletterEmail.getAttribute("aria-invalid") === "true") {
            validateEmail();
        }
        newsletterMessage.textContent = "";
    });

    newsletterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!validateEmail()) {
            newsletterEmail.focus();
            return;
        }

        newsletterMessage.textContent = "Thanks for your interest in ClassIQ updates!";
        newsletterMessage.className = "mt-2 text-xs text-[#385a0c]";
    });
}
