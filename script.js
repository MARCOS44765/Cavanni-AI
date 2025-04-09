document.addEventListener('DOMContentLoaded', function() {
    // Elementos da Interface
    const splashScreen = document.getElementById('splash-screen');
    const chatInterface = document.getElementById('chat-interface');
    const enterChatButton = document.getElementById('enter-chat-button');

    const chatLog = document.getElementById('chat-log');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    // const micButton = document.getElementById('mic-button'); // Para futuro uso com voz

    // --- Lógica da Transição Capa -> Chat ---
    if (enterChatButton && splashScreen && chatInterface) {
        enterChatButton.addEventListener('click', () => {
            splashScreen.style.display = 'none'; // Esconde a capa
            chatInterface.style.display = 'flex'; // Mostra a interface de chat (era flex)
            userInput.focus(); // Foca na caixa de texto ao entrar
             // Adicionar a mensagem inicial da IA aqui se não estiver no HTML
            // addMessage('ai', 'Oi chefe! Sistema online. Como posso te ajudar hoje?');
        });
    } else {
        console.error("Erro: Elementos da capa ou chat não encontrados!");
        // Se a capa não for encontrada, mostra o chat diretamente como fallback
        if (!splashScreen && chatInterface) {
             chatInterface.style.display = 'flex';
        }
    }


    // --- Lógica do Chat (Mantida da versão anterior) ---

    // Função para adicionar mensagem ao log
    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        if (sender === 'user') {
            messageDiv.classList.add('user-message');
        } else {
            messageDiv.classList.add('ai-message');
        }

        const messageP = document.createElement('p');
        // Simples verificação para evitar que código HTML seja injetado
        // Para mais segurança, bibliotecas como DOMPurify seriam recomendadas
        // mas para este exemplo, textContent é suficiente.
        messageP.textContent = text;
        messageDiv.appendChild(messageP);

        chatLog.appendChild(messageDiv);
        // Scroll automático para a última mensagem
        chatLog.scrollTop = chatLog.scrollHeight;

         // Futuro: Chamar aqui a função para falar a resposta da IA
         // if (sender === 'ai') { speakText(text); }
    }

    // Função para lidar com o envio da mensagem
    function handleSendMessage() {
        const messageText = userInput.value.trim();
        if (messageText !== '') {
            addMessage('user', messageText);
            userInput.value = '';
            userInput.style.height = 'auto';

            // !! PONTO CRÍTICO !!
            // Aqui é onde você chamará o BACKEND da sua IA Cavanni no futuro.
            // Por enquanto, simulamos uma resposta ou não fazemos nada.
             setTimeout(() => {
                 // Resposta FAKE/Placeholder:
                 addMessage('ai', "Processando..."); // Ou uma resposta mais elaborada fake
                 // No futuro, substitua isso pela chamada fetch() ao seu backend
                 // e use a resposta real em addMessage('ai', respostaReal);
             }, 800); // Delay para simular processamento


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

        // Ajustar altura do textarea
        userInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }


    // --- Futuro: Funções de Voz (Web Speech API) ---

    // Exemplo básico de como seria a função para FALAR (SpeechSynthesis)
    /*
    function speakText(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'pt-BR'; // Define o idioma

            // Tenta encontrar uma voz feminina em português
            const voices = window.speechSynthesis.getVoices();
            let femaleVoice = voices.find(voice => voice.lang === 'pt-BR' && voice.name.toLowerCase().includes('female'));
             // Fallback se não encontrar específica, pega a primeira pt-BR
             if (!femaleVoice) {
                 femaleVoice = voices.find(voice => voice.lang === 'pt-BR');
             }
             if (femaleVoice) {
                 utterance.voice = femaleVoice;
             } else {
                 console.warn("Nenhuma voz pt-BR encontrada. Usando padrão.");
             }

             utterance.pitch = 1; // Ajuste (0 a 2)
             utterance.rate = 1;  // Ajuste (0.1 a 10)

            window.speechSynthesis.speak(utterance);
        } else {
            console.error("Seu navegador não suporta Síntese de Voz.");
        }
    }
    // Precisa garantir que as vozes sejam carregadas antes de usar,
    // o que pode exigir um listener para 'voiceschanged'
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {
            // As vozes estão prontas agora.
            // Você pode querer chamar speakText aqui se houver texto pendente.
            console.log("Vozes carregadas:", window.speechSynthesis.getVoices());
        };
    }
    */


    // Exemplo básico de como seria a função para OUVIR (SpeechRecognition)
    /*
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'pt-BR';
        recognition.interimResults = false; // Apenas resultados finais
        recognition.maxAlternatives = 1;

        if (micButton) {
            micButton.addEventListener('click', () => {
                 console.log("Iniciando reconhecimento de voz...");
                 recognition.start();
                 // Poderia mudar o estilo do botão para indicar que está ouvindo
            });
        }

        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript;
            console.log('Texto reconhecido:', speechResult);
            userInput.value = speechResult; // Coloca o texto reconhecido no input
            handleSendMessage(); // Envia automaticamente (ou pode só preencher)
        };

        recognition.onspeechend = () => {
            console.log("Reconhecimento terminado.");
            recognition.stop();
            // Mudar estilo do botão de volta ao normal
        };

        recognition.onerror = (event) => {
            console.error("Erro no reconhecimento de voz:", event.error);
             addMessage('ai', `Erro no reconhecimento: ${event.error}`); // Informa erro no chat
        };

    } else {
        console.error("Seu navegador não suporta Reconhecimento de Voz.");
        // Esconder o botão do microfone se não for suportado
        // if (micButton) micButton.style.display = 'none';
    }
    */

}); // Fim do DOMContentLoaded
