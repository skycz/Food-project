function timer() {
    // Таймер для отсчета до определенной даты
    const deadline = '2024-12-23'; // Конечная дата для таймера

    // Функция для получения оставшегося времени
    function getTimeRemaining(endtime) {
        // Вычисляем разницу между конечной датой и текущим временем
        const t = Date.parse(endtime) - Date.parse(new Date()),
            // Вычисляем количество оставшихся дней
            days = Math.floor((t / (1000 * 60 * 60 * 24))),
            // Вычисляем оставшиеся секунды
            seconds = Math.floor((t / 1000) % 60),
            // Вычисляем оставшиеся минуты
            minutes = Math.floor((t / 1000 / 60) % 60),
            // Вычисляем оставшиеся часы
            hours = Math.floor((t / (1000 * 60 * 60) % 24));

        return {
            'total': t,  // Общая разница во времени
            'days': days, // Оставшиеся дни
            'hours': hours, // Оставшиеся часы
            'minutes': minutes, // Оставшиеся минуты
            'seconds': seconds // Оставшиеся секунды
        };
    }

    // Функция для добавления нуля перед числами меньше 10 (например, 5 -> 05)
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return '0' + num; // Добавляем ноль, если число от 0 до 9
        } else {
            return num; // Возвращаем число, если оно больше 9
        }
    }

    // Основная функция для установки таймера на странице
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector), // Элемент, куда будет выводиться таймер
            days = timer.querySelector("#days"), // Элемент для отображения оставшихся дней
            hours = timer.querySelector('#hours'), // Элемент для отображения оставшихся часов
            minutes = timer.querySelector('#minutes'), // Элемент для отображения оставшихся минут
            seconds = timer.querySelector('#seconds'), // Элемент для отображения оставшихся секунд
            // Устанавливаем интервал обновления таймера каждую секунду
            timeInterval = setInterval(updateClock, 1000);

        updateClock(); // Сразу запускаем обновление таймера при первой загрузке страницы

        // Функция для обновления значений таймера
        function updateClock() {
            const t = getTimeRemaining(endtime); // Получаем оставшееся время

            // Обновляем содержимое элементов с днями, часами, минутами и секундами
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            // Если время вышло (общее время <= 0), останавливаем таймер
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    // Запускаем таймер с указанным селектором и конечной датой
    setClock('.timer', deadline);
}

// Экспортируем функцию, чтобы использовать её в других частях программы
module.exports = timer;
