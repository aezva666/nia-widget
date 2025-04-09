document.addEventListener("DOMContentLoaded", function () {
  const niaContainer = document.createElement("div");
  niaContainer.id = "nia-container";

  // Elemento de la burbuja de bienvenida
  const niaWelcomeBubble = document.createElement("div");
  niaWelcomeBubble.id = "nia-welcome-bubble";
  niaWelcomeBubble.innerText = "¡Hola! ¿En qué puedo ayudarte hoy?";

  // Botón flotante con imagen de NIA
  const niaBubble = document.createElement("div");
  niaBubble.id = "nia-bubble";
  const niaImg = document.createElement("img");
  niaImg.src = "https://aezva.com/wp-content/uploads/2025/04/web-200x200-1.webp";
  niaImg.alt = "NIA";
  niaBubble.appendChild(niaImg);

  // Contenedor principal del chat
  const niaChatContainer = document.createElement("div");
  niaChatContainer.id = "nia-chat-container";

  // Cabecera
  const niaHeader = document.createElement("div");
  niaHeader.id = "nia-header";
  const avatar = document.createElement("img");
  avatar.src = "https://aezva.com/wp-content/uploads/2025/04/web-200x200-1.webp";
  avatar.alt = "NIA";
  avatar.className = "nia-avatar";
  const title = document.createElement("span");
  title.innerText = "NIA Assistant";
  const minimizeBtn = document.createElement("div");
  minimizeBtn.id = "nia-minimize";
  minimizeBtn.innerText = "━";
  niaHeader.appendChild(avatar);
  niaHeader.appendChild(title);
  niaHeader.appendChild(minimizeBtn);

  // Cuerpo del chat
  const niaMessages = document.createElement("div");
  niaMessages.id = "nia-messages";

  // Mensaje de bienvenida dentro del chat
  const welcomeMessage = document.createElement("div");
  welcomeMessage.className = "nia-message nia-bot";
  welcomeMessage.innerText = "¡Hola! ¿En qué puedo ayudarte hoy?";
  niaMessages.appendChild(welcomeMessage);

  // Campo de entrada
  const niaInputContainer = document.createElement("div");
  niaInputContainer.id = "nia-input-container";
  const niaInput = document.createElement("input");
  niaInput.type = "text";
  niaInput.placeholder = "Escribe tu mensaje...";
  const niaSend = document.createElement("button");
  niaSend.id = "nia-send";
  niaSend.innerText = "Enviar";
  niaInputContainer.appendChild(niaInput);
  niaInputContainer.appendChild(niaSend);

  // Armar contenedor del chat
  niaChatContainer.appendChild(niaHeader);
  niaChatContainer.appendChild(niaMessages);
  niaChatContainer.appendChild(niaInputContainer);

  // Agregar todos al contenedor principal
  niaContainer.appendChild(niaBubble);
  niaContainer.appendChild(niaWelcomeBubble);
  niaContainer.appendChild(niaChatContainer);
  document.body.appendChild(niaContainer);

  let userHasInteracted = false;

  // Mostrar chat
  function openChat() {
    niaChatContainer.style.display = "flex";
    niaBubble.style.display = "none";
    niaWelcomeBubble.style.display = "none";
  }

  // Ocultar chat
  function closeChat() {
    niaChatContainer.style.display = "none";
    niaBubble.style.display = "block";
    if (!userHasInteracted) {
      niaWelcomeBubble.style.display = "block";
    } else {
      niaWelcomeBubble.style.display = "none";
    }
  }

  // Evento abrir chat
  niaBubble.addEventListener("click", openChat);
  niaWelcomeBubble.addEventListener("click", openChat);
  minimizeBtn.addEventListener("click", closeChat);

  // Evento enviar mensaje
  niaSend.addEventListener("click", () => {
    const message = niaInput.value.trim();
    if (message !== "") {
      userHasInteracted = true;
      const userMessage = document.createElement("div");
      userMessage.className = "nia-message nia-user";
      userMessage.innerText = message;
      niaMessages.appendChild(userMessage);
      niaInput.value = "";
      niaWelcomeBubble.style.display = "none";

      // Auto scroll
      niaMessages.scrollTop = niaMessages.scrollHeight;

      // Simulación de respuesta
      setTimeout(() => {
        const botMessage = document.createElement("div");
        botMessage.className = "nia-message nia-bot";
        botMessage.innerText = "Estoy aquí para ayudarte 😊";
        niaMessages.appendChild(botMessage);
        niaMessages.scrollTop = niaMessages.scrollHeight;
      }, 500);
    }
  });
});
