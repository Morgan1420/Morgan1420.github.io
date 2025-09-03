document.addEventListener('DOMContentLoaded', function() {
    // Tooltip logic
    const tooltip = document.getElementById('tooltip');
    const hoverables = [
        { selector: '.left-arrow', text: 'Canvia habitació esquerra' },
        { selector: '.right-arrow', text: 'Canvia habitació dreta' },
        { selector: '.room-title', text: "Nom de l'habitació" },
        { selector: '#stats-arrow', text: 'Estadístiques' },
        { selector: '#edit-button', text: 'Editar habitació' },
        { selector: '.activity', text: 'Nova activitat' },
        { selector: '.profile', text: 'Perfil' },
        { selector: '.shop', text: 'Botiga' },
        { selector: '.home', text: 'Casa' },
        { selector: '.friends', text: 'Amics' }
    ];
    hoverables.forEach(item => {
        document.querySelectorAll(item.selector).forEach(el => {
            el.addEventListener('mouseenter', () => {
                tooltip.textContent = item.text;
                tooltip.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                tooltip.classList.remove('active');
            });
        });
    });

    // --- Activity popup & start/stop logic ---
    const activityMainBtn = document.querySelector('.footer .activity');
    if (!activityMainBtn) return; // safeguard

    // Crear popup dinámicamente (para no tocar cada HTML)
    let popup = document.getElementById('activity-popup');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'activity-popup';
        popup.className = 'activity-popup hidden';
        popup.innerHTML = '<button id="start-activity-btn"></button>';
        document.body.appendChild(popup);
    }
    const startBtn = popup.querySelector('#start-activity-btn');

    const roomTitleEl = document.querySelector('.room-title');
    function currentMode() {
        const t = (roomTitleEl?.textContent || '').toLowerCase();
        if (t.includes('dormitori') || t.includes('dormitorio')) return 'lectura';
        if (t.includes('estudi') || t.includes('estudio') || t.includes('pomodoro')) return 'estudio';
        return 'actividad';
    }
    function refreshStartBtnText() {
        const m = currentMode();
        if (m === 'lectura') startBtn.textContent = 'Iniciar lectura';
        else if (m === 'estudio') startBtn.textContent = 'Iniciar estudio';
        else startBtn.textContent = 'Iniciar actividad';
    }
    refreshStartBtnText();

    let activityRunning = false;
    let originalBitSrc = null;
    const bitImg = document.querySelector('.bit img');

    function startActivity() {
        activityRunning = true;
        activityMainBtn.classList.add('active-running');
        activityMainBtn.textContent = '■'; // icono detener
        activityMainBtn.title = 'Detener';
        if (bitImg) {
            originalBitSrc = bitImg.getAttribute('data-original-src') || bitImg.src;
            bitImg.setAttribute('data-original-src', originalBitSrc);
            if (currentMode() === 'lectura') {
                bitImg.src = '../../imatges/bits/bit_llegint.png';
            } else if (currentMode() === 'estudio') {
                bitImg.src = '../../imatges/bits/bit_llegint.png';
            }
        }
        hidePopup();
    }

    function stopActivity() {
        activityRunning = false;
        activityMainBtn.classList.remove('active-running');
        activityMainBtn.textContent = '+';
        activityMainBtn.title = 'Nova activitat';
        if (bitImg) {
            const original = bitImg.getAttribute('data-original-src');
            if (original) bitImg.src = original;
        }
        refreshStartBtnText();
    }

    function toggleRunning() {
        if (activityRunning) stopActivity(); else showPopup();
    }

    function showPopup() {
        if (activityRunning) return;
        refreshStartBtnText();
        popup.classList.remove('hidden');
        setTimeout(()=>popup.classList.add('visible'), 10);
    }
    function hidePopup() {
        popup.classList.remove('visible');
        setTimeout(()=>popup.classList.add('hidden'), 150);
    }

    activityMainBtn.addEventListener('click', toggleRunning);
    startBtn.addEventListener('click', startActivity);

    // Cerrar popup si clic fuera
    document.addEventListener('click', (e) => {
        if (!popup.contains(e.target) && e.target !== activityMainBtn && !activityRunning) {
            hidePopup();
        }
    });

    // --- Stats panels swipeable (Quick / Daily) ---
    const statsArrow = document.getElementById('stats-arrow');
    if (statsArrow) {
        let statsPanels = document.querySelector('.stats-panels');
        if (!statsPanels) {
            statsPanels = document.createElement('div');
            statsPanels.className = 'stats-panels hidden';
            statsPanels.innerHTML = `
                <div class="swipe-container">
                    <div class="swipe-track">
                        <section class="swipe-panel" data-name="quick">
                            <div class="panel-title">Resum</div>
                            <div class="stat">
                                <span class="label">📱</span>
                                <div class="bar-container">
                                    <div class="bar-fill" style="width:80%"></div>
                                    <div class="bar-rest" style="width:20%"></div>
                                </div>
                                <span class="value">2:30/3h</span>
                            </div>
                            <div class="stat">
                                <span class="label">📚</span>
                                <div class="bar-container">
                                    <div class="bar-fill success" style="width:40%"></div>
                                    <div class="bar-rest" style="width:60%"></div>
                                </div>
                                <span class="value">2/5</span>
                            </div>
                        </section>
                        <section class="swipe-panel" data-name="daily">
                            <div class="panel-title">Tasques Diaries</div>
                            <div class="tasks">
                                <div>✅ Estudiar (33 / 20 min)</div>
                                <div>🟦 Llegir (0 / 15 min)</div>
                                <div>❌ Mirar xarxes-socials (12 / 10 min)</div>
                            </div>
                        </section>
                    </div>
                    <div class="swipe-hints">
                        <span class="hint-left">←</span>
                        <span class="hint-right">→</span>
                    </div>
                    <div class="swipe-dots">
                        <span class="dot active" data-index="0"></span>
                        <span class="dot" data-index="1"></span>
                    </div>
                </div>`;
            const screen = document.getElementById('screen');
            const roomEl = screen?.querySelector('.room');
            if (roomEl) {
                roomEl.appendChild(statsPanels); // ahora dentro de la room
            } else if (screen) {
                screen.insertBefore(statsPanels, screen.querySelector('.room'));
            }
        }

        function showStatsPanels() {
            statsPanels.classList.remove('hidden');
            requestAnimationFrame(()=>{
                statsPanels.classList.add('visible');
                document.getElementById('screen')?.classList.add('stats-open');
            });
            statsArrow.textContent = '↑';
        }
        function hideStatsPanels() {
            statsPanels.classList.remove('visible');
            document.getElementById('screen')?.classList.remove('stats-open');
            setTimeout(()=>statsPanels.classList.add('hidden'), 180);
            statsArrow.textContent = '↓';
        }
        function toggleStatsPanels() {
            if (statsPanels.classList.contains('hidden')) showStatsPanels();
            else hideStatsPanels();
        }
        statsArrow.addEventListener('click', toggleStatsPanels);

        // Swipe logic / drag
        const track = statsPanels.querySelector('.swipe-track');
        const panels = Array.from(statsPanels.querySelectorAll('.swipe-panel'));
        const dots = Array.from(statsPanels.querySelectorAll('.swipe-dots .dot'));
        let currentIndex = 0;
        let startX = 0; let currentX = 0; let isDragging = false; let baseTranslate = 0;

        function updateDots() { dots.forEach(d=>d.classList.toggle('active', Number(d.dataset.index)===currentIndex)); }
        function setTranslate(index, animate=true) {
            currentIndex = Math.max(0, Math.min(index, panels.length-1));
            baseTranslate = -currentIndex * 50;
            if (animate) track.classList.add('anim'); else track.classList.remove('anim');
            track.style.transform = `translateX(${baseTranslate}%)`;
            updateDots();
        }
        setTranslate(0);

        function pointerDown(clientX) {
            isDragging = true; startX = clientX; currentX = clientX; track.classList.remove('anim');
        }
        function pointerMove(clientX) {
            if (!isDragging) return; currentX = clientX;
            const deltaPx = currentX - startX;
            const width = track.clientWidth / panels.length; // width of single panel
            const deltaPercent = (deltaPx / width) * 100;
            track.style.transform = `translateX(${baseTranslate + deltaPercent}%)`;
        }
        function pointerUp() {
            if (!isDragging) return; isDragging = false;
            const deltaPx = currentX - startX;
            const width = track.clientWidth / panels.length;
            const threshold = width * 0.15; // 15% swipe
            if (deltaPx < -threshold && currentIndex < panels.length-1) currentIndex++;
            else if (deltaPx > threshold && currentIndex > 0) currentIndex--;
            setTranslate(currentIndex, true);
        }

        // Touch events
        statsPanels.addEventListener('touchstart', e=>pointerDown(e.touches[0].clientX), {passive:true});
        statsPanels.addEventListener('touchmove', e=>pointerMove(e.touches[0].clientX), {passive:true});
        statsPanels.addEventListener('touchend', pointerUp);
        // Mouse events (opcional)
        statsPanels.addEventListener('mousedown', e=>pointerDown(e.clientX));
        window.addEventListener('mousemove', e=>pointerMove(e.clientX));
        window.addEventListener('mouseup', pointerUp);

        dots.forEach(d => d.addEventListener('click', ()=> setTranslate(Number(d.dataset.index))));
    }
});