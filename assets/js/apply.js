(function applyConfig() {
  const C = THEME_CONFIG;
  const root = document.documentElement;

  // 1. Terapkan Warna & Teks
  function applyColors() {
    root.style.setProperty('--neon-cyan', C.colors.primary);
    root.style.setProperty('--neon-purple', C.colors.secondary);
    root.style.setProperty('--neon-pink', C.colors.accent);
  }
  
  document.title = C.panelName;
  document.getElementById('panel-name').textContent = C.panelName;
  document.getElementById('panel-subtitle').textContent = C.panelSubtitle;
  document.getElementById('welcome-text').textContent = C.texts.welcome;
  document.getElementById('profile-title').textContent = C.texts.profileTitle;
  document.getElementById('profile-bio').textContent = C.texts.profileBio;
  
  const creditName = C.creditText.replace(/^ThemeBy\s*:\s*/, '');
  document.getElementById('credit-footer').innerHTML = 'ThemeBy : <span class="credit-name">' + creditName + '</span>';

  // Fungsi update profil
  function updateProfile() {
    document.getElementById('user-name').textContent = C.profile.name;
    document.getElementById('avatar-img').src = C.profile.avatar;
    document.getElementById('profile-avatar').src = C.profile.avatar;
    document.getElementById('profile-name').textContent = C.profile.name;
    document.getElementById('profile-role').textContent = C.profile.role;
  }
  updateProfile();

  // 2. Render Server List
  function renderServers() {
    document.getElementById('server-list').innerHTML = C.servers.map(function(s) {
      var statusClass = s.online ? 'status-online' : 'status-offline';
      var statusText = s.online ? C.texts.serverOnline : C.texts.serverOffline;
      var btnText = s.online ? C.texts.btnConsole : C.texts.btnStart;
      return '<div class="server-card">' +
        '<h2>' + s.name + '</h2>' +
        '<p>Status: <span class="' + statusClass + '">● ' + statusText + '</span></p>' +
        '<button class="btn">' + btnText + '</button>' +
        '</div>';
    }).join('');
  }
  renderServers();
  applyColors();

  // 3. Animasi Statistik CPU & RAM Palsu
  setInterval(() => {
    const cpu = Math.floor(Math.random() * 40) + 10; // 10-50%
    const ram = Math.floor(Math.random() * 30) + 40; // 40-70%
    document.getElementById('cpu-bar').style.width = cpu + '%';
    document.getElementById('cpu-text').textContent = cpu + '%';
    document.getElementById('ram-bar').style.width = ram + '%';
    document.getElementById('ram-text').textContent = ram + '%';
  }, 2000);

  // 4. Uptime Timer
  let seconds = 0;
  setInterval(() => {
    seconds++;
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    document.getElementById('uptime-text').textContent = h + ':' + m + ':' + s;
  }, 1000);

  // 5. Fitur Suara (SFX)
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  let audioCtx;
  let sfxEnabled = C.features.sfx;
  
  document.getElementById('btn-sfx').addEventListener('click', function() {
    sfxEnabled = !sfxEnabled;
    this.textContent = sfxEnabled ? '🔊' : '🔇';
  });

  function playClickSound() {
    if (!sfxEnabled) return;
    if (!audioCtx) audioCtx = new AudioContext();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  }
  
  // Pasang suara ke semua tombol
  document.querySelectorAll('button').forEach(btn => btn.addEventListener('click', playClickSound));

  // 6. Fitur Ganti Tema (Light/Dark)
  document.getElementById('btn-theme').addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    C.features.lightMode = document.body.classList.contains('light-mode');
  });

  // 7. Modal Pengaturan
  const modal = document.getElementById('settings-modal');
  document.getElementById('btn-settings'
  document.getElementById('btn-close').addEventListener('click', () => modal.classList.remove('active'));
  
  // Isi nilai awal modal
  document.getElementById('input-color').value = C.colors.primary;
  document.getElementById('input-name').value = C.profile.name;

  document.getElementById('btn-save').ddEventListener('click', () => {
    const newColor = document.getElement
    const newName = document.getElementById('input-name').value;
    
    C.co
    C.profile.name = newName || "User";
    updateProfile();
    applyColors();
    
    modal.classList.remove('active');
  });

  // 8. Efek 
  if (C.features.meteor) {
    const canvas = document.getElementById('meteor-canvas');
    const ctx = canvas.getConte

    let height = canvas.h

    window.addEventListener
      width = canvas.width = window.innerWidth;
      height = canvas.
    });

    const meteors = [];
    for (let i = 0; i < 30; i++)
      meteors.push({
        x: Math.random() * width,
        y: Mat.random() * height,
        length: Math.random() * 80 + 20,
        speed: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    function drawMeteors() {
      ctx.clearRect(0, 0, width, height);
      const color = C.colors.primary;
      
      meteors.forEach(m => {
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.length, m.y + m.length);
        ctx.strokeStyle = color;
        ctx.globalAlpha = m.opacity;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        m.x += m.speed;
        m.y -= m.speed;

        if (m.x > width || m.y < 0) {
          m.x = Math.random() * width;
          m.y = height + Math.random() * 100;
        }
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(drawMeteors);
    }
    drawMeteors();
  }

})();
