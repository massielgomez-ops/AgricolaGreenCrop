// Elementos del DOM
        const openChatButton = document.getElementById('openChat');
        const closeChatButton = document.getElementById('closeChat');
        const chatbotWindow = document.getElementById('chatbotWindow');
        const chatMessages = document.getElementById('chatMessages');
        const userInput = document.getElementById('userInput');
        const sendMessageButton = document.getElementById('sendMessage');
        const typingIndicator = document.getElementById('typingIndicator');
        const quickOptions = document.querySelectorAll('.quick-option');

        // Base de conocimiento del chatbot
        const knowledgeBase = {
            "hola": ["¡Hola! ¿En qué puedo ayudarte?", "¡Hola! ¿Cómo estás hoy?", "¡Hola! Me alegra verte por aquí."],
            "productos": ["Ofrecemos una amplia gama de productos. Puedes verlos en nuestra página de productos.", "Nuestros productos están disponibles en la sección 'Productos'. ¿Hay algo específico que buscas?"],
            "servicios": ["Ofrecemos diversos servicios. Puedes conocer más en la página de servicios.", "Nuestros servicios están detallados en la sección 'Servicios'. ¿Te interesa alguno en particular?"],
            "contacto": ["Puedes contactarnos a través de nuestro formulario en la página de contacto o al correo info@empresa.com", "Estamos disponibles en la página de contacto. También puedes llamarnos al +1 234 567 890."],
            "precio": ["Los precios varían según el producto. Te recomiendo revisar nuestra página de productos para más detalles.", "Para información sobre precios, consulta nuestra sección de productos o contáctanos directamente."],
            "gracias": ["¡De nada! Estoy aquí para ayudarte.", "¡Gracias a ti! No dudes en preguntar si necesitas más ayuda."],
            "adiós": ["¡Hasta luego! Que tengas un buen día.", "¡Adiós! Espero verte pronto nuevamente."],
            "default": ["Lo siento, no entiendo tu pregunta. ¿Podrías reformularla?", "No estoy seguro de entender. ¿Puedes explicarlo de otra manera?"]
        };

        // Abrir el chatbot
        openChatButton.addEventListener('click', () => {
            chatbotWindow.style.display = 'flex';
            openChatButton.style.display = 'none';
        });

        // Cerrar el chatbot
        closeChatButton.addEventListener('click', () => {
            chatbotWindow.style.display = 'none';
            openChatButton.style.display = 'flex';
        });

        // Enviar mensaje al hacer clic en el botón
        sendMessageButton.addEventListener('click', sendMessage);

        // Enviar mensaje al presionar Enter
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Manejar opciones rápidas
        quickOptions.forEach(option => {
            option.addEventListener('click', () => {
                const question = option.getAttribute('data-question');
                addMessage(question, 'user');
                setTimeout(() => {
                    getBotResponse(question);
                }, 500);
            });
        });

        // Función para enviar mensaje
        function sendMessage() {
            const message = userInput.value.trim();
            if (message) {
                addMessage(message, 'user');
                userInput.value = '';
                
                // Mostrar indicador de escritura
                typingIndicator.style.display = 'block';
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simular tiempo de respuesta
                setTimeout(() => {
                    typingIndicator.style.display = 'none';
                    getBotResponse(message);
                }, 1000 + Math.random() * 1000);
            }
        }

        // Función para agregar mensaje al chat
        function addMessage(text, sender) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
            messageElement.textContent = text;
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Función para obtener respuesta del bot
        function getBotResponse(userMessage) {
            const lowerMessage = userMessage.toLowerCase();
            let response = knowledgeBase.default[0];
            
            // Buscar coincidencia en la base de conocimiento
            for (const key in knowledgeBase) {
                if (lowerMessage.includes(key)) {
                    const responses = knowledgeBase[key];
                    response = responses[Math.floor(Math.random() * responses.length)];
                    break;
                }
            }
            
            addMessage(response, 'bot');
            
            // Mostrar opciones rápidas después de la respuesta
            if (!document.querySelector('.quick-options')) {
                const quickOptionsHTML = `
                    <div class="quick-options">
                        <button class="quick-option" data-question="Productos">Ver productos</button>
                        <button class="quick-option" data-question="Servicios">Conocer servicios</button>
                        <button class="quick-option" data-question="Contacto">Información de contacto</button>
                    </div>
                `;
                chatMessages.insertAdjacentHTML('beforeend', quickOptionsHTML);
                
                // Reasignar eventos a las nuevas opciones
                document.querySelectorAll('.quick-option').forEach(option => {
                    option.addEventListener('click', () => {
                        const question = option.getAttribute('data-question');
                        addMessage(question, 'user');
                        setTimeout(() => {
                            getBotResponse(question);
                        }, 500);
                    });
                });
            }
        }