document.addEventListener("DOMContentLoaded", function () {
  const niaContainer = document.createElement("div");
  niaContainer.id = "nia-container";
  niaContainer.innerHTML = `
    <div id="nia-bubble-container">
      <div id="nia-welcome-bubble">¡Hola! ¿En qué puedo ayudarte hoy?</div>
      <img src="https://aezva.com/wp-content/uploads/2025/04/web-200x200-1.webp" id="nia-icon" alt="NIA" />
    </div>
    <div id="nia-chatbox">
      <div id="nia-chat-header">
        <div style="display: flex; align-items: center;">
          <img src="https://aezva.com/wp-content/uploads/2025/04/web-200x200-1.webp" alt="NIA">
          <strong>NIA Assistant</strong>
        </div>
        <button id="nia-minimize-btn">—</button>
      </div>
      <div id="nia-chat-messages"></div>
      <div id="nia-user-input">
        <input type="text" id="nia-input-field" placeholder="Escribe tu mensaje..." />
        <button id="nia-send-btn">Enviar</button>
      </div>
    </div>
  `;
  document.body.appendChild(niaContainer);

  const niaIcon = document.getElementById("nia-icon");
  const welcomeBubble = document.getElementById("nia-welcome-bubble");
  const chatbox = document.getElementById("nia-chatbox");
  const sendBtn = document.getElementById("nia-send-btn");
  const inputField = document.getElementById("nia-input-field");
  const messages = document.getElementById("nia-chat-messages");
  const minimizeBtn = document.getElementById("nia-minimize-btn");

  let chatOpened = false;
  let messageSent = false;

  function openChat() {
    chatbox.style.display = "flex";
    document.getElementById("nia-bubble-container").style.display = "none";
    if (!chatOpened) {
      appendMessage("¡Hola! ¿En qué puedo ayudarte hoy?", false);
      chatOpened = true;
    }
  }

  function minimizeChat() {
    chatbox.style.display = "none";
    document.getElementById("nia-bubble-container").style.display = "flex";
    if (!messageSent) {
      welcomeBubble.style.display = "inline-block";
    } else {
      welcomeBubble.style.display = "none";
    }
  }

  function appendMessage(text, isUser) {
    const msg = document.createElement("div");
    msg.className = isUser ? "user-message" : "nia-message";
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  niaIcon.addEventListener("click", openChat);
  welcomeBubble.addEventListener("click", openChat);
  minimizeBtn.addEventListener("click", minimizeChat);

  sendBtn.addEventListener("click", function () {
    const text = inputField.value.trim();
    if (text) {
      appendMessage(text, true);
      inputField.value = "";
      setTimeout(() => {
        appendMessage("Gracias por tu mensaje. Estoy procesándolo...", false);
      }, 500);
      messageSent = true;
      welcomeBubble.style.display = "none";
    }
  });

  inputField.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      sendBtn.click();
    }
  });
});
