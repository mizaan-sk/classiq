const authForm = document.querySelector("#auth-form");
const authMessage = document.querySelector("#form-message");
const emailPattern = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;

if (authForm instanceof HTMLFormElement && authMessage instanceof HTMLParagraphElement) {
    const isSignup = authForm.dataset.formType === "signup";
    const fields = Array.from(authForm.querySelectorAll("input"));

    const getError = (field) => {
        if (field.name === "email") {
            if (!field.value) {
                return "Please enter your email address.";
            }
            if (!emailPattern.test(field.value)) {
                return "Enter a valid email address, such as name@example.com.";
            }
        }

        if (field.name === "fullname") {
            const name = field.value.trim();
            if (!name) {
                return "Please enter your full name.";
            }
            if (name.length < 2) {
                return "Your full name must be at least 2 characters.";
            }
        }

        if (field.name === "password") {
            if (!field.value) {
                return "Please enter your password.";
            }
            if (/\s/.test(field.value)) {
                return "Password cannot contain spaces.";
            }
            if (field.value.length < 8) {
                return "Password must be at least 8 characters.";
            }
        }

        return "";
    };

    const showFieldError = (field, message) => {
        const errorElement = document.getElementById(`${field.id}-error`);
        field.setAttribute("aria-invalid", message ? "true" : "false");
        field.classList.toggle("has-error", Boolean(message));
        if (errorElement) {
            errorElement.textContent = message;
        }
    };

    fields.forEach((field) => field.setAttribute("aria-invalid", "false"));

    authForm.addEventListener("input", (event) => {
        if (!(event.target instanceof HTMLInputElement)) {
            return;
        }

        if (event.target.getAttribute("aria-invalid") === "true") {
            showFieldError(event.target, getError(event.target));
        }
        authMessage.classList.add("hidden");
        authMessage.textContent = "";
    });

    authForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const activeFields = fields.filter((field) => isSignup || field.name !== "fullname");
        const firstInvalidField = activeFields.find((field) => getError(field));

        activeFields.forEach((field) => showFieldError(field, getError(field)));

        if (firstInvalidField) {
            authMessage.textContent = "Please correct the highlighted fields and try again.";
            authMessage.className = "mt-3 text-center text-xs leading-relaxed text-red-700";
            firstInvalidField.focus();
            return;
        }

        authMessage.textContent = "Thanks! Your details have been checked.";
        authMessage.className = "mt-3 text-center text-xs leading-relaxed text-[#385a0c]";
    });
}
