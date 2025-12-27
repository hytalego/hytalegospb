// Глюки для шутки
const glitches = [
    () => { // glitch
        const elements = document.querySelectorAll('h1, h2, h3, p, span, div');
        const randomElements = Array.from(elements).sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 10) + 5);
        randomElements.forEach(el => {
            el.classList.add('glitch');
            setTimeout(() => el.classList.remove('glitch'), 1 + Math.random() * 999);
        });
    },
    () => { // flash
        const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink', 'cyan'];
        document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        setTimeout(() => document.body.style.backgroundColor = '', 1 + Math.random() * 999);
    },
    () => { // shake
        document.body.classList.add('shake');
        setTimeout(() => document.body.classList.remove('shake'), 1 + Math.random() * 999);
    },
    () => { // invert
        document.body.style.filter = 'invert(1)';
        setTimeout(() => document.body.style.filter = '', 1 + Math.random() * 999);
    },
    () => { // scale
        const scale = 0.8 + Math.random() * 0.6;
        document.body.style.transform = `scale(${scale})`;
        setTimeout(() => document.body.style.transform = '', 1 + Math.random() * 999);
    },
    () => { // rotate
        const angle = (Math.random() - 0.5) * 20;
        document.body.style.transform = `rotate(${angle}deg)`;
        setTimeout(() => document.body.style.transform = '', 1 + Math.random() * 999);
    },
    () => { // blur
        const blur = Math.random() * 5 + 'px';
        document.body.style.filter = `blur(${blur})`;
        setTimeout(() => document.body.style.filter = '', 1 + Math.random() * 999);
    },
    () => { // sepia
        const sepia = Math.random();
        document.body.style.filter = `sepia(${sepia})`;
        setTimeout(() => document.body.style.filter = '', 1 + Math.random() * 999);
    },
    () => { // hue
        const hue = Math.random() * 360;
        document.body.style.filter = `hue-rotate(${hue}deg)`;
        setTimeout(() => document.body.style.filter = '', 1 + Math.random() * 999);
    },
    () => { // brightness
        const brightness = 0.5 + Math.random() * 2;
        document.body.style.filter = `brightness(${brightness})`;
        setTimeout(() => document.body.style.filter = '', 1 + Math.random() * 999);
    },
    () => { // contrast
        const contrast = 0.5 + Math.random() * 2;
        document.body.style.filter = `contrast(${contrast})`;
        setTimeout(() => document.body.style.filter = '', 1 + Math.random() * 999);
    },
    () => { // saturate
        const saturate = 0.5 + Math.random() * 2;
        document.body.style.filter = `saturate(${saturate})`;
        setTimeout(() => document.body.style.filter = '', 1 + Math.random() * 999);
    },
    () => { // opacity
        const opacity = Math.random() * 0.5 + 0.1;
        document.body.style.opacity = opacity.toString();
        setTimeout(() => document.body.style.opacity = '', 1 + Math.random() * 999);
    },
    () => { // skew
        const skewX = (Math.random() - 0.5) * 20;
        const skewY = (Math.random() - 0.5) * 20;
        document.body.style.transform = `skew(${skewX}deg, ${skewY}deg)`;
        setTimeout(() => document.body.style.transform = '', 1 + Math.random() * 999);
    },
    () => { // translate
        const tx = (Math.random() - 0.5) * 40;
        const ty = (Math.random() - 0.5) * 40;
        document.body.style.transform = `translate(${tx}px, ${ty}px)`;
        setTimeout(() => document.body.style.transform = '', 1 + Math.random() * 999);
    },
    () => { // grayscale
        const gray = Math.random();
        document.body.style.filter = `grayscale(${gray})`;
        setTimeout(() => document.body.style.filter = '', 1 + Math.random() * 999);
    },
    () => { // drop-shadow
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const x = (Math.random() - 0.5) * 20;
        const y = (Math.random() - 0.5) * 20;
        const blur = Math.random() * 20 + 5;
        document.body.style.filter = `drop-shadow(${x}px ${y}px ${blur}px ${color})`;
        setTimeout(() => document.body.style.filter = '', 1 + Math.random() * 999);
    },
    () => { // zoom
        const zoom = 0.7 + Math.random() * 0.6;
        document.body.style.transform = `scale(${zoom})`;
        setTimeout(() => document.body.style.transform = '', 1 + Math.random() * 999);
    },
    () => { // mirror
        const mirrorX = Math.random() > 0.5 ? -1 : 1;
        const mirrorY = Math.random() > 0.5 ? -1 : 1;
        document.body.style.transform = `scaleX(${mirrorX}) scaleY(${mirrorY})`;
        setTimeout(() => document.body.style.transform = '', 1 + Math.random() * 999);
    },
    () => { // flip
        const flip = Math.random() > 0.5 ? 180 : 0;
        document.body.style.transform = `rotateX(${flip}deg)`;
        setTimeout(() => document.body.style.transform = '', 1 + Math.random() * 999);
    },
    () => { // rainbow
        const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
        const shuffled = colors.sort(() => 0.5 - Math.random());
        document.body.style.background = `linear-gradient(45deg, ${shuffled.join(', ')})`;
        setTimeout(() => document.body.style.background = '', 1 + Math.random() * 999);
    },
    () => { // neon
        const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#00ff00', '#0000ff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 100 + 20;
        document.body.style.boxShadow = `0 0 ${size}px ${color}`;
        setTimeout(() => document.body.style.boxShadow = '', 1 + Math.random() * 999);
    },
    () => { // pulse
        document.body.classList.add('pulse');
        setTimeout(() => document.body.classList.remove('pulse'), 1 + Math.random() * 999);
    },
    () => { // wiggle
        document.body.classList.add('wiggle');
        setTimeout(() => document.body.classList.remove('wiggle'), 1 + Math.random() * 999);
    },
    () => { // spin
        document.body.style.transform = 'rotate(360deg)';
        setTimeout(() => document.body.style.transform = '', 1 + Math.random() * 999);
    },
    () => { // jerk random object
        const elements = document.querySelectorAll('*');
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        randomElement.classList.add('jerk');
        setTimeout(() => randomElement.classList.remove('jerk'), 1 + Math.random() * 999);
    },
    () => { // glitch timer
        const timerElements = document.querySelectorAll('#release-days, #release-hours, #release-minutes, #release-seconds');
        timerElements.forEach(el => {
            el.textContent = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        });
        setTimeout(() => {
            // Восстановить нормальное время, но поскольку updateReleaseTimer работает, оно само исправит
            // Но чтобы эффект был, просто подождать
        }, 1 + Math.random() * 999);
    },
    () => { // popup shake text - появляется из правого нижнего угла
        const popup = document.createElement('div');
        popup.classList.add('glitch-popup', 'popup-shake', 'popup-slide-up');
        popup.innerHTML = '<div class="popup-content shake">ГЛЮК: Текст трясется!</div>';
        document.body.appendChild(popup);
        popup.style.display = 'block';
        setTimeout(() => popup.remove(), 1 + Math.random() * 999);
    },
    () => { // popup invert text - открывается с анимацией
        const popup = document.createElement('div');
        popup.classList.add('glitch-popup', 'popup-invert', 'popup-open');
        popup.innerHTML = '<div class="popup-content" style="filter: invert(1); color: white;">ГЛЮК: Инвертированный текст!</div>';
        document.body.appendChild(popup);
        popup.style.display = 'block';
        setTimeout(() => popup.remove(), 1 + Math.random() * 999);
    },
    () => { // popup rainbow text - движется по экрану
        const popup = document.createElement('div');
        popup.classList.add('glitch-popup', 'popup-rainbow', 'popup-moving');
        popup.innerHTML = '<div class="popup-content rainbow-text">ГЛЮК: Радужный текст!</div>';
        document.body.appendChild(popup);
        popup.style.display = 'block';
        setTimeout(() => popup.remove(), 1 + Math.random() * 999);
    },
    () => { // popup scale text
        const popup = document.createElement('div');
        popup.classList.add('glitch-popup', 'popup-scale');
        popup.innerHTML = '<div class="popup-content scale-text">ГЛЮК: Масштабированный текст!</div>';
        document.body.appendChild(popup);
        popup.style.display = 'block';
        setTimeout(() => popup.remove(), 1 + Math.random() * 999);
    },
    () => { // popup rotate text
        const popup = document.createElement('div');
        popup.classList.add('glitch-popup', 'popup-rotate');
        popup.innerHTML = '<div class="popup-content rotate-text">ГЛЮК: Вращающийся текст!</div>';
        document.body.appendChild(popup);
        popup.style.display = 'block';
        setTimeout(() => popup.remove(), 1 + Math.random() * 999);
    },
    () => { // popup blink text
        const popup = document.createElement('div');
        popup.classList.add('glitch-popup', 'popup-blink');
        popup.innerHTML = '<div class="popup-content blink-text">ГЛЮК: Мигающий текст!</div>';
        document.body.appendChild(popup);
        popup.style.display = 'block';
        setTimeout(() => popup.remove(), 1 + Math.random() * 999);
    },
    () => { // popup glitch text
        const popup = document.createElement('div');
        popup.classList.add('glitch-popup', 'popup-glitch');
        popup.innerHTML = '<div class="popup-content glitch">ГЛЮК: Глючный текст!</div>';
        document.body.appendChild(popup);
        popup.style.display = 'block';
        setTimeout(() => popup.remove(), 1 + Math.random() * 999);
    },
    () => { // popup pulse text
        const popup = document.createElement('div');
        popup.classList.add('glitch-popup', 'popup-pulse');
        popup.innerHTML = '<div class="popup-content pulse">ГЛЮК: Пульсирующий текст!</div>';
        document.body.appendChild(popup);
        popup.style.display = 'block';
        setTimeout(() => popup.remove(), 1 + Math.random() * 999);
    },
    () => { // popup wiggle text
        const popup = document.createElement('div');
        popup.classList.add('glitch-popup', 'popup-wiggle');
        popup.innerHTML = '<div class="popup-content wiggle">ГЛЮК: Виляющий текст!</div>';
        document.body.appendChild(popup);
        popup.style.display = 'block';
        setTimeout(() => popup.remove(), 1 + Math.random() * 999);
    },
    () => { // popup jerk text
        const popup = document.createElement('div');
        popup.classList.add('glitch-popup', 'popup-jerk');
        popup.innerHTML = '<div class="popup-content jerk">ГЛЮК: Дергающийся текст!</div>';
        document.body.appendChild(popup);
        popup.style.display = 'block';
        setTimeout(() => popup.remove(), 1 + Math.random() * 999);
    },
    () => { // popup random color text
        const popup = document.createElement('div');
        popup.classList.add('glitch-popup', 'popup-random-color');
        const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink', 'cyan'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        popup.innerHTML = `<div class="popup-content" style="color: ${color};">ГЛЮК: Цветной текст!</div>`;
        document.body.appendChild(popup);
        popup.style.display = 'block';
        setTimeout(() => popup.remove(), 1 + Math.random() * 999);
    },
    () => { // popup shadow text
        const popup = document.createElement('div');
        popup.classList.add('glitch-popup', 'popup-shadow');
        popup.innerHTML = '<div class="popup-content shadow-text">ГЛЮК: Текст с тенью!</div>';
        document.body.appendChild(popup);
        popup.style.display = 'block';
        setTimeout(() => popup.remove(), 1 + Math.random() * 999);
    },
    () => { // popup neon text
        const popup = document.createElement('div');
        popup.classList.add('glitch-popup', 'popup-neon');
        popup.innerHTML = '<div class="popup-content neon-text">ГЛЮК: Неоновый текст!</div>';
        document.body.appendChild(popup);
        popup.style.display = 'block';
        setTimeout(() => popup.remove(), 1 + Math.random() * 999);
    },
    () => { // popup mirror text
        const popup = document.createElement('div');
        popup.classList.add('glitch-popup', 'popup-mirror');
        popup.innerHTML = '<div class="popup-content" style="transform: scaleX(-1);">ГЛЮК: Зеркальный текст!</div>';
        document.body.appendChild(popup);
        popup.style.display = 'block';
        setTimeout(() => popup.remove(), 1 + Math.random() * 999);
    },
    () => { // popup flip text
        const popup = document.createElement('div');
        popup.classList.add('glitch-popup', 'popup-flip');
        popup.innerHTML = '<div class="popup-content" style="transform: scaleY(-1);">ГЛЮК: Перевернутый текст!</div>';
        document.body.appendChild(popup);
        popup.style.display = 'block';
        setTimeout(() => popup.remove(), 1 + Math.random() * 999);
    },
    () => { // popup blur text
        const popup = document.createElement('div');
        popup.classList.add('glitch-popup', 'popup-blur');
        popup.innerHTML = '<div class="popup-content" style="filter: blur(2px);">ГЛЮК: Размытый текст!</div>';
        document.body.appendChild(popup);
        popup.style.display = 'block';
        setTimeout(() => popup.remove(), 1 + Math.random() * 999);
    },
    () => { // popup sepia text
        const popup = document.createElement('div');
        popup.classList.add('glitch-popup', 'popup-sepia');
        popup.innerHTML = '<div class="popup-content" style="filter: sepia(1);">ГЛЮК: Сепия текст!</div>';
        document.body.appendChild(popup);
        popup.style.display = 'block';
        setTimeout(() => popup.remove(), 1 + Math.random() * 999);
    },
    () => { // popup hue text
        const popup = document.createElement('div');
        popup.classList.add('glitch-popup', 'popup-hue');
        popup.innerHTML = '<div class="popup-content" style="filter: hue-rotate(180deg);">ГЛЮК: Hue текст!</div>';
        document.body.appendChild(popup);
        popup.style.display = 'block';
        setTimeout(() => popup.remove(), 1 + Math.random() * 999);
    },
    () => { // popup opacity text
        const popup = document.createElement('div');
        popup.classList.add('glitch-popup', 'popup-opacity');
        popup.innerHTML = '<div class="popup-content" style="opacity: 0.5;">ГЛЮК: Полупрозрачный текст!</div>';
        document.body.appendChild(popup);
        popup.style.display = 'block';
        setTimeout(() => popup.remove(), 1 + Math.random() * 999);
    },
    () => { // popup skew text
        const popup = document.createElement('div');
        popup.classList.add('glitch-popup', 'popup-skew');
        popup.innerHTML = '<div class="popup-content" style="transform: skew(10deg);">ГЛЮК: Наклоненный текст!</div>';
        document.body.appendChild(popup);
        popup.style.display = 'block';
        setTimeout(() => popup.remove(), 1 + Math.random() * 999);
    },
    () => { // popup translate text
        const popup = document.createElement('div');
        popup.classList.add('glitch-popup', 'popup-translate');
        popup.innerHTML = '<div class="popup-content" style="transform: translate(10px, 10px);">ГЛЮК: Сдвинутый текст!</div>';
        document.body.appendChild(popup);
        popup.style.display = 'block';
        setTimeout(() => popup.remove(), 1 + Math.random() * 999);
    }
];
