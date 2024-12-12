// Основная функция для расчета калорий
function calc() {
    // Получаем элемент, где будет отображаться результат
    const result = document.querySelector('.calculating__result span');

    // Объявляем переменные для пола, роста, веса, возраста и коэффициента активности
    let sex, height, weight, age, ratio;

    // Проверяем, есть ли данные о поле в localStorage, если нет — устанавливаем дефолтное значение
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female'; // по умолчанию женский пол
        localStorage.setItem('sex', 'female'); // сохраняем в localStorage
    }

    // Проверяем, есть ли данные о коэффициенте активности в localStorage, если нет — устанавливаем дефолтное значение
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = '1.375'; // коэффициент для умеренной активности
        localStorage.setItem('ratio', 1.375); // сохраняем в localStorage
    }

    // Функция для инициализации настроек из localStorage
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector); // находим все элементы по селектору

        elements.forEach(elem => {
            elem.classList.remove(activeClass); // удаляем активный класс у всех элементов

            // Если элемент соответствует значению в localStorage, добавляем активный класс
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    // Инициализируем настройки для пола и коэффициента активности
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    // Функция для расчета итогового значения
    function calcTotal() {
        // Проверяем, что все данные введены
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____'; // Если не хватает данных, показываем "____"
            return;
        }

        // Формула для расчета калорий в зависимости от пола
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    // Выполняем расчет сразу при загрузке
    calcTotal();

    // Функция для получения статической информации (пол и коэффициент активности)
    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector); // находим все элементы по селектору

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => { // добавляем обработчик события при клике
                if (e.target.getAttribute('data-ratio')) { // если был клик по коэффициенту
                    ratio = +e.target.getAttribute('data-ratio'); // сохраняем коэффициент
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); // сохраняем в localStorage
                } else { // если был клик по полу
                    sex = e.target.getAttribute('id'); // сохраняем пол
                    localStorage.setItem('sex', e.target.getAttribute('id')); // сохраняем в localStorage
                }

                // Убираем активный класс у всех элементов
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                // Добавляем активный класс для выбранного элемента
                e.target.classList.add(activeClass);

                // Перерасчитываем итоговое значение
                calcTotal();
            });
        });
    }

    // Инициализируем обработчики для выбора пола и коэффициента активности
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    // Функция для получения динамической информации (ввод данных пользователем)
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector); // находим input по селектору

        input.addEventListener('input', () => { // добавляем обработчик события при вводе данных

            // Если введено не число, делаем рамку красной
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none'; // если введено число, убираем красную рамку
            }

            // Сохраняем значения для роста, веса и возраста
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value; // сохраняем рост
                    break;
                case 'weight':
                    weight = +input.value; // сохраняем вес
                    break;
                case 'age':
                    age = +input.value; // сохраняем возраст
                    break;
            }

            // Перерасчитываем итоговое значение
            calcTotal();
        });
    }

    // Инициализируем обработчики для ввода роста, веса и возраста
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

// Экспортируем функцию для использования в других модулях
module.exports = calc;
