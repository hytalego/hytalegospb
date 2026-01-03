// Анимация масштабирования изображения data/img/time/10.png

document.addEventListener('DOMContentLoaded', function() {

    // Создаем оверлей для затемнения фона
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.zIndex = '9999';
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none'; // Не блокировать клики вообще
    document.body.appendChild(overlay);

    // Создаем контейнер для логотипа
    const logoDiv = document.createElement('div');
    logoDiv.style.position = 'fixed';
    logoDiv.style.top = '50%';
    logoDiv.style.left = '50%';
    logoDiv.style.transform = 'translate(-50%, -50%)';
    logoDiv.style.zIndex = '10000';
    logoDiv.style.opacity = '0';
    logoDiv.style.pointerEvents = 'none'; // Не блокировать клики

    // Вычислить количество дней до выхода игры
    const releaseDate = new Date(2026, 0, 13); // 13 января 2026
    let currentImageNumber = null;

    function calculateImageNumber() {
        const today = new Date();
        const daysUntilRelease = Math.ceil((releaseDate - today) / (1000 * 60 * 60 * 24));
        return Math.max(0, Math.min(10, daysUntilRelease)).toString().padStart(2, '0');
    }

    const imageNumber = calculateImageNumber();
    currentImageNumber = imageNumber;
    const imageSrc = `data/img/time/${imageNumber}.png`;

    console.log('Today:', new Date().toDateString(), 'Days until release:', Math.ceil((releaseDate - new Date()) / (1000 * 60 * 60 * 24)), 'Image number:', imageNumber);

    // Создаем изображение
    const img = document.createElement('img');
    img.src = imageSrc + '?t=' + Date.now(); // Предотвратить кэширование
    img.alt = 'Logo';
    img.style.width = '900px';
    img.style.height = 'auto';
    img.style.filter = 'drop-shadow(0 0 40px gold) brightness(1.2)';
    img.style.opacity = '1'; // Не прозрачная

    img.onload = function() {
    };

    img.onerror = function() {
    };

    logoDiv.appendChild(img);
    document.body.appendChild(logoDiv);

    // Функция анимации
    function startAnimation() {
        let startTime = null;
        const duration = 12000; // 12 секунд

        function animate(timestamp) {
            function easeInOut(t) {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            }

            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Устанавливаем opacity для div в 1, чтобы он был видим
            logoDiv.style.opacity = '1';

            if (progress < 0.3) {
                // Появление с вращением
                const p = progress / 0.3;
                const easedP = easeInOut(p);
                const opacity = p;
                const rotation = easedP * 360;
                img.style.opacity = opacity;
                img.style.filter = `drop-shadow(0 0 60px gold) brightness(1.5)`;
                logoDiv.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
                overlay.style.opacity = p * 0.8;
            } else if (progress < 0.7) {
                // Без пульсации
                img.style.opacity = '1';
                img.style.filter = `drop-shadow(0 0 60px gold) brightness(1.5)`;
                logoDiv.style.transform = `translate(-50%, -50%) rotate(360deg)`;
                overlay.style.opacity = '0.8';
            } else {
                // Исчезновение с вращением обратно
                const p = (progress - 0.7) / 0.3;
                const easedP = easeInOut(p);
                const opacity = 1 - p;
                const rotation = 360 - easedP * 360;
                img.style.opacity = opacity;
                img.style.filter = `drop-shadow(0 0 60px gold) brightness(1.5)`;
                logoDiv.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
                overlay.style.opacity = (1 - p) * 0.8;
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Убрать элементы после завершения анимации
                document.body.removeChild(overlay);
                document.body.removeChild(logoDiv);
            }
        }

        requestAnimationFrame(animate);
    }

    // Запуск сразу
    startAnimation();
});
