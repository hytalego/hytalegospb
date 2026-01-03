// Feedback panel script
document.addEventListener('DOMContentLoaded', function() {

    // Create feedback panel HTML
    const feedbackPanel = document.createElement('div');
    feedbackPanel.id = 'feedback-panel';
    feedbackPanel.innerHTML = `
        <div class="feedback-content">
            <div class="feedback-header">
                <h2>Пожалуйста, оцените сайт</h2>
                <p>Ваше мнение очень важно для нас! Пожалуйста, поделитесь своими впечатлениями о сайте Hytale.</p>
            </div>
            <div id="error-messages" class="error-messages" style="display: none;"></div>
            <form id="feedback-form">
                <div class="form-group">
                    <label for="site-description">Опишите, как вам сайт (минимум 200 символов)</label>
                    <textarea id="site-description" name="description" required minlength="200"></textarea>
                    <div class="char-count" id="desc-count">0 / 200</div>
                </div>
                <div class="form-group">
                    <label for="pros">Плюсы (каждая строка должна начинаться с "+")</label>
                    <textarea id="pros" name="pros" required minlength="50" placeholder="Например:&#10;+ Хороший дизайн&#10;+ Интересный контент"></textarea>
                    <div class="char-count" id="pros-count">0 / 50</div>
                </div>
                <div class="form-group">
                    <label for="cons">Минусы (каждая строка должна начинаться с "-")</label>
                    <textarea id="cons" name="cons" required minlength="50" placeholder="Например:&#10;- Медленная загрузка&#10;- Сложная навигация"></textarea>
                    <div class="char-count" id="cons-count">0 / 50</div>
                </div>
                <div class="form-group">
                    <label>Оценка (звёзды)</label>
                    <div class="stars">
                        <span class="star" data-value="1">★</span>
                        <span class="star" data-value="2">★</span>
                        <span class="star" data-value="3">★</span>
                        <span class="star" data-value="4">★</span>
                        <span class="star" data-value="5">★</span>
                    </div>
                    <input type="hidden" id="rating" name="rating" value="0">
                </div>
                <button type="submit" class="submit-btn">Отправить</button>
            </form>
            <button class="close-btn" id="close-feedback">&times;</button>
        </div>
    `;
    document.body.appendChild(feedbackPanel);

    // Create success message
    const successMessage = document.createElement('div');
    successMessage.id = 'success-message';
    successMessage.innerHTML = `
        <h2>Спасибо за ваш отзыв!</h2>
        <p>Ваше мнение очень важно для нас.</p>
        <button onclick="document.getElementById('success-message').style.display='none';">Закрыть</button>
    `;
    document.body.appendChild(successMessage);

    // Show panel after 3 seconds
    setTimeout(() => {
        feedbackPanel.classList.add('show');
    }, 3000);

    // Close button
    document.getElementById('close-feedback').addEventListener('click', () => {
        feedbackPanel.classList.remove('show');
    });

    // Character counters
    function updateCounter(textarea, counter, min) {
        const count = textarea.value.length;
        counter.textContent = count + ' / ' + min;
        if (count >= min) {
            counter.classList.add('valid');
        } else {
            counter.classList.remove('valid');
        }
    }

    const descTextarea = document.getElementById('site-description');
    const descCount = document.getElementById('desc-count');
    descTextarea.addEventListener('input', () => updateCounter(descTextarea, descCount, 200));

    const prosTextarea = document.getElementById('pros');
    const prosCount = document.getElementById('pros-count');
    prosTextarea.addEventListener('input', () => updateCounter(prosTextarea, prosCount, 50));

    const consTextarea = document.getElementById('cons');
    const consCount = document.getElementById('cons-count');
    consTextarea.addEventListener('input', () => updateCounter(consTextarea, consCount, 50));

    // Star rating
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');
    let currentRating = 0;

    function updateStars(rating) {
        stars.forEach(s => {
            if (s.getAttribute('data-value') <= rating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    }

    stars.forEach(star => {
        star.addEventListener('mouseenter', () => {
            const value = star.getAttribute('data-value');
            updateStars(value);
        });

        star.addEventListener('mouseleave', () => {
            updateStars(currentRating);
        });

        star.addEventListener('click', () => {
            const value = star.getAttribute('data-value');
            currentRating = value;
            ratingInput.value = value;
            updateStars(currentRating);
        });
    });

    // Validate pros and cons format
    function validateList(text, prefix) {
        const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        for (const line of lines) {
            if (!line.startsWith(prefix)) {
                return false;
            }
        }
        return lines.length > 0;
    }

    // Form submission
    document.getElementById('feedback-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const errorMessagesDiv = document.getElementById('error-messages');
        const description = descTextarea.value;
        const pros = prosTextarea.value;
        const cons = consTextarea.value;
        const rating = ratingInput.value;

        const errors = [];

        if (description.length >= 200) {
            errors.push({ type: 'correct', text: '+ Описание сайта: корректно' });
        } else {
            errors.push({ type: 'error', text: '- Описание сайта: минимум 200 символов' });
        }

        if (pros.length >= 50 && validateList(pros, '+')) {
            errors.push({ type: 'correct', text: '+ Плюсы: корректно' });
        } else {
            errors.push({ type: 'error', text: '- Плюсы: минимум 50 символов, каждая строка должна начинаться с "+"' });
        }

        if (cons.length >= 50 && validateList(cons, '-')) {
            errors.push({ type: 'correct', text: '+ Минусы: корректно' });
        } else {
            errors.push({ type: 'error', text: '- Минусы: минимум 50 символов, каждая строка должна начинаться с "-"' });
        }

        if (rating != 0) {
            errors.push({ type: 'correct', text: '+ Оценка: выбрана' });
        } else {
            errors.push({ type: 'error', text: '- Оценка: выберите звёзды' });
        }

        const hasErrors = errors.some(error => error.type === 'error');

        errorMessagesDiv.innerHTML = `<ul>${errors.map(error => `<li class="${error.type}">${error.text}</li>`).join('')}</ul>`;
        errorMessagesDiv.style.display = 'block';

        if (hasErrors) {
            return;
        }

        // Send using Formspree
        fetch('https://formspree.io/f/mnjnbdvb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: description,
                pros: pros,
                cons: cons,
                rating: rating
            })
        }).then(response => {
            if (response.ok) {
                document.getElementById('success-message').style.display = 'block';
                feedbackPanel.classList.remove('show');
            } else {
                alert('Ошибка при отправке. Попробуйте позже.');
            }
        }).catch(error => {
            alert('Ошибка при отправке. Попробуйте позже.');
        });
    });
});
