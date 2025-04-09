const niaContainer = document.createElement("div");
niaContainer.id = "nia-container";

const niaChatBox = document.createElement("div");
niaChatBox.id = "nia-chat-box";
niaChatBox.innerHTML = `
  <div id="nia-header">
    <img src="https://aezva.com/wp-content/uploads/2025/04/nia-chat-1.webp" alt="NIA">
    <span>NIA Assistant</span>
  </div>
  <div id="nia-messages"></div>
  <div id="nia-input-area">
    <input type="text" id="nia-input" placeholder="Escribe un mensaje..." />
    <button id="nia-send">Enviar</button>
  </div>
`;

const niaBubbleButton = document.createElement("div");
niaBubbleButton.id = "nia-bubble-button";

niaContainer.appendChild(niaChatBox);
niaContainer.appendChild(niaBubbleButton);
document.body.appendChild(niaContainer);

// Mostrar mensaje de bienvenida
function showWelcomeMessage() {
  const messages = document.getElementById("nia-messages");
  const welcome = document.createElement("div");
  welcome.className = "nia-message";
  welcome.innerText = "¡Hola! Soy NIA, tu asistente. ¿En qué puedo ayudarte hoy?";
  messages.appendChild(welcome);
}

// Toggle visibilidad
let isChatOpen = false;
niaBubbleButton.addEventListener("click", () => {
  isChatOpen = !isChatOpen;
  niaChatBox.style.display = isChatOpen ? "flex" : "none";
  if (isChatOpen) {
    showWelcomeMessage();
  }
});

// Enviar mensaje
document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("nia-send");
  const input = document.getElementById("nia-input");
  const messages = document.getElementById("nia-messages");

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.innerText = text;
    messages.appendChild(userMessage);

    input.value = "";

    fetch("https://nia-backend.vercel.app/nia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: text }),
    })
      .then((res) => res.json())
      .then((data) => {
        const niaMessage = document.createElement("div");
        niaMessage.className = "nia-message";
        niaMessage.innerText = data.response;
        messages.appendChild(niaMessage);
        messages.scrollTop = messages.scrollHeight;
      });
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});
