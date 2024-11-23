"use strict";

window.addEventListener('DOMContentLoaded', () => {

    // Tabs

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

// Timer 

    const deadline = '2024-12-23'; // Устанавливаем конечную дату таймера

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()); // Разница между конечной и текущей датой

        if (t <= 0) { // Если время вышло (разница времени меньше или равна 0)
            days = 0; // Устанавливаем дни равными 0
            hours = 0; // Устанавливаем часы равными 0
            minutes = 0; // Устанавливаем минуты равными 0
            seconds = 0; // Устанавливаем секунды равными 0
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // Переводим оставшееся время в дни
            hours = Math.floor((t / (1000 * 60 * 60)) % 24), // Вычисляем оставшиеся часы
            minutes = Math.floor((t / 1000 / 60) % 60), // Вычисляем оставшиеся минуты
            seconds = Math.floor((t / 1000) % 60); // Вычисляем оставшиеся секунды
        }

        return {
              'total': t, // Общее время до конца
              'days': days, // Оставшиеся дни
              'hours': hours, // Оставшиеся часы
              'minutes': minutes, // Оставшиеся минуты
              'seconds': seconds // Оставшиеся секунды
        };
    }

    function getZero(num) { // Добавляет 0 перед однозначным числом
        if (num >= 0 && num < 10) {
            return `0${num}`; // Преобразует 5 в "05"
        } else {
            return num; // Возвращает число как есть
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector), // Таймер на странице
              days = timer.querySelector('#days'), // Блок для дней
              hours = timer.querySelector('#hours'), // Блок для часов
              minutes = timer.querySelector('#minutes'), // Блок для минут
              seconds = timer.querySelector('#seconds'), // Блок для секунд
              timeInterval = setInterval(updateClock, 1000); // Обновляем каждую секунду

          updateClock(); // Первичное обновление для устранения задержки

        function updateClock() { // Функция обновления значений таймера
            const t = getTimeRemaining(endtime); // Получаем оставшееся время

              days.textContent = getZero(t.days); // Записываем оставшиеся дни
              hours.textContent = getZero(t.hours); // Записываем оставшиеся часы
              minutes.textContent = getZero(t.minutes); // Записываем оставшиеся минуты
              seconds.textContent = getZero(t.seconds); // Записываем оставшиеся секунды

            if (t.total <= 0) { // Если время вышло
                clearInterval(timeInterval); // Останавливаем таймер
            }
        }
    }
    
      setClock('.timer', deadline); // Запускаем таймер с конечной датой
});

