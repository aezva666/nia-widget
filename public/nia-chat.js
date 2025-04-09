document.addEventListener("DOMContentLoaded", function () {
  const niaWidget = document.createElement("div");
  niaWidget.id = "nia-widget-container";
  niaWidget.innerHTML = `
    <div id="nia-chat-button">
      <img src="https://aezva.com/wp-content/uploads/2025/04/web-200x200-1.webp" alt="NIA" />
      <div id="nia-floating-message">¡Hola! ¿En qué puedo ayudarte?</div>
    </div>
    <div id="nia-chat-box" class="nia-hidden">
      <div id="nia-chat-header">
        <img src="https://aezva.com/wp-content/uploads/2025/04/web-200x200-1.webp" alt="NIA" />
        <span>NIA Assistant</span>
        <button id="nia-minimize-button" title="Minimizar"></button>
      </div>
      <div id="nia-messages">
        <div class="nia-message nia-bot">
          ¡Hola! Soy NIA, tu asistente virtual. ¿En qué puedo ayudarte hoy?
        </div>
      </div>
      <div id="nia-input-area">
        <input type="text" id="nia-user-input" placeholder="Escribe tu mensaje aquí..." />
        <button id="nia-send-button">Enviar</button>
      </div>
    </div>
  `;
  document.body.appendChild(niaWidget);

  const chatButton = document.getElementById("nia-chat-button");
  const chatBox = document.getElementById("nia-chat-box");
  const minimizeButton = document.getElementById("nia-minimize-button");

  chatButton.addEventListener("click", () => {
    chatBox.classList.remove("nia-hidden");
    chatButton.style.display = "none";
  });

  minimizeButton.addEventListener("click", () => {
    chatBox.classList.add("nia-hidden");
    chatButton.style.display = "flex";
  });

  const sendButton = document.getElementById("nia-send-button");
  const userInput = document.getElementById("nia-user-input");
  const messages = document.getElementById("nia-messages");

  sendButton.addEventListener("click", () => {
    const text = userInput.value.trim();
    if (text !== "") {
      messages.innerHTML += `<div class="nia-message nia-user">${text}</div>`;
      userInput.value = "";
      // Aquí podrías integrar la lógica de respuesta real con NIA
    }
  });
});
