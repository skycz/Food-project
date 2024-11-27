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

    // Modal 

    const modalTrigger = document.querySelectorAll('[data-modal]'), // Кнопки открытия модального окна
        modal = document.querySelector('.modal'), // Модальное окно
        modalCloseBtn = document.querySelector('[data-close]'); // Кнопка закрытия окна

    function openModal() {
        modal.classList.add('show'); // Показываем модальное окно
        modal.classList.remove('hide'); // Убираем класс скрытия
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
        clearInterval(modalTimerId); // Убираем таймер открытия
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal); // Обработчик клика для кнопок открытия окна
    });

    function closeModal() {
        modal.classList.add('hide'); // Добавляем класс скрытия
        modal.classList.remove('show'); // Убираем класс показа
        document.body.style.overflow = ''; // Включаем прокрутку страницы
    }

    modalCloseBtn.addEventListener('click', closeModal); // Клик на кнопку закрытия

    modal.addEventListener('click', (e) => {
        if (e.target === modal) { // Проверка, что клик был за пределами окна
            closeModal(); // Закрываем окно
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { // Нажатие Escape
            closeModal(); // Закрываем окно
        }
    });

    const modalTimerId = setTimeout(openModal, 5000); // Автоматическое открытие через 5 секунд

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // Скролл до конца страницы
            openModal(); // Открываем окно
            window.removeEventListener('scroll', showModalByScroll); // Убираем обработчик
        }
    }

    window.addEventListener('scroll', showModalByScroll); // Открытие окна при прокрутке

    // Используем классы для создание карточек меню
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src; // Путь к изображению
            this.alt = alt; // Альтернативный текст для изображения
            this.title = title; // Заголовок карточки
            this.descr = descr; // Описание меню
            this.price = price; // Цена в долларах
            this.classes = classes; // Дополнительные CSS-классы
            this.parent = document.querySelector(parentSelector); // Родительский контейнер
            this.transfer = 27; // Курс доллара к гривне
            this.changeToUAH(); // Конвертация цены в гривны
        }

        changeToUAH() {
            this.price = this.price * this.transfer; // Перевод цены в гривны
        }

        render() {
            const element = document.createElement('div'); // Создаем карточку
            if (this.classes.length === 0) {
                this.element = 'menu__item'; // Класс по умолчанию
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className)); // Добавляем переданные классы
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
        `; // Заполняем карточку данными
            this.parent.append(element); // Добавляем карточку на страницу
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg", // Изображение
        "vegy",              // Альтернативный текст
        'Меню "Фитнес"',      // Заголовок
        'Меню ”Фитнес” - это новый подход к приготовлению блюд...', // Описание
        9,                   // Цена
        '.menu .container',  // Родительский контейнер
        'menu__item'         // Класс
    ).render(); // Создаем и отображаем карточку

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Премиум"',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки...',
        14,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов...',
        21,
        '.menu .container',
        'menu__item'
    ).render(); // 
    Добавляем еще карточки
});

