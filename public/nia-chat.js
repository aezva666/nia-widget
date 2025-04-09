document.addEventListener('DOMContentLoaded', function () {
  const container = document.createElement('div');
  container.id = 'nia-container';

  container.innerHTML = `
    <div id="nia-welcome-bubble">¡Hola! Soy NIA, ¿en qué puedo ayudarte?</div>
    <button id="nia-toggle"></button>
    <div id="nia-chatbox">
      <div id="nia-header">
        <img src="https://aezva.com/wp-content/uploads/2025/04/web-200x200-1.webp" alt="NIA" />
        <h2>NIA Assistant</h2>
        <button id="nia-minimize">─</button>
      </div>
      <div id="nia-messages"></div>
      <div id="nia-input-area">
        <input type="text" id="nia-input" placeholder="Escribe tu mensaje..." />
        <button id="nia-send">Enviar</button>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  const chatbox = document.getElementById('nia-chatbox');
  const toggle = document.getElementById('nia-toggle');
  const minimize = document.getElementById('nia-minimize');
  const welcomeBubble = document.getElementById('nia-welcome-bubble');
  const sendButton = document.getElementById('nia-send');
  const inputField = document.getElementById('nia-input');
  const messagesContainer = document.getElementById('nia-messages');

  let hasUserInteracted = false;

  toggle.addEventListener('click', showChat);
  welcomeBubble.addEventListener('click', showChat);

  function showChat() {
    toggle.style.display = 'none';
    welcomeBubble.style.display = 'none';
    chatbox.style.display = 'flex';

    if (!hasUserInteracted) {
      addMessage("¡Hola! Soy NIA, ¿en qué puedo ayudarte?", "nia-message");
    }
  }

  minimize.addEventListener('click', () => {
    chatbox.style.display = 'none';
    toggle.style.display = 'block';

    if (!hasUserInteracted) {
      welcomeBubble.style.display = 'block';
    } else {
      welcomeBubble.style.display = 'none';
    }
  });

  sendButton.addEventListener('click', sendMessage);
  inputField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  function sendMessage() {
    const message = inputField.value.trim();
    if (message !== '') {
      addMessage(message, 'user-message');
      inputField.value = '';
      hasUserInteracted = true;

      // Simular respuesta de NIA
      setTimeout(() => {
        addMessage('Gracias por tu mensaje. Te ayudaré enseguida. 🤖', 'nia-message');
      }, 600);
    }
  }

  function addMessage(text, className) {
    const msg = document.createElement('div');
    msg.className = className;
    msg.textContent = text;
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Al cargar, mostrar burbujas flotantes
  toggle.style.display = 'block';
  welcomeBubble.style.display = 'block';
});
