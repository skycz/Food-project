window.addEventListener('DOMContentLoaded', function () {

    // Tabs

    let tabs = document.querySelectorAll('.tabheader__item'), // Получаем все элементы вкладок
        tabsContent = document.querySelectorAll('.tabcontent'), // Получаем все элементы контента вкладок
        tabsParent = document.querySelector('.tabheader__items'); // Родительский элемент вкладок

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide'); // Скрываем контент вкладки
            item.classList.remove('show', 'fade'); // Убираем классы отображения
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active'); // Убираем активный класс у вкладки
        });
    }

    function showTabContent(i = 0) { // Показываем первую вкладку по умолчанию
        tabsContent[i].classList.add('show', 'fade'); // Показываем контент вкладки
        tabsContent[i].classList.remove('hide'); // Убираем скрытие
        tabs[i].classList.add('tabheader__item_active'); // Добавляем активный класс текущей вкладке
    }

    hideTabContent(); // Изначально скрываем все вкладки
    showTabContent(); // Отображаем первую вкладку

    tabsParent.addEventListener('click', function (event) { // Обработчик клика на родительском элементе
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) { // Проверяем, был ли клик по вкладке
            tabs.forEach((item, i) => {
                if (target == item) { // Определяем, по какой вкладке кликнули
                    hideTabContent(); // Скрываем текущий контент
                    showTabContent(i); // Показываем контент выбранной вкладки
                }
            });
        }
    });

    // Timer

    const deadline = '2024-12-23'; // Устанавливаем дату окончания таймера

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), // Вычисляем оставшееся время
            days = Math.floor((t / (1000 * 60 * 60 * 24))), // Вычисляем оставшиеся дни
            seconds = Math.floor((t / 1000) % 60), // Вычисляем секунды
            minutes = Math.floor((t / 1000 / 60) % 60), // Вычисляем минуты
            hours = Math.floor((t / (1000 * 60 * 60) % 24)); // Вычисляем часы

        return {
            'total': t, // Общее количество времени
            'days': days, // Дни
            'hours': hours, // Часы
            'minutes': minutes, // Минуты
            'seconds': seconds // Секунды
        };
    }

    function getZero(num) { // Добавляем ноль перед числом, если оно меньше 10
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) { // Устанавливаем таймер на странице
        const timer = document.querySelector(selector), // Таймер на странице
            days = timer.querySelector("#days"), // Поле дней
            hours = timer.querySelector('#hours'), // Поле часов
            minutes = timer.querySelector('#minutes'), // Поле минут
            seconds = timer.querySelector('#seconds'), // Поле секунд
            timeInterval = setInterval(updateClock, 1000); // Интервал обновления таймера

        updateClock(); // Немедленное обновление таймера

        function updateClock() {
            const t = getTimeRemaining(endtime); // Получаем оставшееся время

            days.innerHTML = getZero(t.days); // Обновляем дни
            hours.innerHTML = getZero(t.hours); // Обновляем часы
            minutes.innerHTML = getZero(t.minutes); // Обновляем минуты
            seconds.innerHTML = getZero(t.seconds); // Обновляем секунды

            if (t.total <= 0) { // Если таймер завершился
                clearInterval(timeInterval); // Останавливаем обновление
            }
        }
    }

    setClock('.timer', deadline); // Запускаем таймер

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'), // Кнопки для открытия модального окна
        modal = document.querySelector('.modal'); // Само модальное окно

    modalTrigger.forEach(btn => { // Добавляем обработчик на каждую кнопку
        btn.addEventListener('click', openModal);
    });

    function closeModal() { // Функция закрытия модального окна
        modal.classList.add('hide'); // Скрываем модальное окно
        modal.classList.remove('show'); // Убираем класс показа
        document.body.style.overflow = ''; // Включаем прокрутку страницы
    }

    function openModal() { // Функция открытия модального окна
        modal.classList.add('show'); // Показываем модальное окно
        modal.classList.remove('hide'); // Убираем класс скрытия
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
        clearInterval(modalTimerId); // Очищаем таймер, чтобы окно не открылось повторно
    }

    modal.addEventListener('click', (e) => { // Закрытие модального окна при клике вне его области
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => { // Закрытие модального окна по нажатию клавиши Escape
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000); // Открываем окно через 50 секунд

    function showModalByScroll() { // Открытие модального окна при достижении конца страницы
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll); // Убираем обработчик после открытия окна
        }
    }
    window.addEventListener('scroll', showModalByScroll);

