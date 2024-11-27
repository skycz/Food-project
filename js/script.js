"use strict";

window.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items'); // Родительский элемент вкладок

    // Скрываем весь контент вкладок и убираем активное состояние у всех вкладок
     
    function hideTabContent() {
        tabsContent.forEach(item => {
            // Скрываем контент каждой вкладки
            item.classList.add('hide', 'fade'); 
            item.classList.remove('show'); 
        });

        tabs.forEach(tab => {
            // Убираем активный класс у всех вкладок
            tab.classList.remove('tabheader__item_active');
        });
    }

    // Показываем конкретный контент вкладки
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active'); 
        // Добавляем активный класс для текущей вкладки
    }

    
    hideTabContent(); // Скрываем все вкладки
    showTabContent(); // Показываем первую вкладку

    // Обработчик кликов по вкладкам
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            // Проверяем, что клик был по элементу с классом вкладки
            tabs.forEach((item, i) => {
                if (target == item) {
                    
                    hideTabContent(); // Скрываем весь контент
                    showTabContent(i); // Показываем контент соответствующей вкладки
                }
            });
        }
    });
});

