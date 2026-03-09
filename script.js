document.addEventListener('DOMContentLoaded', () => {
    
    const events = document.querySelectorAll('.event-card');

    for (let i = 0; i < events.length; i++) {
        
        events[i].style.backgroundColor = '#f9f9f9';
        events[i].style.transition = '0.3s';

        if (i === 0) {
            events[i].style.border = '2px solid #ff4d4d'; 
            
            const title = events[i].querySelector('h3');
            if (title) {
                title.innerText += ' 🔥 (Популярне)';
            }
        } 
        else if (i % 2 === 0) {
            events[i].style.backgroundColor = '#eefaff';
        }
        
        const button = events[i].querySelector('.btn');
        if (button && i > 2) {
            button.innerText = 'Останні квитки!';
            button.style.backgroundColor = 'orange';
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {

    const buttons = document.querySelectorAll('.details-btn');
    const infoBlocks = document.querySelectorAll('.extra-info');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            // Крок 2: Перевірка стану через if-else
            if (infoBlocks[i].style.display === 'none' || infoBlocks[i].style.display === '') {
                infoBlocks[i].style.display = 'block';
                this.innerText = 'Сховати опис';
                this.style.backgroundColor = '#6c757d'; 
            } else {
                infoBlocks[i].style.display = 'none';
                this.innerText = 'Детальніше про квитки';
                this.style.backgroundColor = '#007bff'; 
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

document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedback-form');
    const commentsList = document.getElementById('comments-list');

    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nameInput = document.getElementById('user-name');
        const commentInput = document.getElementById('user-comment');

        if (nameInput.value.trim() === '' || commentInput.value.trim() === '') {
            alert('Будь ласка, заповніть усі поля!');
            return;
        } else {
            // Крок 3: Маніпуляція DOM для додавання даних
            const newComment = document.createElement('li');
            newComment.innerHTML = `<strong>${nameInput.value}:</strong> ${commentInput.value}`;
            
            commentsList.prepend(newComment);

            nameInput.value = '';
            commentInput.value = '';
        }
    });

    const archiveData = [
        { title: "Запитання про квитки", content: "Чи можна повернути квиток за 2 дні до події? - ТАК! Ви можете повернути квитки, але не пізніше ніж  за 24 години до події" },
        { title: "Правила входу", content: "Вхід на стадіон відкривається за 2 години до початку." }
    ];

    const archiveSection = document.createElement('div');
    archiveSection.innerHTML = "<h3>Архів запитань:</h3>";
    document.getElementById('feedback-section').appendChild(archiveSection);

    for (let i = 0; i < archiveData.length; i++) {
        const item = document.createElement('div');
        item.classList.add('archive-item');
        item.innerHTML = `
            <h4 style="cursor:pointer; color: blue;">${archiveData[i].title} (натисніть)</h4>
            <p style="display:none;">${archiveData[i].content}</p>
        `;

        item.querySelector('h4').addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content.style.display === 'none') {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });

        archiveSection.appendChild(item);
    }
});