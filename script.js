window.addEventListener('load', () => {
    const loadSound = document.getElementById('load-sound');
    const loading = document.getElementById('loading-screen');
    const main = document.getElementById('main-content');
  
    setTimeout(() => {
      loading.style.display = 'none';
      main.style.display = 'block';
    }, 4000); // Espera 4 segundos
  });
  