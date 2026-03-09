document.addEventListener('DOMContentLoaded', () => {

    // --- Кроку 1, 2, 3: Кнопки "Детальніше" ---
    const buttons = document.querySelectorAll('.details-btn');
    const infoBlocks = document.querySelectorAll('.extra-info');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            // Крок 2: Перевірка стану через if-else
            if (infoBlocks[i].style.display === 'none' || infoBlocks[i].style.display === '') {
                infoBlocks[i].style.display = 'block';
                this.innerText = 'Сховати опис';
                this.style.backgroundColor = '#6c757d'; // Змінюємо колір кнопки, коли відкрито
            } else {
                infoBlocks[i].style.display = 'none';
                this.innerText = 'Детальніше про квитки';
                this.style.backgroundColor = '#007bff'; // Повертаємо колір
            }
        });
    }

    // --- Крок 4: Ефект наведення з умовною логікою ---
    const navLinks = document.querySelectorAll('nav a');

    for (let i = 0; i < navLinks.length; i++) {
        // Зберігаємо початковий текст, щоб повернути його потім
        const originalText = navLinks[i].innerText;

        navLinks[i].addEventListener('mouseenter', function() {
            // Умовна логіка: змінюємо вміст залежно від того, що написано
            if (originalText === 'Головна') {
                this.innerText = '🏠 На старт';
            } else if (originalText === 'Концерти') {
                this.innerText = '🎸 Обрати подію';
            } else {
                this.innerText = '✨ Дізнатись більше';
            }
            this.style.fontWeight = 'bold';
            this.style.color = '#ff4d4d';
        });

        navLinks[i].addEventListener('mouseleave', function() {
            // Повертаємо все назад
            this.innerText = originalText;
            this.style.fontWeight = 'normal';
            this.style.color = '';
        });
    }
});