document.addEventListener("DOMContentLoaded", () => {
  // Tab functionality
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) =>
        content.classList.remove("active")
      );

      // Add active class to clicked button
      button.classList.add("active");

      // Show corresponding content
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll(".faq-question");

  faqItems.forEach((item) => {
    item.addEventListener("click", () => {
      const answer = item.nextElementSibling;
      const icon = item.querySelector("i");

      // Toggle display of answer
      if (answer.style.display === "block") {
        answer.style.display = "none";
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
      } else {
        answer.style.display = "block";
        icon.classList.remove("fa-chevron-down");
        icon.classList.add("fa-chevron-up");
      }
    });
  });

  // Hide all FAQ answers initially
  document.querySelectorAll(".faq-answer").forEach((answer) => {
    answer.style.display = "none";
  });

  // Validación básica del formulario (si existe en la página)
  const inscripcionForm = document.getElementById("inscripcion-form");
  if (inscripcionForm) {
    inscripcionForm.addEventListener("submit", (e) => {
      const telefono = document.getElementById("telefono").value;
      const telefonoRegex = /^[0-9]{9,15}$/;

      if (!telefonoRegex.test(telefono)) {
        e.preventDefault();
        const formMessage = document.getElementById("form-message");
        formMessage.innerHTML =
          '<div class="form-message error">Por favor, introduce un número de teléfono válido.</div>';
        return false;
      }

      return true;
    });
  }
});
