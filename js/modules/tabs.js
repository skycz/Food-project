function tabs() {
    // Инициализация переменных, содержащих элементы для вкладок
    let tabs = document.querySelectorAll('.tabheader__item'), // Все элементы вкладок
        tabsContent = document.querySelectorAll('.tabcontent'), // Все элементы содержимого вкладок
        tabsParent = document.querySelector('.tabheader__items'); // Родительский элемент для вкладок

    // Функция скрытия содержимого всех вкладок
    function hideTabContent() {
        tabsContent.forEach(item => {
            // Добавляем класс 'hide', чтобы скрыть вкладку
            item.classList.add('hide');
            // Удаляем классы 'show' и 'fade', чтобы скрыть анимацию
            item.classList.remove('show', 'fade');
        });

        // Удаляем активный класс для всех вкладок
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    // Функция для отображения содержимого вкладки
    function showTabContent(i = 0) {
        // Добавляем классы 'show' и 'fade' для анимации и видимости выбранной вкладки
        tabsContent[i].classList.add('show', 'fade');
        // Убираем класс 'hide', чтобы отображение стало видимым
        tabsContent[i].classList.remove('hide');
        // Добавляем активный класс для соответствующей вкладки
        tabs[i].classList.add('tabheader__item_active');
    }

    // Изначально скрываем все вкладки и показываем первую вкладку
    hideTabContent();
    showTabContent();

    // Обработчик событий для родительского элемента вкладок
    tabsParent.addEventListener('click', function (event) {
        const target = event.target; // Получаем элемент, по которому кликнули
        // Проверяем, был ли клик по элементу, который является вкладкой
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                // Если кликнули на вкладку, показываем соответствующее содержимое
                if (target == item) {
                    hideTabContent(); // Скрываем все содержимое вкладок
                    showTabContent(i); // Показываем содержимое выбранной вкладки
                }
            });
        }
    });
}

// Экспортируем функцию для использования в других частях программы
module.exports = tabs;
