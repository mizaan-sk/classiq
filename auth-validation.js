const authForm = document.querySelector("#auth-form");
const authMessage = document.querySelector("#form-message");

if (authForm instanceof HTMLFormElement && authMessage instanceof HTMLParagraphElement) {
    const isSignup = authForm.dataset.formType === "signup";
    const emailField = authForm.querySelector('input[name="email"]');
    const nameField = authForm.querySelector('input[name="fullname"]');
    const passwordField = authForm.querySelector('input[name="password"]');

    if (emailField && passwordField && (!isSignup || nameField)) {
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
                ? "Your details are valid. Account creation is not connected yet."
                : "Your details are valid. Sign-in is not connected yet.";
            authMessage.setAttribute("class", "mt-3 text-center text-xs leading-relaxed text-[#385a0c]");
        });
    }
}
