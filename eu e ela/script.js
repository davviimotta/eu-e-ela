// DATA DE INÍCIO DO NAMORO / RELACIONAMENTO
// Formato: Ano, Mês (0 = Janeiro, 11 = Dezembro), Dia
const startDate = new Date(2023, 10, 6, 20, 0, 0); // Ex: 12 de Junho de 2022 às 20:00

// Iniciar a Experiência
const startBtn = document.getElementById('start-btn');
const introScreen = document.getElementById('intro-screen');
const mainContent = document.getElementById('main-content');
const bgMusic = document.getElementById('bg-music');

startBtn.addEventListener('click', () => {
  // Desaparece tela de boas-vindas
  introScreen.style.opacity = '0';
  setTimeout(() => {
    introScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
  }, 1000);

  // Toca música de fundo
  bgMusic.volume = 0.5;
  bgMusic.play().catch(e => console.log('Autoplay bloqueado pelo navegador:', e));

  // Inicia animações e contadores
  setInterval(updateCounter, 1000);
  setInterval(createFloatingHeart, 500);
});

// Atualiza o contador de tempo juntos
function updateCounter() {
  const now = new Date();
  const diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('counter').innerHTML = 
    `${days} dias, ${hours}h ${minutes}m ${seconds}s`;
}

// Cria corações flutuando pela tela
function createFloatingHeart() {
  const container = document.getElementById('hearts-container');
  const heart = document.createElement('div');
  heart.classList.add('floating-heart');
  
  const icons = ['❤️', '💖', '✨', '💕', '💍'];
  heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];
  
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
  heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
  
  container.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}

// Lógica do Botão "Não" que foge
const btnNo = document.getElementById('btn-no');

function moveButton() {
  const x = Math.random() * (window.innerWidth - 120);
  const y = Math.random() * (window.innerHeight - 60);
  btnNo.style.position = 'fixed';
  btnNo.style.left = `${x}px`;
  btnNo.style.top = `${y}px`;
}

btnNo.addEventListener('mouseover', moveButton);
btnNo.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveButton();
});

// Lógica do Botão "Sim"
const btnYes = document.getElementById('btn-yes');
const modal = document.getElementById('celebration-modal');

btnYes.addEventListener('click', () => {
  // Mostra modal
  modal.classList.remove('hidden');

  // Chuva de confetes cinematográfica com a biblioteca Confetti
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#e5b972', '#e65c7b', '#ffffff']
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#e5b972', '#e65c7b', '#ffffff']
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };
  frame();
});