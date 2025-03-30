document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        setTimeout(() => {
            formStatus.innerText = "Your message has been sent successfully!";
            contactForm.reset();
        }, 1000);
    });
});
