// Таймер: до выхода игры
const releaseDate = new Date(2026, 0, 13, 18, 0, 0); // January 13, 2026, 18:00:00

document.addEventListener('DOMContentLoaded', () => {

    // Обработка вкладок
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const tab = btn.dataset.tab;
            document.getElementById(tab).classList.add('active');
        });
    });

    // Обработка вкладок в info секции
    const infoTabButtons = document.querySelectorAll('.info-tab-btn');
    const infoTabPanes = document.querySelectorAll('.info-tab-pane');

    infoTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            infoTabButtons.forEach(b => b.classList.remove('active'));
            infoTabPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const tab = btn.dataset.infoTab;
            document.getElementById(tab).classList.add('active');
        });
    });

    // Обработка форм
    const osSelect = document.getElementById('os-select');
    const archSelect = document.getElementById('arch-select');
    const downloadDirectBtn = document.getElementById('download-direct-btn');
    const downloadLauncherBtn = document.getElementById('download-launcher-btn');

    // Функция обновления доступности разрядности
    function updateArch() {
        // Сброс
        archSelect.innerHTML = '<option value="" disabled selected>Выберите</option>';

        if (osSelect.value) {
            archSelect.disabled = false;
            // Добавляем опции в зависимости от ОС
            if (osSelect.value === 'windows') {
                archSelect.add(new Option('32-bit', '32'));
                archSelect.add(new Option('64-bit', '64'));
            } else if (osSelect.value === 'mac') {
                archSelect.add(new Option('64-bit', '64'));
            } else if (osSelect.value === 'linux') {
                archSelect.add(new Option('64-bit', '64'));
            }
        } else {
            archSelect.disabled = true;
            archSelect.value = '';
        }
    }

    // Функция проверки для direct
    function checkDirect() {
        if (osSelect.value && archSelect.value) {
            downloadDirectBtn.disabled = false;
        } else {
            downloadDirectBtn.disabled = true;
        }
    }

    // Слушатели для direct
    osSelect.addEventListener('change', updateArch);
    osSelect.addEventListener('change', checkDirect);
    archSelect.addEventListener('change', checkDirect);

    // Инициализация
    updateArch();
    checkDirect();

    // Обработчики для скачивания
    downloadLauncherBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Файл существует, перенаправляем на страницу скачивания
        window.location.href = 'download/download.html';
    });

    document.getElementById('direct-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Файл игры скачивается...');
    });

    // Modal для скриншотов
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.getElementsByClassName('close')[0];

    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = img.dataset.src;
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Кнопка "Узнать больше" - прокрутка к описанию
    document.querySelector('.cta').addEventListener('click', () => {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });

    // Карточка модинг - переключение на вкладку модинг
    document.querySelector('.modding-special').addEventListener('click', () => {
        infoTabButtons.forEach(b => b.classList.remove('active'));
        infoTabPanes.forEach(p => p.classList.remove('active'));
        document.querySelector('[data-info-tab="modding"]').classList.add('active');
        document.getElementById('modding').classList.add('active');
        // Анимация переключения
        document.querySelector('.modding-special').classList.add('animate');
        setTimeout(() => {
            document.querySelector('.modding-special').classList.remove('animate');
        }, 500);
    });

    // Warning Modal
    const warningModal = document.getElementById('warning-modal');
    const warningClose = document.getElementsByClassName('warning-close')[0];

    // Show modal immediately
    warningModal.style.display = 'block';

    // Close modal when clicking close button
    warningClose.addEventListener('click', () => {
        warningModal.style.display = 'none';
    });

    // Close modal when clicking outside
    warningModal.addEventListener('click', (e) => {
        if (e.target === warningModal) {
            warningModal.style.display = 'none';
        }
    });

    // Contest Modal
    const contestModal = document.getElementById('contest-modal');
    const contestBtn = document.getElementById('contest-btn');
    const contestClose = document.getElementsByClassName('contest-close')[0];

    if (contestBtn) {
        // Open modal when clicking contest button
        contestBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (contestModal) {
                contestModal.style.removeProperty('visibility');
                contestModal.style.removeProperty('opacity');
                contestModal.classList.add('show');
            }
        });
    }

    if (contestClose) {
        // Close modal when clicking close button
        contestClose.addEventListener('click', () => {
            closeContestModal();
        });
    }

    if (contestModal) {
        // Close modal when clicking outside
        contestModal.addEventListener('click', (e) => {
            if (e.target === contestModal) {
                closeContestModal();
            }
        });
    }

    function closeContestModal() {
        if (contestModal) {
            contestModal.classList.add('hide');
            setTimeout(() => {
                contestModal.classList.remove('show');
                contestModal.classList.remove('hide');
                contestModal.style.opacity = '0';
                contestModal.style.visibility = 'hidden';
            }, 500); // Match animation duration
        }
    }

    // Игра с шариками
    let gameActive = false;
    let balls = [];
    const images = ['game/1.jpg', 'game/2.jpg'];

    function startGame() {
        if (gameActive) return;
        gameActive = true;
        createBalls();
    }

    function createBalls() {
        for (let i = 0; i < 2; i++) {
            const ball = document.createElement('div');
            ball.classList.add('game-ball');
            ball.textContent = (i + 1).toString();
            ball.style.left = Math.random() * (window.innerWidth - 50) + 'px';
            ball.style.top = Math.random() * document.body.scrollHeight + 'px';
            ball.dataset.image = images[i];
            const speed = i === 0 ? 20 : 50;
            ball.dx = speed;
            ball.dy = speed;
            ball.addEventListener('click', () => {
                showPopup(ball.dataset.image);
                ball.remove();
                balls = balls.filter(b => b !== ball);
                if (balls.length === 0) {
                    gameActive = false;
                }
            });
            document.body.appendChild(ball);
            balls.push(ball);
        }
        animateBalls();
    }

    function animateBalls() {
        const interval = setInterval(() => {
            balls.forEach(ball => {
                let newX = parseFloat(ball.style.left) + ball.dx;
                let newY = parseFloat(ball.style.top) + ball.dy;
                if (newX <= 0 || newX >= window.innerWidth - 50) ball.dx = -ball.dx;
                if (newY <= 0 || newY >= document.body.scrollHeight) ball.dy = -ball.dy;
                ball.style.left = Math.max(0, Math.min(window.innerWidth - 50, newX)) + 'px';
                ball.style.top = Math.max(0, Math.min(document.body.scrollHeight, newY)) + 'px';
            });
            if (!gameActive) {
                clearInterval(interval);
            }
        }, 16); // smoother
    }

    function showPopup(imageSrc) {
        const popup = document.createElement('div');
        popup.classList.add('game-popup');
        popup.innerHTML = `
            <span class="game-popup-close">&times;</span>
            <img src="${imageSrc}" alt="Image" class="game-popup-img">
        `;
        document.body.appendChild(popup);
        popup.style.display = 'block';

        const closeBtn = popup.querySelector('.game-popup-close');
        closeBtn.addEventListener('click', () => {
            popup.remove();
        });
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.remove();
            }
        });
    }

    // Запуск игры сразу
    startGame();
});