// Асинхронная функция для получения данных с сервера
const getResource = async (url) => {
    const res = await fetch(url); // Выполняем GET-запрос по указанному URL

    if (!res.ok) { // Проверяем статус ответа
        throw new Error(`Could not fetch ${url}, status: ${res.status}`); // Если ошибка, выбрасываем исключение
    }

    return await res.json(); // Парсим и возвращаем JSON-ответ
};

// Класс для создания карточек меню
class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src; // Путь к изображению
        this.alt = alt; // Альтернативный текст изображения
        this.title = title; // Заголовок карточки
        this.descr = descr; // Описание карточки
        this.price = price; // Цена
        this.classes = classes; // CSS-классы
        this.parent = document.querySelector(parentSelector); // Родительский элемент
        this.transfer = 27; // Курс валют
        this.changeToUAH(); // Преобразование цены в гривны
    }

    changeToUAH() {
        this.price = this.price * this.transfer; // Конвертация цены
    }

    render() {
        const element = document.createElement('div'); // Создаём контейнер для карточки

        if (this.classes.length === 0) { // Если классы не указаны
            this.classes = "menu__item"; // Применяем класс по умолчанию
            element.classList.add(this.classes); // Добавляем класс
        } else {
            this.classes.forEach(className => element.classList.add(className)); // Добавляем переданные классы
        }

        element.innerHTML = `
            <img src=${this.src} alt=${this.alt}> <!-- Изображение -->
            <h3 class="menu__item-subtitle">${this.title}</h3> <!-- Заголовок -->
            <div class="menu__item-descr">${this.descr}</div> <!-- Описание -->
            <div class="menu__item-divider"></div> <!-- Разделитель -->
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;
        this.parent.append(element); // Добавляем элемент в родителя
    }
}

// Получаем данные для карточек меню с сервера
getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({ img, altimg, title, descr, price }) => { // Перебираем данные
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // Создаём карточку
        });
    });

// Работа с формами
const forms = document.querySelectorAll('form'); // Получаем все формы
const message = {
    loading: 'img/form/spinner.svg', // Сообщение о загрузке
    success: 'Спасибо! Скоро мы с вами свяжемся', // Успешное сообщение
    failure: 'Что-то пошло не так...' // Сообщение об ошибке
};

forms.forEach(item => {
    bindPostData(item); // Привязываем обработчик к каждой форме
});

// Асинхронная функция для отправки данных на сервер
const postData = async (url, data) => {
    const res = await fetch(url, { // Выполняем POST-запрос
        method: 'POST', // Метод запроса
        headers: {
            'Content-type': 'application/json' // Указываем тип данных
        },
        body: data // Передаём тело запроса
    });

    return await res.json(); // Возвращаем ответ
};

// Функция обработки отправки формы
function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Отменяем стандартное поведение формы

        let statusMessage = document.createElement('img'); // Создаём изображение для статуса
        statusMessage.src = message.loading; // Устанавливаем путь к изображению
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage); // Добавляем изображение рядом с формой

        const formData = new FormData(form); // Собираем данные формы
        const json = JSON.stringify(Object.fromEntries(formData.entries())); // Преобразуем данные в JSON

        postData('http://localhost:3000/requests', json) // Отправляем данные на сервер
            .then(data => {
                console.log(data); // Логируем ответ сервера
                showThanksModal(message.success); // Показываем сообщение об успехе
                statusMessage.remove(); // Убираем индикатор загрузки
            }).catch(() => {
                showThanksModal(message.failure); // Показываем сообщение об ошибке
            }).finally(() => {
                form.reset(); // Сбрасываем форму
            });
    });
}

// Функция показа модального окна с сообщением
function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog'); // Находим текущее модальное окно

    prevModalDialog.classList.add('hide'); // Скрываем его
    openModal(); // Показываем модальное окно

    const thanksModal = document.createElement('div'); // Создаём новый контейнер для сообщения
    thanksModal.classList.add('modal__dialog'); // Применяем класс
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div> <!-- Кнопка закрытия -->
            <div class="modal__title">${message}</div> <!-- Сообщение -->
        </div>
    `;
    document.querySelector('.modal').append(thanksModal); // Добавляем элемент на страницу
    setTimeout(() => {
        thanksModal.remove(); // Убираем сообщение
        prevModalDialog.classList.add('show'); // Показываем прежнее окно
        prevModalDialog.classList.remove('hide');
        closeModal(); // Закрываем модальное окно
    }, 4000); // Таймер на 4 секунды
}

// Пример GET-запроса для проверки данных
fetch('http://localhost:3000/menu')
    .then(data => data.json()) // Парсим JSON
    .then(res => console.log(res)); // Логируем результат
});
