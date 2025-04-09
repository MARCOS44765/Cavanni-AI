function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.pitch = 1.2;
    utterance.rate = 1;
    utterance.voice = speechSynthesis.getVoices().find(v => v.lang === 'pt-BR');
    speechSynthesis.speak(utterance);
  }

  