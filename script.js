document.addEventListener('DOMContentLoaded', function() {
    // Elementos da Interface
    const splashScreen = document.getElementById('splash-screen');
    const chatInterface = document.getElementById('chat-interface');
    const enterChatButton = document.getElementById('enter-chat-button');

    const chatLog = document.getElementById('chat-log');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // --- Lógica da Transição Capa -> Chat ---
    if (enterChatButton && splashScreen && chatInterface) {
        enterChatButton.addEventListener('click', () => {
            splashScreen.style.display = 'none';
            chatInterface.style.display = 'flex';
            // Pequeno timeout para garantir que o foco funcione após o display:flex
            setTimeout(() => userInput.focus(), 50);
            // Mensagem inicial já está no HTML
        });
    } else {
        console.error("Erro: Elementos da capa ou chat não encontrados!");
        if (!splashScreen && chatInterface) {
             chatInterface.style.display = 'flex';
        }
    }


    // --- Lógica do Chat ---
    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        if (sender === 'user') {
            messageDiv.classList.add('user-message');
        } else {
            messageDiv.classList.add('ai-message');
        }
        const messageP = document.createElement('p');
        messageP.textContent = text; // Usar textContent previne XSS básico
        messageDiv.appendChild(messageP);

        // Adiciona ao log antes de iniciar a animação de scroll
        chatLog.appendChild(messageDiv);

        // Scroll suave para a nova mensagem
        chatLog.scrollTo({
            top: chatLog.scrollHeight,
            behavior: 'smooth' // Scroll mais suave
        });
    }

    function handleSendMessage() {
        const messageText = userInput.value.trim();
        if (messageText !== '') {
            addMessage('user', messageText);
            userInput.value = '';
            userInput.style.height = 'auto'; // Reseta altura para recalcular

            // !! BACKEND CALL POINT !!
             setTimeout(() => {
                 // Resposta FAKE/Placeholder:
                 addMessage('ai', "Entendido. Processando sua solicitação..."); // Resposta fake um pouco melhor
             }, 800);

             // Timeout pequeno para garantir que o foco retorne após eventos
            setTimeout(() => userInput.focus(), 0);
        }
    }

    // Event Listeners do Chat
    if (sendButton) {
        sendButton.addEventListener('click', handleSendMessage);
    }
    if (userInput) {
        userInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSendMessage();
            }
        });
        // Ajustar altura do textarea dinamicamente
        userInput.addEventListener('input', function() {
            this.style.height = 'auto'; // Reseta a altura para obter scrollHeight correto
            // Define a nova altura, limitado pelo max-height do CSS
            this.style.height = Math.min(this.scrollHeight, parseInt(window.getComputedStyle(this).maxHeight)) + 'px';
        }, false);
    }

    // Código para Voz (comentado) - Manter como antes
    // ... (código da Web Speech API comentado) ...

}); // Fim do DOMContentLoaded
