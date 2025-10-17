document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('chatbot-toggle');
    const closeBtn = document.getElementById('chatbot-close');
    const chatbotBox = document.getElementById('chatbot-box');
    const sendBtn = document.getElementById('send-btn');
    const input = document.getElementById('user-input');
    const messages = document.getElementById('chatbot-messages');

    // Mostrar u ocultar el chatbot
    toggleBtn.addEventListener('click', () => {
        chatbotBox.classList.toggle('active');
        chatbotBox.classList.toggle('hidden');
        if (chatbotBox.classList.contains('active')) {
            sendMessage("hola"); // saludo inicial
        }
    });

    closeBtn.addEventListener('click', () => {
        chatbotBox.classList.add('hidden');
        chatbotBox.classList.remove('active');
    });

    // Enviar mensaje
    sendBtn.addEventListener('click', () => sendMessage());
    input.addEventListener('keypress', e => {
        if (e.key === 'Enter') sendMessage();
    });

    // --- FUNCIÓN PRINCIPAL PARA ENVIAR ---
    function sendMessage(text = null) {
        const message = text || input.value.trim();
        if (!message) return;
        appendMessage('user', message);
        input.value = '';

        fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        })
        .then(res => res.json())
        .then(data => {
            appendMessage('bot', data.response, data.options || []);
        })
        .catch(() => appendMessage('bot', '❌ Error al conectar con el servidor.'));
    }

    // --- FUNCIÓN PARA AGREGAR MENSAJES Y BOTONES ---
    function appendMessage(sender, text, options = []) {
        const msg = document.createElement('div');
        msg.classList.add('message', sender);
        msg.innerHTML = `<strong>${sender === 'user' ? 'Tú' : 'Bot'}:</strong> ${text}`;
        messages.appendChild(msg);

        // Si hay opciones (botones)
        if (options.length > 0) {
            const optionsDiv = document.createElement('div');
            optionsDiv.classList.add('options');
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.textContent = opt;
                btn.classList.add('option-btn');
                btn.onclick = () => sendMessage(opt);
                optionsDiv.appendChild(btn);
            });
            messages.appendChild(optionsDiv);
        }

        messages.scrollTop = messages.scrollHeight;
    }
});
