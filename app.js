/**
 * ====================================================================
 * 🎂 QUIZ DA RAFA - MOTOR PRINCIPAL DE INTERATIVIDADE & ANIMAÇÕES
 * ====================================================================
 */

// Estado da Aplicação
const state = {
  currentQuestionIndex: 0,
  score: 0,
  streak: 0,
  answered: false,
  soundEnabled: true,
  audioCtx: null
};

// ====================================================================
// 1. SISTEMA DE ÁUDIO SINTÉTICO (WEB AUDIO API)
// Não necessita de arquivos externos para funcionar perfeitamente!
// ====================================================================
class SoundFX {
  static getAudioContext() {
    if (!state.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        state.audioCtx = new AudioContextClass();
      }
    }
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
    return state.audioCtx;
  }

  // Som suave de clique / pop
  static playClick() {
    if (!state.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      console.warn("Audio not supported or blocked", e);
    }
  }

  // Som de acerto (acorde triunfante)
  static playCorrect() {
    if (!state.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.35);
      });
    } catch (e) {}
  }

  // Som cômico de erro
  static playWrong() {
    if (!state.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.28);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.28);
    } catch (e) {}
  }

  // Fanfarra do Parabéns / Vitória
  static playVictory() {
    if (!state.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const melody = [
        { f: 523.25, d: 0.2, t: 0 },
        { f: 523.25, d: 0.2, t: 0.22 },
        { f: 587.33, d: 0.4, t: 0.45 },
        { f: 523.25, d: 0.4, t: 0.9 },
        { f: 698.46, d: 0.4, t: 1.35 },
        { f: 659.25, d: 0.8, t: 1.8 }
      ];

      melody.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.f, ctx.currentTime + note.t);

        gain.gain.setValueAtTime(0.2, ctx.currentTime + note.t);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + note.t + note.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + note.t);
        osc.stop(ctx.currentTime + note.t + note.d);
      });
    } catch (e) {}
  }
}

// ====================================================================
// 2. FUNDO DE ESTRELAS & PARTÍCULAS INTERATIVO (CANVAS)
// ====================================================================
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Cria partículas
  const count = Math.min(Math.floor(window.innerWidth / 18), 70);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedY: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * 0.02 + 0.005,
      color: ['#f43f5e', '#a855f7', '#fbbf24', '#ffffff'][Math.floor(Math.random() * 4)]
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.opacity += Math.sin(Date.now() * p.pulse) * 0.01;

      if (p.y < 0) p.y = height;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0.1, Math.min(0.8, p.opacity));
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    requestAnimationFrame(draw);
  }
  draw();
}

// Disparo de confetes usando confetti-canvas ou fallback nativo
function launchConfetti(bursts = 1) {
  if (typeof confetti === 'function') {
    for (let i = 0; i < bursts; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#8b5cf6', '#fbbf24', '#10b981', '#38bdf8']
        });
      }, i * 350);
    }
  }
}

// ====================================================================
// HAPTIC FEEDBACK (Vibração para dispositivos móveis)
// ====================================================================
function triggerHaptic(type = 'light') {
  if (!navigator.vibrate) return;
  if (type === 'light') navigator.vibrate(15); // Clique suave
  if (type === 'success') navigator.vibrate([20, 50, 20]); // Acerto
  if (type === 'error') navigator.vibrate([40, 60, 40, 60, 40]); // Erro
}

// ====================================================================
// 3. NAVEGAÇÃO ENTRE TELAS
// ====================================================================
function showScreen(screenId) {
  SoundFX.playClick();
  triggerHaptic('light');
  document.querySelectorAll('.view-screen').forEach(screen => {
    screen.classList.remove('active');
  });

  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (screenId === 'screen-results') {
    renderResults();
  } else if (screenId === 'screen-gallery') {
    renderGallery();
  } else if (screenId === 'screen-home') {
    if (typeof stopLetterMusic === 'function') stopLetterMusic();
  }
}

// ====================================================================
// 4. PILHA DE FOTOS 3D DA TELA INICIAL
// ====================================================================
function initHeroPolaroidStack() {
  const container = document.getElementById('polaroid-stack');
  if (!container || !QUIZ_CONFIG.heroPhotos) return;

  container.innerHTML = '';
  
  QUIZ_CONFIG.heroPhotos.forEach((photo, idx) => {
    const card = document.createElement('div');
    card.className = 'polaroid-item';
    card.style.zIndex = QUIZ_CONFIG.heroPhotos.length - idx;
    
    card.innerHTML = `
      <div class="floating-tape"></div>
      <img src="${photo.src}" alt="${photo.caption}" loading="lazy" />
      <div class="polaroid-caption">
        <span>${photo.caption}</span>
      </div>
    `;

    card.addEventListener('click', () => {
      SoundFX.playClick();
      triggerHaptic('light');
      // Move a foto clicada para o fundo da pilha
      const first = container.firstElementChild;
      if (first) {
        first.style.transform = 'translateY(-120px) rotate(15deg) scale(0.8)';
        first.style.opacity = '0';
        setTimeout(() => {
          container.appendChild(first);
          updateStackPositions();
          setTimeout(() => {
            first.style.opacity = '1';
          }, 50);
        }, 300);
      }
    });

    container.appendChild(card);
  });

  updateStackPositions();
}

