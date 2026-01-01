// Функция создания PVP popup
function createPvpPopup() {
    // Создаем оверлей
    const overlay = document.createElement('div');
    overlay.id = 'pvp-popup-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        animation: epicFadeIn 1s ease-out forwards;
    `;

    // Создаем контейнер popup
    const popup = document.createElement('div');
    popup.id = 'pvp-popup';
    popup.classList.add('pvp-popup-initial');
    popup.style.cssText = `
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f0f 100%);
        border: 3px solid #ffd700;
        border-radius: 20px;
        padding: 30px;
        max-width: 800px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 0 50px rgba(255, 215, 0, 0.5), inset 0 0 30px rgba(255, 215, 0, 0.1);
        position: relative;
    `;

    // Заголовок
    const title = document.createElement('h1');
    title.textContent = 'НОВИНКА 2026 ГОДА PVP';
    title.style.cssText = `
        color: #ffd700;
        text-align: center;
        font-size: 2.5em;
        font-weight: bold;
        margin-bottom: 20px;
        text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
        font-family: 'Arial Black', sans-serif;
        letter-spacing: 2px;
        animation: titleGlow 2s ease-in-out infinite alternate;
    `;

    // Контейнер для видео
    const videoContainer = document.createElement('div');
    videoContainer.style.cssText = `
        text-align: center;
        margin: 20px 0;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
    `;

    // Видео
    const video = document.createElement('video');
    video.src = 'video/pvp.mp4';
    video.controls = true;
    video.autoplay = true;
    video.muted = false; // Включить звук
    video.volume = 0.5; // Средняя громкость
    video.loop = true;
    video.style.cssText = `
        width: 100%;
        max-width: 700px;
        height: auto;
        border-radius: 15px;
        animation: videoFadeIn 1s ease-out 1s both;
    `;

    // Кнопка закрытия
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 20px;
        background: #ff4444;
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 0 10px rgba(255, 68, 68, 0.5);
        z-index: 10001;
    `;
    closeBtn.onmouseover = () => closeBtn.style.transform = 'scale(1.1)';
    closeBtn.onmouseout = () => closeBtn.style.transform = 'scale(1)';
    closeBtn.onclick = () => closePvpPopup();

    // Сборка элементов
    videoContainer.appendChild(video);
    popup.appendChild(closeBtn);
    popup.appendChild(title);
    popup.appendChild(videoContainer);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Добавляем стили анимаций
    const styles = document.createElement('style');
    styles.textContent = `
        .pvp-popup-initial {
            transform: scale(0.8) rotate(-5deg);
            opacity: 0;
            animation: epicPopupIn 0.8s ease-out 0.5s forwards;
        }

        .pvp-popup-closing {
            animation: epicPopupOut 0.5s ease-in forwards !important;
        }

        @keyframes epicFadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }

        @keyframes epicPopupIn {
            0% {
                transform: scale(0.8) rotate(-5deg);
                opacity: 0;
            }
            50% {
                transform: scale(1.05) rotate(2deg);
            }
            100% {
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
        }

        @keyframes titleGlow {
            0% {
                text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
                transform: scale(1);
            }
            100% {
                text-shadow: 0 0 40px rgba(255, 215, 0, 1), 0 0 60px rgba(255, 215, 0, 0.5);
                transform: scale(1.02);
            }
        }

        @keyframes videoFadeIn {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes epicFadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }

        @keyframes epicPopupOut {
            0% {
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: scale(0.8) rotate(-5deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styles);

    // Функция закрытия popup
    window.closePvpPopup = function() {
        const overlay = document.getElementById('pvp-popup-overlay');
        const popup = document.getElementById('pvp-popup');
        if (overlay && popup) {
            popup.style.animation = 'epicPopupOut 0.5s ease-in forwards';
            overlay.style.animation = 'epicFadeOut 0.5s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 500);
        }
    };

    // Закрытие по клику на оверлей
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            closePvpPopup();
        }
    };

    // Закрытие по ESC
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closePvpPopup();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// Автоматическое открытие popup через 3 секунды после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        createPvpPopup();
    }, 3000);
});
