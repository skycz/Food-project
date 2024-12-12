window.addEventListener('DOMContentLoaded', function () {
    // Добавляем обработчик события, который срабатывает, когда весь контент страницы загружен (DOMContentLoaded)
window.addEventListener('DOMContentLoaded', function () {

    // Импортируем различные модули, каждый из которых решает свою задачу в приложении
    const tabs = require('./modules/tabs'), // Модуль для вкладок
          modal = require('./modules/modal'), // Модуль для модальных окон
          timer = require('./modules/timer'), // Модуль для таймера
          cards = require('./modules/cards'), // Модуль для карточек с контентом
          calc = require('./modules/calc'), // Модуль для калькулятора
          forms = require('./modules/forms'), // Модуль для обработки форм
          slider = require('./modules/slider'); // Модуль для слайдера изображений

    // Вызываем функции для каждого модуля, чтобы они начали свою работу на странице
    tabs(); // Инициализация вкладок
    modal(); // Инициализация модальных окон
    timer(); // Инициализация таймера
    cards(); // Инициализация карточек
    calc(); // Инициализация калькулятора
    forms(); // Инициализация обработки форм
    slider(); // Инициализация слайдера
});