function updateStackPositions() {
  const container = document.getElementById('polaroid-stack');
  if (!container) return;
  const items = container.querySelectorAll('.polaroid-item');
  const rotations = [-5, 4, -3, 6, -7];

  items.forEach((item, idx) => {
    item.style.zIndex = items.length - idx;
    const rot = rotations[idx % rotations.length];
    const translateY = idx * 12;
    const scale = 1 - (idx * 0.04);
    item.style.transform = `rotate(${rot}deg) translateY(${translateY}px) scale(${scale})`;
  });
}

// ====================================================================
// 5. MECANISMO DO QUIZ
// ====================================================================
function startQuiz() {
  stopLetterMusic();
  state.currentQuestionIndex = 0;
  state.score = 0;
  state.streak = 0;
  state.answered = false;
  showScreen('screen-quiz');
  loadQuestion(0);
}

function loadQuestion(index) {
  state.answered = false;
  const q = QUIZ_CONFIG.questions[index];
  if (!q) {
    showScreen('screen-results');
    return;
  }

  // Progresso
  const total = QUIZ_CONFIG.questions.length;
  const progressPercent = Math.round(((index + 1) / total) * 100);
  
  document.getElementById('quiz-counter').textContent = `Pergunta ${index + 1} de ${total}`;
  document.getElementById('quiz-progress-bar').style.width = `${progressPercent}%`;
  document.getElementById('quiz-streak-value').textContent = `${state.streak} 🔥`;

  // Mídia / Foto
  const photoEl = document.getElementById('quiz-photo');
  photoEl.src = q.image;
  photoEl.alt = q.title || "Foto do quiz";
  photoEl.onclick = () => openLightbox(q.image, q.title);

  // Pergunta
  document.getElementById('quiz-question-title').textContent = q.question;

  // Dica
  const hintBtn = document.getElementById('btn-hint');
  const hintBox = document.getElementById('hint-box');
  hintBox.classList.remove('active');
  hintBox.textContent = q.hint || "Pensa bem nas nossas histórias!";
  hintBtn.style.display = q.hint ? 'inline-flex' : 'none';

  // Opções
  const optionsGrid = document.getElementById('options-grid');
  optionsGrid.innerHTML = '';

  const letters = ['A', 'B', 'C', 'D', 'E'];
  q.options.forEach((optText, optIdx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `
      <span class="option-letter">${letters[optIdx]}</span>
      <span class="option-text">${optText}</span>
    `;
    btn.addEventListener('click', () => handleSelectOption(optIdx, btn));
    optionsGrid.appendChild(btn);
  });

  // Esconde caixa de feedback pós-resposta
  const feedbackBox = document.getElementById('quiz-feedback-box');
  feedbackBox.className = 'quiz-feedback-box';
  feedbackBox.innerHTML = '';
}

function handleSelectOption(selectedIndex, selectedBtn) {
  if (state.answered) return;
  state.answered = true;

  const q = QUIZ_CONFIG.questions[state.currentQuestionIndex];
  const isCorrect = (selectedIndex === q.correctAnswer);
  const options = document.querySelectorAll('.option-btn');

  // Desativa cliques extras
  options.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correctAnswer) {
      btn.classList.add('correct');
    }
  });

  if (isCorrect) {
    selectedBtn.classList.add('correct');
    state.score++;
    state.streak++;
    SoundFX.playCorrect();
    triggerHaptic('success');
    launchConfetti(1);
  } else {
    selectedBtn.classList.add('wrong');
    state.streak = 0;
    SoundFX.playWrong();
    triggerHaptic('error');
  }

  // Atualiza streak
  document.getElementById('quiz-streak-value').textContent = `${state.streak} 🔥`;

  // Feedback detalhado pós-resposta
  const feedbackBox = document.getElementById('quiz-feedback-box');
  feedbackBox.classList.add('active', isCorrect ? 'correct' : 'wrong');
  
  let reaction = isCorrect ? (q.commentRight || "Acertou em cheio! 🎯") : (q.commentWrong || "Errou feio! 😂");
  
  // Condição especial para a pegadinha da Pergunta 2 (viagem pra Disney e música Flashing Lights)
  if (q.id === 2 && selectedIndex === 4 && !isCorrect) {
    reaction = "Nada a ver mn (Essa de Flashing Lights foi só no voo! ✈️🤣)";
  }

  feedbackBox.innerHTML = `
    <div class="feedback-reaction ${isCorrect ? 'correct' : 'wrong'}">
      ${isCorrect ? '✨ ' : '🙈 '}${reaction}
    </div>
    <div class="quiz-footer-actions">
      <button class="btn-next-question" id="btn-next">
        ${state.currentQuestionIndex < QUIZ_CONFIG.questions.length - 1 ? 'Próxima Pergunta ➡️' : 'Ver Resultado Final 🏆'}
      </button>
    </div>
  `;

  document.getElementById('btn-next').addEventListener('click', () => {
    SoundFX.playClick();
    state.currentQuestionIndex++;
    if (state.currentQuestionIndex < QUIZ_CONFIG.questions.length) {
      loadQuestion(state.currentQuestionIndex);
    } else {
      showScreen('screen-results');
    }
  });
}

