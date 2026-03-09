// Чекаємо, поки завантажиться вся сторінка
document.addEventListener('DOMContentLoaded', () => {
    
    // Крок 1 та 4: Використовуємо querySelectorAll для вибору всіх карток подій
    const events = document.querySelectorAll('.event-card');

    // Крок 2: Цикл for для перебору елементів
    for (let i = 0; i < events.length; i++) {
        
        // Змінюємо колір фону кожної картки при завантаженні
        events[i].style.backgroundColor = '#f9f9f9';
        events[i].style.transition = '0.3s';

        // Крок 3: Оператори if-else для зміни вмісту/стилю на основі індексу (i)
        
        // Наприклад: Виділимо першу подію як "Найпопулярнішу"
        if (i === 0) {
            events[i].style.border = '2px solid #ff4d4d'; // Червона рамка для першої
            
            // Змінюємо текст всередині (наприклад, у заголовку h3)
            const title = events[i].querySelector('h3');
            if (title) {
                title.innerText += ' 🔥 (Популярне)';
            }
        } 
        // Наприклад: Для всіх парних карток (0, 2, 4...) додамо інший фон
        else if (i % 2 === 0) {
            events[i].style.backgroundColor = '#eefaff';
        }
        
        // Можна також змінити текст кнопки залежно від індексу
        const button = events[i].querySelector('.btn');
        if (button && i > 2) {
            button.innerText = 'Останні квитки!';
            button.style.backgroundColor = 'orange';
        }
    }
});