        // Background Music Setup & Start Overlay
        const bgMusic = new Audio('sound/tiki-tiki-boosted.mp3');
        bgMusic.loop = false;
        bgMusic.volume = 0.6;

        const startOverlay = document.getElementById('startOverlay');
        const startBtn = document.getElementById('startBtn');
        const skipBtn = document.getElementById('skipBtn');

        function startBGM() {
            bgMusic.play().then(() => {
                if (startOverlay) {
                    startOverlay.style.opacity = '0';
                    setTimeout(() => startOverlay.remove(), 500);
                }
            }).catch(e => {
                console.log('Audio play error:', e);
            });
        }

        function skipBGM() {
            const animeSound = new Audio('sound/anime-ahh.mp3');
            animeSound.play().catch(e => console.log('Audio error:', e));
            if (startOverlay) {
                startOverlay.style.opacity = '0';
                setTimeout(() => startOverlay.remove(), 500);
            }
        }

        if (startBtn) {
            startBtn.addEventListener('click', startBGM);
        }

        if (skipBtn) {
            skipBtn.addEventListener('click', skipBGM);
        }

        // Mobile Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const navbar = document.getElementById('navbar');

        hamburger.addEventListener('click', () => {
            navbar.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });

        // Contact Form Submission
        const contactForm = document.getElementById('contactForm');
        const contactModal = document.getElementById('contactModal');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const modalMessage = document.getElementById('modalMessage');

        if (contactForm && contactModal) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const playerName = document.getElementById('name').value;
                const playerEmail = document.getElementById('email').value;
                const playerMessage = document.getElementById('message').value;

                if (modalMessage) {
                    modalMessage.innerHTML = `Terima kasih <strong>${playerName}</strong> (${playerEmail}).<br>Kalau serius lanjut whatsapp😘!`;
                }
                contactModal.style.display = 'flex';
                contactForm.reset();
            });

            if (closeModalBtn) {
                closeModalBtn.addEventListener('click', () => {
                    contactModal.style.display = 'none';
                });
            }

            contactModal.addEventListener('click', (e) => {
                if (e.target === contactModal) {
                    contactModal.style.display = 'none';
                }
            });
        }

        // Scrollspy for active nav link
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });

        // Sci-Fi Reticle Gaming Cursor Movement
        const cursorReticle = document.getElementById('cursorReticle');

        let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
        let reticleX = window.innerWidth / 2, reticleY = window.innerHeight / 2;
        let cursorVisible = false;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!cursorVisible) {
                cursorVisible = true;
                if (cursorReticle) cursorReticle.style.opacity = '1';
            }
        });

        document.addEventListener('mouseleave', () => {
            if (cursorReticle) cursorReticle.style.opacity = '0';
            cursorVisible = false;
        });

        document.addEventListener('mouseenter', () => {
            if (cursorReticle) cursorReticle.style.opacity = '1';
            cursorVisible = true;
        });

        function animateCursor() {
            reticleX += (mouseX - reticleX) * 0.3;
            reticleY += (mouseY - reticleY) * 0.3;
            if (cursorReticle) {
                cursorReticle.style.left = `${reticleX}px`;
                cursorReticle.style.top = `${reticleY}px`;
            }
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effects on interactive elements
        const interactiveEls = document.querySelectorAll('a, button, input, textarea, .hamburger, .social-links a');
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });

        // Interactive Click XP / Sparkle Effect
        const xpMessages = ["+10 XP!", "⚡ CRITICAL!", "QUEST ITEM!", "LEVEL UP!", "GG!", "+50 GOLD"];
        window.addEventListener('click', (e) => {
            const popup = document.createElement('div');
            popup.className = 'click-popup';
            const randomMsg = xpMessages[Math.floor(Math.random() * xpMessages.length)];
            popup.textContent = randomMsg;
            popup.style.left = `${e.clientX}px`;
            popup.style.top = `${e.clientY}px`;
            document.body.appendChild(popup);

            setTimeout(() => {
                popup.remove();
            }, 800);
        });


        // Web Audio API Retro Sound Effects
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        function playBeep(frequency = 440, duration = 0.08, type = 'sine') {
            try {
                if (audioCtx.state === 'suspended') {
                    audioCtx.resume();
                }
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = type;
                osc.frequency.value = frequency;
                gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + duration);
            } catch (e) {
                // Audio context blocked until user interaction
            }
        }

        // Attach beep sounds to clicks
        document.querySelectorAll('a, button, input, textarea, .theme-btn').forEach(el => {
            el.addEventListener('click', () => playBeep(587.33, 0.08, 'square'));
        });

        // Interactive Theme Switcher
        const themes = {
            cyan: { primary: '#00f0ff', accent: '#00ff66', secondary: '#b000ff' },
            green: { primary: '#00ff66', accent: '#00ffff', secondary: '#ffff00' },
            purple: { primary: '#b000ff', accent: '#00f0ff', secondary: '#ff00ff' },
            amber: { primary: '#ffb000', accent: '#00ff66', secondary: '#ff3366' }
        };

        function setTheme(themeName) {
            const t = themes[themeName];
            if (t) {
                document.documentElement.style.setProperty('--primary-color', t.primary);
                document.documentElement.style.setProperty('--accent-color', t.accent);
                document.documentElement.style.setProperty('--secondary-color', t.secondary);
                playBeep(880, 0.1, 'triangle');
            }
        }

        // Konami Code Easter Egg (God Mode)
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        let konamiIndex = 0;

        window.addEventListener('keydown', (e) => {
            if (e.code === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    document.body.classList.toggle('god-mode');
                    alert('GOD MODE ACTIVATED! UNLIMITED POWER & MATRIX MODE UNLOCKED!');
                    playBeep(1200, 0.3, 'sawtooth');
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });

        // Bug Hunter Mini-Game
        let bugScore = 0;
        const hud = document.createElement('div');
        hud.className = 'bug-score-hud';
        hud.innerHTML = '<i class="fa-solid fa-bug"></i> <span id="bugCount">0</span>';
        hud.style.cursor = 'pointer';
        hud.title = 'Klik untuk melihat penjelasan bug yang dibasmi!';
        document.body.appendChild(hud);

        const bugDescriptions = [
            {
                title: "BUGY",
                desc: "...."
            },
        ];

        const bugModal = document.getElementById('bugModal');
        const bugModalTitle = document.getElementById('bugModalTitle');
        const bugModalDesc = document.getElementById('bugModalDesc');
        const closeBugModalBtn = document.getElementById('closeBugModalBtn');

        if (bugModal && closeBugModalBtn) {
            closeBugModalBtn.addEventListener('click', () => {
                bugModal.style.display = 'none';
            });
            bugModal.addEventListener('click', (e) => {
                if (e.target === bugModal) {
                    bugModal.style.display = 'none';
                }
            });
        }

        // Click HUD container to show bug explanation popup
        hud.addEventListener('click', () => {
            const randomBugInfo = bugDescriptions[Math.floor(Math.random() * bugDescriptions.length)];
            if (bugModalTitle && bugModalDesc && bugModal) {
                bugModalTitle.textContent = randomBugInfo.title;
                bugModalDesc.innerHTML = `${randomBugInfo.desc}<br><br><span style="color: var(--accent-color); font-weight: bold;">Total Bug Squashed: ${bugScore}</span>`;
                bugModal.style.display = 'flex';
            }
        });

        function spawnBug() {
            const bug = document.createElement('div');
            bug.className = 'bug-hunter-target';
            bug.innerHTML = '<i class="fa-solid fa-bug"></i>';
            const padding = 50;
            const maxX = Math.max(50, window.innerWidth - padding);
            const maxY = Math.max(120, window.innerHeight - padding);
            bug.style.left = `${Math.floor(Math.random() * (maxX - padding) + padding)}px`;
            bug.style.top = `${Math.floor(Math.random() * (maxY - 160) + 120)}px`;
            document.body.appendChild(bug);

            bug.addEventListener('click', (e) => {
                e.stopPropagation();
                bugScore++;
                document.getElementById('bugCount').textContent = bugScore;
                
                // Play bug sound (fahhhhh.mp3)
                const bugAudio = new Audio('sound/fahhhhh.mp3');
                bugAudio.play().catch(err => console.log('Bug audio error:', err));
                
                // Show XP popup
                const popup = document.createElement('div');
                popup.className = 'click-popup';
                popup.textContent = '+50 BUG XP!';
                popup.style.left = `${e.clientX}px`;
                popup.style.top = `${e.clientY}px`;
                document.body.appendChild(popup);
                setTimeout(() => popup.remove(), 800);

                bug.remove();
                setTimeout(spawnBug, 3000 + Math.random() * 4000);
            });

            // Auto-move bug after 4s if unclicked
            setTimeout(() => {
                if (bug.parentElement) {
                    bug.style.left = `${Math.random() * (window.innerWidth - 60)}px`;
                    bug.style.top = `${Math.random() * (window.innerHeight - 60)}px`;
                }
            }, 4000);
        }

        setTimeout(spawnBug, 2000);