function toggleHint() {
  SoundFX.playClick();
  triggerHaptic('light');
  const hintBox = document.getElementById('hint-box');
  hintBox.classList.toggle('active');
}

// ====================================================================
// 6. TELA DE RESULTADOS & CARTA
// ====================================================================
function renderResults() {
  const total = QUIZ_CONFIG.questions.length;
  const score = state.score;
  const percentage = Math.round((score / total) * 100);

  document.getElementById('final-score').textContent = `${score} / ${total}`;
  
  let rank = "";
  let desc = "";
  let icon = "🏆";

  if (percentage >= 90) {
    icon = "👑";
    rank = "PRIMA LENDÁRIA DO UNIVERSO!";
    desc = "Memória de milhões! Você lembrou praticamente de tudo com perfeição. Merece o primeiro pedaço de bolo e todos os presentes do mundo!";
  } else if (percentage >= 70) {
    icon = "⭐";
    rank = "PRIMA QUASE GABARITADA!";
    desc = "Mandou muito bem! Pouquíssimas memórias escaparam. Nossa parceria continua forte como sempre!";
  } else if (percentage >= 50) {
    icon = "🥳";
    rank = "PRIMA BOA DE PAPO!";
    desc = "Lembrou de boa parte, mas algumas coisas você inventou na hora né espertinha?! KKKKK Mas tá valendo!";
  } else {
    icon = "😂";
    rank = "PRIMA COM AMNÉSIA GRAVE!";
    desc = "Meu Deus, como assim?! Errou metade das nossas histórias! Vamos precisar marcar 50 rolês novos urgente pra refrescar essa memória!";
  }

  document.getElementById('trophy-icon').textContent = icon;
  document.getElementById('results-rank').textContent = rank;
  document.getElementById('results-desc').textContent = desc;

  // Som de vitória e confetes
  SoundFX.playVictory();
  launchConfetti(4);

  // Configura a carta de aniversário
  renderLetter();

  // Botão WhatsApp
  setupWhatsAppButton(score, total, rank);
}

function renderLetter() {
  const letter = QUIZ_CONFIG.birthdayLetter;
  if (!letter) return;

  const letterBox = document.getElementById('letter-content');
  const envelope = document.getElementById('envelope-card');

  // Reseta estado para fechado
  letterBox.classList.remove('active');
  envelope.style.display = 'block';

  let bodyHtml = letter.paragraphs.map(p => `<p>${p}</p>`).join('');

  letterBox.innerHTML = `
    <div class="letter-header">
      <h3 class="letter-title">${letter.title}</h3>
      <p style="color: #64748b; font-size: 0.95rem;">${letter.subtitle}</p>
    </div>
    <div class="letter-body">
      ${bodyHtml}
      <div class="letter-signature">${letter.signature}</div>
    </div>
  `;

  envelope.onclick = () => {
    SoundFX.playClick();
    triggerHaptic('success');
    envelope.style.display = 'none';
    letterBox.classList.add('active');
    launchConfetti(2);
    playLetterMusic(); // Toca a música do Dr. Dog
  };
}

function setupWhatsAppButton(score, total, rank) {
  const btn = document.getElementById('btn-whatsapp');
  if (!btn) return;

  const name = QUIZ_CONFIG.birthdayPerson.nickname || QUIZ_CONFIG.birthdayPerson.name;
  const msg = encodeURIComponent(`Opa prima ${name}! Fiz o seu Quiz de Aniversário especial e fiz ${score}/${total} pontos (${rank})! Parabéns pelo seu dia, você é incrível! 🎉🎂❤️`);
  
  const num = QUIZ_CONFIG.birthdayPerson.whatsappNumber;
  if (num) {
    btn.href = `https://wa.me/${num}?text=${msg}`;
  } else {
    btn.href = `https://api.whatsapp.com/send?text=${msg}`;
  }
}

