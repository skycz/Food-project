"use strict";

window.addEventListener('DOMContentLoaded', () => {
    // Получаем элементы интерфейса вкладок
    const tabs = document.querySelectorAll('.tabheader__item'),  // Вкладки
        tabsContent = document.querySelectorAll('.tabcontent'), // Контент каждой вкладки
        tabsParent = document.querySelector('.tabheader__items'); // Родительский элемент вкладок

    // Скрываем весь контент вкладок и убираем активное состояние у всех вкладок
     
    function hideTabContent() {
        tabsContent.forEach(item => {
            // Скрываем контент каждой вкладки
            item.classList.add('hide', 'fade'); // Добавляем классы для скрытия и эффекта исчезновения
            item.classList.remove('show'); // Убираем класс, который делает контент видимым
        });

        tabs.forEach(tab => {
            // Убираем активный класс у всех вкладок
            tab.classList.remove('tabheader__item_active');
        });
    }

    // Показываем конкретный контент вкладки
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade'); // Делаем контент видимым и добавляем эффект появления
        tabsContent[i].classList.remove('hide'); // Убираем класс скрытия
        tabs[i].classList.add('tabheader__item_active'); // Добавляем активный класс для текущей вкладки
    }

    // Инициализация: скрываем весь контент и показываем первую вкладку
    hideTabContent(); // Скрываем все вкладки
    showTabContent(); // Показываем первую вкладку

    // Обработчик кликов по вкладкам
    tabsParent.addEventListener('click', (event) => {
        const target = event.target; // Получаем элемент, по которому кликнули

        if (target && target.classList.contains('tabheader__item')) {
            // Проверяем, что клик был по элементу с классом вкладки
            tabs.forEach((item, i) => {
                if (target == item) {
                    // Если текущий элемент совпадает с кликнутым
                    hideTabContent(); // Скрываем весь контент
                    showTabContent(i); // Показываем контент соответствующей вкладки
                }
            });
        }
    });
});
