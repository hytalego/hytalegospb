// Таймер: до выхода игры
const releaseDate = new Date(2026, 0, 13, 18, 0, 0); // January 13, 2026, 18:00:00

const infoTabButtons = document.querySelectorAll('.info-tab-btn');
const infoTabPanes = document.querySelectorAll('.info-tab-pane');

document.addEventListener('DOMContentLoaded', () => {

    // Таймер: до выхода игры
    const releaseDaysElement = document.getElementById('release-days');
    const releaseHoursElement = document.getElementById('release-hours');
    const releaseMinutesElement = document.getElementById('release-minutes');
    const releaseSecondsElement = document.getElementById('release-seconds');

    if (!releaseDaysElement || !releaseHoursElement || !releaseMinutesElement || !releaseSecondsElement) {
        return;
    }

    let isInitial = true;

    function updateTimer(daysEl, hoursEl, minutesEl, secondsEl) {
        const now = new Date();
        const timeDifference = releaseDate - now;
        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            // Обновить текст
            daysEl.textContent = days.toString().padStart(2, '0');
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');

            isInitial = false;
        } else {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            if (daysEl.id === 'release-days') {
                document.getElementById('release-timer').innerHTML = '<span class="final-msg">Игра вышла!</span>';
            }
        }
    }

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

    // Update header timer
    const releaseDaysH = document.getElementById('release-days-h');
    const releaseHoursH = document.getElementById('release-hours-h');
    const releaseMinutesH = document.getElementById('release-minutes-h');
    const releaseSecondsH = document.getElementById('release-seconds-h');

    if (releaseDaysH && releaseHoursH && releaseMinutesH && releaseSecondsH) {
        setInterval(() => updateTimer(releaseDaysH, releaseHoursH, releaseMinutesH, releaseSecondsH), 1000);
        updateTimer(releaseDaysH, releaseHoursH, releaseMinutesH, releaseSecondsH); // Initial call
    }

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

    infoTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            infoTabButtons.forEach(b => b.classList.remove('active'));
            infoTabPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const tab = btn.dataset.infoTab;
            document.getElementById(tab).classList.add('active');
        });
    });

    // Обработка форм (removed as os-select etc. are not on this page)

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



    // Warning Modal (removed)

    // Contest Modal (removed as contest-btn does not exist)

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        observer.observe(section);
    });

    // Запуск анимации логотипа через 5 секунд (moved to animation.js)
});

// Карточка модинг - переключение на вкладку модинг
const moddingCard = document.querySelector('.modding-special');
if (moddingCard) {
    moddingCard.addEventListener('click', () => {
        // Переключаем на вкладку модинг
        const infoTabButtons = document.querySelectorAll('.info-tab-btn');
        const infoTabPanes = document.querySelectorAll('.info-tab-pane');
        const moddingBtn = document.querySelector('[data-info-tab="modding"]');
        if (moddingBtn) {
            infoTabButtons.forEach(b => b.classList.remove('active'));
            infoTabPanes.forEach(p => p.classList.remove('active'));
            moddingBtn.classList.add('active');
            document.getElementById('modding').classList.add('active');
            // Прокрутка к секции about
            const aboutSection = document.getElementById('about');
            if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
        // Анимация переключения
        moddingCard.classList.add('animate');
        setTimeout(() => {
            moddingCard.classList.remove('animate');
        }, 500);
    });
}

// Кнопка "Узнать больше" - прокрутка к описанию
const ctaButton = document.querySelector('button.cta');
if (ctaButton) {
    ctaButton.addEventListener('click', function(event) {
        event.preventDefault();
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Hamburger menu
const hamburgerBtn = document.getElementById('hamburger-btn');
const sidebar = document.querySelector('.sidebar');

if (hamburgerBtn && sidebar) {
    hamburgerBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        hamburgerBtn.classList.toggle('active');
    });

    // Close menu when clicking on a link
    sidebar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
            hamburgerBtn.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburgerBtn.contains(e.target) && !sidebar.contains(e.target)) {
            sidebar.classList.remove('active');
            hamburgerBtn.classList.remove('active');
        }
    });
}

// Кнопка включения звука
const playSoundBtn = document.getElementById('play-sound-btn');
const bgSound = document.getElementById('bg-sound');
if (playSoundBtn && bgSound) {
    playSoundBtn.addEventListener('click', function() {
        bgSound.play().catch(e => {});
        playSoundBtn.textContent = 'ЗВУК ВКЛЮЧЕН';
        playSoundBtn.disabled = true;
        playSoundBtn.style.animation = 'none';
    });
}
