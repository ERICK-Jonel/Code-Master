// frontend.js
document.addEventListener("DOMContentLoaded", () => {
  // ——— Tabs
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(button.dataset.tab).classList.add("active");
    });
  });

  // ——— FAQ accordion
  document.querySelectorAll(".faq-question").forEach((item) => {
    item.addEventListener("click", () => {
      const ans = item.nextElementSibling;
      const icon = item.querySelector("i");
      if (ans.style.display === "block") {
        ans.style.display = "none";
        icon.classList.replace("fa-chevron-up", "fa-chevron-down");
      } else {
        ans.style.display = "block";
        icon.classList.replace("fa-chevron-down", "fa-chevron-up");
      }
    });
  });
  document.querySelectorAll(".faq-answer").forEach((a) => (a.style.display = "none"));

  // ——— Formulario de inscripción
  const form = document.getElementById("inscripcion-form");
  if (!form) return;

  // Generar un ID único para idempotencia
  const submissionId =
    crypto.randomUUID?.() ||
    (Date.now().toString(36) + Math.random().toString(36).slice(2));
  const hid = document.createElement("input");
  hid.type = "hidden";
  hid.name = "submissionId";
  hid.value = submissionId;
  form.appendChild(hid);

  const btn = form.querySelector(".form-submit");
  const msgEl = document.getElementById("form-message");
  const telRe = /^[0-9]{9,15}$/;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validación teléfono
    const tel = form.telefono.value.trim();
    if (!telRe.test(tel)) {
      msgEl.innerHTML =
        '<div class="form-message error">Número de teléfono inválido.</div>';
      return;
    }

    // Bloquear botón
    btn.disabled = true;
    btn.textContent = "Enviando…";
    msgEl.innerHTML = "";

    // Enviar datos
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        msgEl.innerHTML =
          '<div class="form-message success">¡Envío exitoso!</div>';
        form.reset();
      } else {
        const { error } = await res.json().catch(() => ({}));
        msgEl.innerHTML = `<div class="form-message error">${
          error || "Ocurrió un error."
        }</div>`;
      }
    } catch {
      msgEl.innerHTML =
        '<div class="form-message error">Error de red. Intenta de nuevo.</div>';
    } finally {
      // Reactivar botón
      btn.disabled = false;
      btn.textContent = "Enviar inscripción";
    }
  });
});