// ====================================================================
// 7. GALERIA DE MEMÓRIAS & LIGHTBOX
// ====================================================================
function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid || !QUIZ_CONFIG.galleryPhotos) return;

  grid.innerHTML = '';
  
  QUIZ_CONFIG.galleryPhotos.forEach((src, idx) => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    
    card.innerHTML = `
      <img src="${src}" alt="Memória ${idx + 1}" loading="lazy" />
      <div class="gallery-card-footer">
        <span class="gallery-card-title">Foto #${idx + 1}</span>
        <span style="font-size: 0.8rem; color: #64748b;">✨</span>
      </div>
    `;

    card.addEventListener('click', () => {
      openLightbox(src, `Memória #${idx + 1}`);
    });

    grid.appendChild(card);
  });
}

function openLightbox(src, caption = '') {
  SoundFX.playClick();
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');

  if (modal && img) {
    img.src = src;
    if (cap) cap.textContent = caption;
    modal.classList.add('active');
  }
}

function closeLightbox() {
  SoundFX.playClick();
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// ====================================================================
// 8. CONTROLE DE SOM E INICIALIZAÇÃO
// ====================================================================
function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  const btn = document.getElementById('btn-toggle-sound');
  if (btn) {
    btn.textContent = state.soundEnabled ? '🔊' : '🔇';
    btn.title = state.soundEnabled ? 'Som Ativado' : 'Som Mudo';
  }
  if (state.soundEnabled) {
    SoundFX.playClick();
    if (hasStartedMusic) {
      bgMusic.play().catch(e => console.log(e));
    }
  } else {
    bgMusic.pause();
    letterMusic.pause();
  }
}

// ====================================================================
// 9. REPRODUTOR DE MÚSICA NATIVO (TRILHA SONORA LOCAL)
// ====================================================================
// Para rodar perfeitamente offline e sem bloqueio do YouTube:
const bgMusic = new Audio('fotos/bg_music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.4;

const letterMusic = new Audio('fotos/carta_music.mp3');
letterMusic.loop = true;
letterMusic.volume = 0.6;

let hasStartedMusic = false;

function startMainMusic() {
  if (!hasStartedMusic && state.soundEnabled) {
    bgMusic.play().catch(e => console.log('Bloqueado pelo navegador:', e));
    hasStartedMusic = true;
  }
}

function playLetterMusic() {
  if (state.soundEnabled) {
    bgMusic.pause();
    bgMusic.currentTime = 0; // Garante que parou
    letterMusic.currentTime = 0;
    letterMusic.play().catch(e => console.log('Erro play carta:', e));
  }
}

function stopLetterMusic() {
  letterMusic.pause();
  letterMusic.currentTime = 0; // Garante que parou
  if (state.soundEnabled && hasStartedMusic) {
    bgMusic.play().catch(e => console.log('Erro resume bg:', e));
  }
}

// Interação para contornar autoplay bloqueado
document.addEventListener('click', () => {
  if (!hasStartedMusic) {
    startMainMusic();
  }
});

// Inicialização Global quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Preenche dados do header / títulos a partir do config
  if (QUIZ_CONFIG.birthdayPerson) {
    const name = QUIZ_CONFIG.birthdayPerson.name;
    const titleElements = document.querySelectorAll('.dynamic-name');
    titleElements.forEach(el => el.textContent = name);
  }

  // Inicializa Fundo
  initBackgroundCanvas();

  // Inicializa Pilha 3D Hero
  initHeroPolaroidStack();

  // Event Listeners dos botões de navegação
  document.getElementById('btn-start-quiz')?.addEventListener('click', startQuiz);
  document.getElementById('btn-restart-quiz')?.addEventListener('click', startQuiz);
  document.getElementById('btn-go-home')?.addEventListener('click', () => showScreen('screen-home'));
  document.getElementById('btn-go-gallery')?.addEventListener('click', () => showScreen('screen-gallery'));
  document.getElementById('btn-gallery-back')?.addEventListener('click', () => showScreen('screen-home'));
  document.getElementById('btn-results-gallery')?.addEventListener('click', () => showScreen('screen-gallery'));
  document.getElementById('btn-toggle-sound')?.addEventListener('click', toggleSound);
  document.getElementById('btn-hint')?.addEventListener('click', toggleHint);
  
  // Botão da Carta Secreta na Home
  document.getElementById('btn-open-letter-direct')?.addEventListener('click', () => {
    showScreen('screen-results');
    setTimeout(() => {
      document.getElementById('envelope-card')?.click();
      document.getElementById('letter-content')?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  });

  // Lightbox close
  document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox-modal') closeLightbox();
  });

  // Tecla ESC fecha lightbox
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
});
