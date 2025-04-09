document.addEventListener("DOMContentLoaded", function () {
  const container = document.createElement("div");
  container.id = "nia-container";
  container.innerHTML = `
    <div id="nia-bubble-container">
      <div id="nia-floating-message">¡Hola! Soy NIA, ¿te puedo ayudar?</div>
      <div id="nia-bubble"></div>
    </div>
    <div id="nia-chat-box">
      <div id="nia-chat-header">
        <img src="https://aezva.com/wp-content/uploads/2025/04/web-200x200-1.webp" alt="NIA Avatar">
        <span>NIA Assistant</span>
        <button id="nia-minimize-button">–</button>
      </div>
      <div id="nia-messages"></div>
      <div id="nia-input-container">
        <input type="text" id="nia-input" placeholder="Escribe tu mensaje...">
        <button id="nia-send-button">Enviar</button>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  const bubble = document.getElementById("nia-bubble");
  const floatingMsg = document.getElementById("nia-floating-message");
  const chatBox = document.getElementById("nia-chat-box");
  const minimizeBtn = document.getElementById("nia-minimize-button");
  const sendBtn = document.getElementById("nia-send-button");
  const input = document.getElementById("nia-input");
  const messages = document.getElementById("nia-messages");

  function toggleChat(open = true) {
    chatBox.style.display = open ? "flex" : "none";
    bubble.parentElement.style.display = open ? "none" : "flex";
  }

  bubble.addEventListener("click", () => toggleChat(true));
  floatingMsg.addEventListener("click", () => toggleChat(true));
  minimizeBtn.addEventListener("click", () => toggleChat(false));

  function sendMessage() {
    const text = input.value.trim();
    if (text === "") return;

    const userMsg = document.createElement("div");
    userMsg.className = "user-message";
    userMsg.innerText = text;
    messages.appendChild(userMsg);

    const botMsg = document.createElement("div");
    botMsg.className = "nia-message";
    botMsg.innerText = "Gracias por tu mensaje. Estoy aquí para ayudarte.";
    messages.appendChild(botMsg);

    input.value = "";
    messages.scrollTop = messages.scrollHeight;
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
  });
});
