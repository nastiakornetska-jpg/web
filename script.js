document.addEventListener('DOMContentLoaded', () => {

    let savedBookings = JSON.parse(localStorage.getItem('userTickets')) || [];

    const eventsContainer = document.getElementById('events-container');
    const bookingsList = document.getElementById('booked-tickets-list');
    const feedbackForm = document.getElementById('feedback-form'); 

    /* =========================================================
       1. ЛОГІКА ДЛЯ ГОЛОВНОЇ СТОРІНКИ 
       ========================================================= */
    if (eventsContainer) {
        const eventsData = [
            { id: 1, title: 'Концерт "Океан Ельзи"', date: '2026-05-15', place: 'Арена Львів', price: 800, img: 'images/okean_elzy.jpg' },
            { id: 2, title: 'Гурт "Бумбокс"', date: '2026-06-28', place: 'Палац Спорту, Київ', price: 650, img: 'images/boombox.jpg' },
            { id: 3, title: 'Phil It', date: '2026-04-27', place: 'Жовтневий палац, Київ', price: 600, img: 'images/philit.jpg' }
        ];

        const currentDate = new Date();
        let i = 0;

        while (i < eventsData.length) {
            const eventDate = new Date(eventsData[i].date);
            if (eventDate >= currentDate) {
                const card = document.createElement('article');
                card.classList.add('event-card');
                card.innerHTML = `
                    <img src="${eventsData[i].img}" alt="${eventsData[i].title}" class="event-image">
                    <div class="event-details">
                        <h3>${eventsData[i].title}</h3>
                        <p><strong>Дата:</strong> ${eventsData[i].date}</p>
                        <p><strong>Місце:</strong> ${eventsData[i].place}</p>
                        <p><strong>Ціна:</strong> <span class="ticket-price">${eventsData[i].price}</span> грн</p>
                        <div class="booking-controls">
                            <label>Кількість: <input type="number" class="ticket-qty" value="1" min="1" max="10"></label>
                            <button class="book-btn" data-title='${eventsData[i].title}' data-price='${eventsData[i].price}'>Забронювати</button>
                        </div>
                    </div>
                `;
                eventsContainer.appendChild(card);
            }
            i++;
        }

        const bookButtons = document.querySelectorAll('.book-btn');
        bookButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.event-card');
                const qtyInput = card.querySelector('.ticket-qty');
                const quantity = parseInt(qtyInput.value);
                const price = parseInt(this.getAttribute('data-price'));
                const title = this.getAttribute('data-title');
                
                const totalCost = quantity * price;

                savedBookings.push({ title: title, quantity: quantity, total: totalCost });
                localStorage.setItem('userTickets', JSON.stringify(savedBookings));

                this.innerText = 'У кошику!';
                this.classList.add('booked');
                this.disabled = true;
                qtyInput.disabled = true;

                alert(`Квитки на "${title}" успішно додані!`);
            });
        });
    }

    /* =========================================================
       2. ЛОГІКА ДЛЯ ФОРМИ ВІДГУКІВ 
       ========================================================= */
    if (feedbackForm) {
        const commentsList = document.getElementById('comments-list');

        feedbackForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const nameInput = document.getElementById('user-name');
            const commentInput = document.getElementById('user-comment');

            if (nameInput.value.trim() === '' || commentInput.value.trim() === '') {
                alert('Будь ласка, заповніть усі поля!');
            } else {
                const newComment = document.createElement('li');
                newComment.innerHTML = `<strong>${nameInput.value}:</strong> ${commentInput.value}`;
                commentsList.prepend(newComment);

                nameInput.value = ''; 
                commentInput.value = '';
            }
        });
    }

/* =========================================================
       ЛОГІКА ДЛЯ СТОРІНКИ БРОНЮВАНЬ (bookings.html)
       ========================================================= */
    if (bookingsList) {
        // Перевіряємо, чи масив порожній
        if (savedBookings.length === 0) {
            // Якщо квитків немає, виводимо повідомлення
            bookingsList.innerHTML = `
                <div style="text-align:center; padding: 50px;">
                    <p style="font-size: 1.2rem; color: #777;">У вас поки немає заброньованих квитків.</p>
                    <a href="index.html" style="color: #007bff; text-decoration: none; font-weight: bold;">Перейти до списку подій</a>
                </div>
            `;
        } else {
            // Якщо квитки є, очищуємо контейнер (про всяк випадок) і виводимо їх
            bookingsList.innerHTML = ''; 
            
            for (let k = 0; k < savedBookings.length; k++) {
                const bookingItem = document.createElement('div');
                bookingItem.classList.add('booking-item');
                bookingItem.innerHTML = `
                    <p>🎟️ <strong>${savedBookings[k].title}</strong> — ${savedBookings[k].quantity} шт.</p>
                    <p>Сума до сплати: <strong>${savedBookings[k].total} грн</strong></p>
                `;
                bookingsList.appendChild(bookingItem);
            }

            // Додаємо кнопку очищення
            const clearBtn = document.createElement('button');
            clearBtn.innerText = 'Очистити всі бронювання';
            clearBtn.className = 'clear-btn'; // Додай стиль для цього класу в CSS
            clearBtn.style.cssText = 'margin-top: 20px; padding: 10px 20px; background: #e74c3c; color: white; border: none; cursor: pointer; border-radius: 5px; width: 100%;';
            
            clearBtn.addEventListener('click', () => {
                if (confirm('Ви впевнені, що хочете видалити всі бронювання?')) {
                    localStorage.removeItem('userTickets');
                    location.reload(); 
                }
            });
            bookingsList.appendChild(clearBtn);
        }
    }
})