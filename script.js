<script>
document.addEventListener("DOMContentLoaded", () => {
  // ———– Tabs y FAQ (tu código igual) ———–
  // …  

  // ———– FORM INSCRIPCIÓN ———–
  const form = document.getElementById("inscripcion-form");
  if (!form) return;

  // 1) Generar un ID único por envío (opcional, para idempotencia)
  const submissionId = crypto.randomUUID?.() ||
        (Date.now().toString(36) + Math.random().toString(36).slice(2));
  const hid = document.createElement("input");
  hid.type  = "hidden";
  hid.name  = "submissionId";
  hid.value = submissionId;
  form.appendChild(hid);

  const btn = form.querySelector(".form-submit");
  const msg = document.getElementById("form-message");
  const telRegex = /^[0-9]{9,15}$/;

  form.addEventListener("submit", async e => {
    e.preventDefault();

    // 2) Validación básica
    const telefono = form.telefono.value.trim();
    if (!telRegex.test(telefono)) {
      msg.innerHTML =
        '<div class="form-message error">Número de teléfono inválido.</div>';
      return;
    }

    // 3) Bloquear botón y feedback
    btn.disabled    = true;
    btn.textContent = "Enviando…";
    msg.innerHTML   = "";

    // 4) Serializar y enviar
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch(form.action, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data)
      });

      if (res.ok) {
        msg.innerHTML = 
          '<div class="form-message success">¡Envío exitoso!</div>';
        form.reset();
      } else {
        const { error } = await res.json().catch(() => ({}));
        msg.innerHTML = 
          `<div class="form-message error">${ error || "Ocurrió un error." }</div>`;
      }
    } catch (err) {
      msg.innerHTML =
        '<div class="form-message error">Error de red. Intenta de nuevo.</div>';
    } finally {
      btn.disabled    = false;
      btn.textContent = "Enviar inscripción";
    }
  });
});
</script>
