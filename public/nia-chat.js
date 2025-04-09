(function () {
  const niaContainer = document.createElement('div');
  niaContainer.id = 'nia-container';

  const niaBubble = document.createElement('div');
  niaBubble.id = 'nia-bubble';
  niaBubble.innerHTML = `<img src="https://aezva.com/wp-content/uploads/2025/04/nia-chat-1.webp" alt="NIA">`;

  niaContainer.innerHTML = `
    <div id="nia-header">
      <img src="https://aezva.com/wp-content/uploads/2025/04/nia-chat-1.webp" alt="NIA">
      <span>NIA Assistant</span>
      <button id="nia-minimize-button">–</button>
    </div>
    <div id="nia-messages"></div>
    <div id="nia-input-container">
      <input type="text" id="nia-input" placeholder="Escribe un mensaje..." />
      <button id="nia-send-button">Enviar</button>
    </div>
  `;

  document.body.appendChild(niaContainer);
  document.body.appendChild(niaBubble);

  const messagesContainer = document.getElementById('nia-messages');
  const inputField = document.getElementById('nia-input');
  const sendButton = document.getElementById('nia-send-button');
  const minimizeButton = document.getElementById('nia-minimize-button');

  function addMessage(message, isUser = false) {
    const messageElement = document.createElement('div');
    messageElement.className = isUser ? 'user-message' : 'nia-message';

    if (!isUser) {
      const avatar = document.createElement('img');
      avatar.src = 'https://aezva.com/wp-content/uploads/2025/04/nia-chat-1.webp';
      avatar.className = 'nia-avatar';
      messageElement.appendChild(avatar);
    }

    const textNode = document.createElement('span');
    textNode.textContent = message;

    messageElement.appendChild(textNode);
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function sendMessage() {
    const message = inputField.value.trim();
    if (!message) return;

    addMessage(message, true);
    inputField.value = '';

    fetch('https://nia-backend.aezva.com/nia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.response) {
          addMessage(data.response);
        }
      })
      .catch((err) => {
        console.error('Error al enviar el mensaje a NIA:', err);
        addMessage('Ups, algo salió mal 😓');
      });
  }

  sendButton.addEventListener('click', sendMessage);
  inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // Mensaje de bienvenida
  window.addEventListener('load', () => {
    addMessage('¡Hola! Soy NIA, tu asistente. ¿En qué puedo ayudarte hoy? 🤖');
  });

  // Minimizar y expandir
  minimizeButton.addEventListener('click', () => {
    niaContainer.style.display = 'none';
    niaBubble.style.display = 'flex';
  });

  niaBubble.addEventListener('click', () => {
    niaContainer.style.display = 'flex';
    niaBubble.style.display = 'none';
  });
})();
