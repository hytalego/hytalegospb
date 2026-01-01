// Таймер: до выхода игры
const releaseDate = new Date(2026, 0, 13, 18, 0, 0); // January 13, 2026, 18:00:00

document.addEventListener('DOMContentLoaded', () => {

    // Таймер: до выхода игры
    const releaseDaysElement = document.getElementById('release-days');
    const releaseHoursElement = document.getElementById('release-hours');
    const releaseMinutesElement = document.getElementById('release-minutes');
    const releaseSecondsElement = document.getElementById('release-seconds');

    if (!releaseDaysElement || !releaseHoursElement || !releaseMinutesElement || !releaseSecondsElement) {
        console.error('Timer elements not found');
        return;
    }

    let isInitial = true;

    function updateReleaseTimer() {
        const now = new Date();
        const timeDifference = releaseDate - now;
        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            // Проверить, какие числа изменились
            const oldDays = parseInt(releaseDaysElement.textContent) || 0;
            const oldHours = parseInt(releaseHoursElement.textContent) || 0;
            const oldMinutes = parseInt(releaseMinutesElement.textContent) || 0;
            const oldSeconds = parseInt(releaseSecondsElement.textContent) || 0;

            // Добавить анимацию к изменившимся
            if (days !== oldDays) releaseDaysElement.classList.add('flip');
            if (hours !== oldHours) releaseHoursElement.classList.add('flip');
            if (minutes !== oldMinutes) releaseMinutesElement.classList.add('flip');
            if (seconds !== oldSeconds) releaseSecondsElement.classList.add('flip');

            // Обновить текст в середине анимации (250ms)
            setTimeout(() => {
                releaseDaysElement.textContent = days.toString().padStart(2, '0');
                releaseHoursElement.textContent = hours.toString().padStart(2, '0');
                releaseMinutesElement.textContent = minutes.toString().padStart(2, '0');
                releaseSecondsElement.textContent = seconds.toString().padStart(2, '0');
            }, 250);

            // Убрать класс через 500ms
            setTimeout(() => {
                releaseDaysElement.classList.remove('flip');
                releaseHoursElement.classList.remove('flip');
                releaseMinutesElement.classList.remove('flip');
                releaseSecondsElement.classList.remove('flip');
            }, 500);

            isInitial = false;
        } else {
            releaseDaysElement.textContent = '00';
            releaseHoursElement.textContent = '00';
            releaseMinutesElement.textContent = '00';
            releaseSecondsElement.textContent = '00';
            document.getElementById('release-timer').innerHTML = '<span class="final-msg">Игра вышла!</span>';
            document.querySelector('.final-msg').style.animation = 'celebrate 2s infinite';
        }
    }

    setInterval(updateReleaseTimer, 1000);
    updateReleaseTimer(); // Initial call

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

    if (modal && modalImg) {
        document.querySelectorAll('.gallery-img').forEach(img => {
            img.addEventListener('click', () => {
                modal.style.display = 'block';
                modalImg.src = img.dataset.src;
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

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

    if (warningModal) {
        // Show modal immediately
        warningModal.style.display = 'block';

        // Close modal when clicking close button
        if (warningClose) {
            warningClose.addEventListener('click', () => {
                warningModal.style.display = 'none';
            });
        }

        // Close modal when clicking outside
        warningModal.addEventListener('click', (e) => {
            if (e.target === warningModal) {
                warningModal.style.display = 'none';
            }
        });
    }

    // Contest Modal
    try {
        const contestModal = document.getElementById('contest-modal');
        const contestBtn = document.getElementById('contest-btn');
        const contestClose = document.getElementsByClassName('contest-close')[0];

        if (contestBtn && contestBtn.addEventListener) {
            // Open modal when clicking contest button
            contestBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const modal = document.getElementById('contest-modal');
                if (modal && modal.style) {
                    modal.style.removeProperty('visibility');
                    modal.style.removeProperty('opacity');
                    modal.classList.add('show');
                }
            });
        }

        if (contestClose && contestClose.addEventListener) {
            // Close modal when clicking close button
            contestClose.addEventListener('click', () => {
                closeContestModal();
            });
        }

        if (contestModal && contestModal.addEventListener) {
            // Close modal when clicking outside
            contestModal.addEventListener('click', (e) => {
                if (e.target === contestModal) {
                    closeContestModal();
                }
            });
        }

        function closeContestModal() {
            const modal = document.getElementById('contest-modal');
            if (modal && modal.classList && modal.style) {
                modal.classList.add('hide');
                setTimeout(() => {
                    modal.classList.remove('show');
                    modal.classList.remove('hide');
                    modal.style.opacity = '0';
                    modal.style.visibility = 'hidden';
                }, 500); // Match animation duration
            }
        }
    } catch (error) {
        console.error('Error in contest modal:', error);
    }






});
