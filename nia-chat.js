// nia-widget.js

(function() {
    // Obtener el script actual (el que contiene este código)
    const currentScript = document.currentScript;
  
    // Leer el client_id desde el atributo data-client-id
    const clientId = currentScript.getAttribute('data-client-id') || 'default';
  
    // Crear el contenedor del iframe
    const iframeContainer = document.createElement('div');
    iframeContainer.id = 'nia-chat-widget';
    iframeContainer.style.position = 'fixed';
    iframeContainer.style.bottom = '20px';
    iframeContainer.style.right = '20px';
    iframeContainer.style.width = '350px';
    iframeContainer.style.height = '500px';
    iframeContainer.style.zIndex = '9999';
    iframeContainer.style.border = 'none';
    iframeContainer.style.boxShadow = '0 0 20px rgba(0,0,0,0.2)';
    iframeContainer.style.borderRadius = '12px';
    iframeContainer.style.overflow = 'hidden';
  
    // Crear el iframe con la URL del backend de NIA
    const iframe = document.createElement('iframe');
    iframe.src = `https://nia-frontend-lilac.vercel.app?client_id=${clientId}`; // 👈 Cambia esto a tu URL real
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.setAttribute('allow', 'microphone'); // por si quieres voz
  
    // Insertar iframe dentro del contenedor
    iframeContainer.appendChild(iframe);
  
    // Insertar el contenedor al final del body
    document.body.appendChild(iframeContainer);
  })();
  