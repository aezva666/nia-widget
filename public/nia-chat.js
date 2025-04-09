// Crear contenedor principal
const niaContainer = document.createElement("div");
niaContainer.className = "nia-container";

// Botón minimizado con imagen de NIA
const minimizedButton = document.createElement("button");
minimizedButton.className = "nia-minimized";
minimizedButton.innerHTML = `
  <img src="https://aezva.com/wp-content/uploads/2025/04/web-200x200-1.webp" alt="NIA" />
`;

// Mensaje flotante de bienvenida
const welcomeBubble = document.createElement("div");
welcomeBubble.className = "nia-welcome-bubble";
welcomeBubble.innerText = "¡Hola! ¿Necesitas ayuda?";

// Evento: abrir chat al hacer clic en imagen o mensaje
function openChat() {
  minimizedButton.style.display = "none";
  welcomeBubble.style.display = "none";
  chatbox.style.display = "flex";
}
minimizedButton.onclick = openChat;
welcomeBubble.onclick = openChat;

// Caja de chat
const chatbox = document.createElement("div");
chatbox.className = "nia-chatbox";
chatbox.style.display = "none";

// Header con avatar y nombre
chatbox.innerHTML = `
  <div class="nia-header">
    <img src="https://aezva.com/wp-content/uploads/2025/04/web-200x200-1.webp" alt="NIA Avatar" />
    <span>NIA Assistant</span>
  </div>
  <div class="nia-messages" id="nia-messages"></div>
  <div class="nia-input-container">
    <input type="text" id="nia-input" class="nia-input" placeholder="Escribe un mensaje..." />
    <button class="nia-send-button" id="nia-send-button">Enviar</button>
  </div>
`;

// Agregar elementos al contenedor principal
niaContainer.appendChild(minimizedButton);
niaContainer.appendChild(welcomeBubble);
niaContainer.appendChild(chatbox);

// Agregar al body
document.body.appendChild(niaContainer);

// Funcionalidad de mensajes
const messagesContainer = chatbox.querySelector("#nia-messages");
const inputField = chatbox.querySelector("#nia-input");
const sendButton = chatbox.querySelector("#nia-send-button");

// Mostrar mensaje inicial
function showWelcomeMessage() {
  const welcome = document.createElement("div");
  welcome.className = "nia-message bot";
  welcome.innerText = "¡Hola! Soy NIA, ¿en qué puedo ayudarte hoy?";
  messagesContainer.appendChild(welcome);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Mostrar mensaje del usuario o de NIA
function appendMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `nia-message ${sender}`;
  message.innerText = text;
  messagesContainer.appendChild(message);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Enviar mensaje
function sendMessage() {
  const text = inputField.value.trim();
  if (text !== "") {
    appendMessage(text, "user");
    inputField.value = "";
    // Aquí iría la integración con GPT o lógica de respuesta real
    setTimeout(() => {
      appendMessage("Estoy procesando tu mensaje...", "bot");
    }, 500);
  }
}

// Eventos
sendButton.addEventListener("click", sendMessage);
inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// Mostrar bienvenida dentro del chat
showWelcomeMessage();
