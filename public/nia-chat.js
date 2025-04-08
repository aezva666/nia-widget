// Inserta el CSS desde Vercel
const cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "https://nia-frontend-lilac.vercel.app/nia-style.css";
document.head.appendChild(cssLink);

// Crea el contenedor del chat
const niaContainer = document.createElement("div");
niaContainer.className = "nia-chat-container";
niaContainer.innerHTML = `
  <div class="nia-chat-header">
    <span>NIA Assistant</span>
  </div>
  <div class="nia-chat-messages" id="niaMessages"></div>
  <div class="nia-chat-input">
    <input type="text" id="niaInput" placeholder="Escribe tu mensaje..." />
    <button onclick="sendNiaMessage()">Enviar</button>
    <button id="microphoneButton" onclick="startVoiceRecognition()">
      <i class="fa fa-microphone"></i>
    </button>
  </div>
`;

document.body.appendChild(niaContainer);

// Función para agregar mensajes
function addMessage(message, sender) {
  const messages = document.getElementById("niaMessages");
  const msg = document.createElement("div");
  msg.className = `nia-message ${sender}`;
  msg.textContent = message;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

// Enviar mensaje al backend
async function sendNiaMessage() {
  const input = document.getElementById("niaInput");
  const message = input.value.trim();
  if (message === "") return;

  addMessage(message, "user");
  input.value = "";

  try {
    const response = await fetch("http://127.0.0.1:8000/nia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    addMessage(data.response, "nia");

    // Si tiene audio, lo reproduce
    if (data.audio_url) {
      const audio = new Audio(data.audio_url);
      audio.play();
    }
  } catch (error) {
    console.error("Connection error:", error);
    addMessage("Hubo un error al conectar con NIA.", "nia");
  }
}

// Escuchar tecla Enter para enviar mensaje
document.getElementById("niaInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendNiaMessage();
  }
});

// Función para reconocimiento de voz
function startVoiceRecognition() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "es-ES";

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById("niaInput").value = transcript;
    sendNiaMessage();
  };

  recognition.start();
}
