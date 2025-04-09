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
            userInput.focus();
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
        messageP.textContent = text;
        messageDiv.appendChild(messageP);
        chatLog.appendChild(messageDiv);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function handleSendMessage() {
        const messageText = userInput.value.trim();
        if (messageText !== '') {
            addMessage('user', messageText);
            userInput.value = '';
            userInput.style.height = 'auto';

             // !! BACKEND CALL POINT !!
             setTimeout(() => {
                 addMessage('ai', "Processando...");
             }, 800);

            userInput.focus();
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
        userInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }

    // Código para Voz (comentado) - Manter como antes
    // ... (código da Web Speech API comentado) ...

}); // Fim do DOMContentLoaded
