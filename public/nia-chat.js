document.addEventListener("DOMContentLoaded", function () {
  const niaContainer = document.createElement("div");
  niaContainer.id = "nia-chat-container";
  document.body.appendChild(niaContainer);

  const niaFloating = document.createElement("div");
  niaFloating.id = "nia-floating-container";

  const niaWelcome = document.createElement("div");
  niaWelcome.id = "nia-welcome-bubble";
  niaWelcome.innerText = "Hola 👋 ¿En qué puedo ayudarte?";
  niaFloating.appendChild(niaWelcome);

  const niaIcon = document.createElement("img");
  niaIcon.id = "nia-icon";
  niaIcon.src = "https://aezva.com/wp-content/uploads/2025/04/nia-chat-1.webp";
  niaFloating.appendChild(niaIcon);

  const chatBox = document.createElement("div");
  chatBox.id = "nia-chatbox";
  chatBox.innerHTML = `
    <div id="nia-header">
      <img src="https://aezva.com/wp-content/uploads/2025/04/nia-chat-1.webp" />
      <span>NIA Assistant</span>
      <div id="nia-minimize-btn"></div>
    </div>
    <div id="nia-messages"></div>
    <div id="nia-input-container">
      <input type="text" id="nia-input" placeholder="Escribe tu mensaje..." />
      <button id="nia-send-btn">Enviar</button>
    </div>
  `;

  niaContainer.appendChild(niaFloating);
  niaContainer.appendChild(chatBox);

  const niaInput = chatBox.querySelector("#nia-input");
  const niaSendBtn = chatBox.querySelector("#nia-send-btn");
  const niaMessages = chatBox.querySelector("#nia-messages");
  const niaMinimizeBtn = chatBox.querySelector("#nia-minimize-btn");

  let chatOpened = false;
  let welcomeMessageShown = false;

  function addMessage(message, sender) {
    const msg = document.createElement("div");
    msg.className = sender === "user" ? "user-message" : "nia-message";
    msg.innerText = message;
    niaMessages.appendChild(msg);
    niaMessages.scrollTop = niaMessages.scrollHeight;
  }

  function openChat() {
    chatBox.style.display = "flex";
    niaWelcome.style.display = "none";
    chatOpened = true;

    if (!welcomeMessageShown) {
      addMessage("Hola 👋 ¿En qué puedo ayudarte?", "nia");
      welcomeMessageShown = true;
    }
  }

  function closeChat() {
    chatBox.style.display = "none";

    if (!niaInput.value.trim()) {
      niaWelcome.style.display = "inline-block";
    }
  }

  niaIcon.addEventListener("click", () => {
    if (!chatOpened || chatBox.style.display === "none") {
      openChat();
    }
  });

  niaWelcome.addEventListener("click", openChat);

  niaMinimizeBtn.addEventListener("click", closeChat);

  niaSendBtn.addEventListener("click", () => {
    const userInput = niaInput.value.trim();
    if (userInput) {
      addMessage(userInput, "user");
      niaInput.value = "";
      // Simulación de respuesta de NIA
      setTimeout(() => {
        addMessage("Gracias por tu mensaje. Pronto te responderé.", "nia");
      }, 600);
    }
  });

  niaInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      niaSendBtn.click();
    }
  });
});
