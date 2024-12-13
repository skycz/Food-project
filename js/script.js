// Импортируем модули, которые реализуют функциональность приложения
import tabs from './modules/tabs'; // Модуль управления табами (вкладками)
import modal from './modules/modal'; // Модуль управления модальными окнами
import timer from './modules/timer'; // Модуль таймера
import cards from './modules/cards'; // Модуль создания карточек меню
import calc from './modules/calc'; // Модуль калькулятора калорий
import forms from './modules/forms'; // Модуль отправки форм
import slider from './modules/slider'; // Модуль слайдера
import {openModal} from './modules/modal'; // Экспорт функции `openModal` для управления модальными окнами

// Запускаем выполнение скрипта только после полной загрузки DOM
window.addEventListener('DOMContentLoaded', function() {

    // Устанавливаем таймер для автоматического открытия модального окна через 50 секунд
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

    // Инициализируем работу вкладок (табы)
    // Аргументы:
    // - '.tabheader__item': селектор для табов (заголовков вкладок)
    // - '.tabcontent': селектор для контента вкладок
    // - '.tabheader__items': селектор для общего контейнера табов
    // - 'tabheader__item_active': класс активности для выбранной вкладки
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');

    // Инициализируем модальное окно
    // Аргументы:
    // - '[data-modal]': селектор для кнопок, которые открывают модальное окно
    // - '.modal': селектор самого модального окна
    // - modalTimerId: таймер, чтобы остановить автоматическое открытие окна, если оно уже было открыто
    modal('[data-modal]', '.modal', modalTimerId);

    // Инициализируем таймер обратного отсчёта
    // Аргументы:
    // - '.timer': селектор для контейнера таймера
    // - '2024-12-23': конечная дата для обратного отсчёта
    timer('.timer', '2024-12-23');

    // Инициализируем карточки меню
    // Этот модуль добавляет карточки с информацией из базы данных
    cards();

    // Инициализируем калькулятор калорий
    // Этот модуль позволяет пользователю рассчитывать калории
    calc();

    // Инициализируем обработку форм
    // Аргументы:
    // - 'form': селектор для всех форм на странице
    // - modalTimerId: передаём таймер для взаимодействия с модальным окном
    forms('form', modalTimerId);

    // Инициализируем слайдер
    // Аргументы передаются в виде объекта с параметрами:
    // - container: селектор для общего контейнера слайдера
    // - nextArrow: селектор кнопки "вперёд"
    // - prevArrow: селектор кнопки "назад"
    // - slide: селектор для каждого отдельного слайда
    // - totalCounter: селектор для общего количества слайдов
    // - currentCounter: селектор для текущего слайда
    // - wrapper: селектор для обёртки слайдера (контейнер видимой области)
    // - field: селектор для внутреннего контейнера слайдов
    slider({
        container: '.offer__slider', 
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });

});
