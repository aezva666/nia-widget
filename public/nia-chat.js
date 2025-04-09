document.addEventListener("DOMContentLoaded", () => {
  const chatContainer = document.getElementById("nia-chat-container");
  const toggleBtn = document.getElementById("nia-toggle-btn");
  const chatBox = document.getElementById("nia-chat-box");
  const minimizeBtn = document.getElementById("nia-minimize");
  const welcomeBubble = document.getElementById("nia-welcome-bubble");
  const input = document.getElementById("nia-input");
  const sendBtn = document.getElementById("nia-send");
  const messagesContainer = document.getElementById("nia-messages");

  let hasInteracted = false;
  let welcomeMessageSent = false;

  // Mostrar bienvenida al iniciar
  welcomeBubble.style.display = "block";

  function showChat() {
    chatBox.style.display = "flex";
    welcomeBubble.style.display = "none";

    if (!welcomeMessageSent) {
      appendMessage("¡Hola! Soy NIA, tu asistente inteligente. ¿En qué puedo ayudarte hoy?", "nia-msg");
      welcomeMessageSent = true;
    }
  }

  function minimizeChat() {
    chatBox.style.display = "none";

    if (!hasInteracted) {
      welcomeBubble.style.display = "block";
    }
  }

  function appendMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = type;
    msg.textContent = text;
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  toggleBtn.addEventListener("click", showChat);
  welcomeBubble.addEventListener("click", showChat);
  minimizeBtn.addEventListener("click", minimizeChat);

  sendBtn.addEventListener("click", () => {
    const userMsg = input.value.trim();
    if (userMsg) {
      appendMessage(userMsg, "user-msg");
      input.value = "";
      hasInteracted = true;

      setTimeout(() => {
        appendMessage("Estoy aquí para ayudarte 😊", "nia-msg");
      }, 500);
    }
  });
});
