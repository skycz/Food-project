function timer(id, deadline) {
    // Timer - Функция для реализации таймера, отсчитывающего время до заданной даты

    // Функция для получения оставшегося времени
    function getTimeRemaining(endtime) {
        // Разница между конечной датой и текущей датой в миллисекундах
        const t = Date.parse(endtime) - Date.parse(new Date()),

            // Вычисляем количество оставшихся дней
            days = Math.floor((t / (1000 * 60 * 60 * 24))),

            // Вычисляем оставшиеся секунды
            seconds = Math.floor((t / 1000) % 60),

            // Вычисляем оставшиеся минуты
            minutes = Math.floor((t / 1000 / 60) % 60),

            // Вычисляем оставшиеся часы
            hours = Math.floor((t / (1000 * 60 * 60) % 24));

        // Возвращаем объект с оставшимися днями, часами, минутами, секундами и общей оставшейся суммой времени
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // Функция для добавления нуля к числу, если оно меньше 10
    function getZero(num) {
        // Если число от 0 до 9, добавляем перед числом "0"
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    // Функция для установки таймера на странице
    function setClock(selector, endtime) {

        // Находим контейнер таймера по переданному селектору
        const timer = document.querySelector(selector),

            // Находим элементы, в которых будет отображаться количество дней, часов, минут и секунд
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),

            // Запускаем обновление таймера каждую секунду
            timeInterval = setInterval(updateClock, 1000);

        // Обновляем таймер сразу при запуске
        updateClock();

        // Функция для обновления значений времени в реальном времени
        function updateClock() {
            // Получаем оставшееся время
            const t = getTimeRemaining(endtime);

            // Обновляем содержимое каждого элемента с временем
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            // Если оставшееся время меньше или равно нулю, останавливаем таймер
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    // Устанавливаем таймер с указанным ID на странице и заданной датой
    setClock(id, deadline);
}

export default timer; // Экспортируем функцию таймера для использования в других частях приложения
