function calc() {
    // Калькулятор для подсчёта калорийности или другой информации на основе параметров пользователя

    // Результат выводится в контейнер с этим селектором
    const result = document.querySelector('.calculating__result span');

    // Переменные для хранения пользовательских данных
    let sex, height, weight, age, ratio;

    // Проверка наличия данных о поле в LocalStorage
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex'); // Если есть, используем значение из LocalStorage
    } else {
        sex = 'female'; // По умолчанию женский пол
        localStorage.setItem('sex', 'female'); // Сохраняем в LocalStorage
    }

    // Проверка наличия коэффициента активности в LocalStorage
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio'); // Если есть, используем значение из LocalStorage
    } else {
        ratio = '1.375'; // По умолчанию коэффициент низкой активности
        localStorage.setItem('ratio', 1.375); // Сохраняем в LocalStorage
    }

    // Функция инициализации локальных настроек на основе данных из LocalStorage
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass); // Убираем активный класс у всех элементов

            // Добавляем активный класс элементу, который совпадает с сохранённым значением
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    // Инициализация активных настроек для пола и коэффициента активности
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    // Основная функция расчёта результата
    function calcTotal() {
        // Если какие-либо данные отсутствуют, выводим пустое значение
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        // Расчёт калорийности в зависимости от пола
        if (sex === 'female') {
            // Формула для женщин
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            // Формула для мужчин
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    // Вызов расчёта при загрузке страницы
    calcTotal();

    // Функция для обработки кликов по статическим элементам (пол и коэффициент активности)
    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                // Проверяем, кликают ли на элемент с атрибутом data-ratio
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio'); // Сохраняем коэффициент
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); // Записываем в LocalStorage
                } else {
                    sex = e.target.getAttribute('id'); // Сохраняем пол
                    localStorage.setItem('sex', e.target.getAttribute('id')); // Записываем в LocalStorage
                }

                // Обновляем классы активности
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal(); // Пересчитываем результат
            });
        });
    }

    // Установка обработчиков для элементов пола и коэффициента активности
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    // Функция для обработки ввода динамических данных (рост, вес, возраст)
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            // Проверяем, содержит ли ввод нечисловые символы
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red'; // Если да, делаем красную рамку
            } else {
                input.style.border = 'none'; // Если нет, убираем рамку
            }

            // Сохраняем введённые данные в соответствующие переменные
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal(); // Пересчитываем результат
        });
    }

    // Установка обработчиков для ввода данных
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

// Экспортируем функцию для использования в других модулях
export default calc;
