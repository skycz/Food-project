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
window.addEventListener('scroll', showModalByScroll); // Добавляем обработчик события прокрутки для отображения модального окна

// Используем классы для создание карточек меню
class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src; // Путь к изображению
        this.alt = alt; // Альтернативный текст изображения
        this.title = title; // Заголовок карточки
        this.descr = descr; // Описание карточки
        this.price = price; // Цена
        this.classes = classes; // Дополнительные CSS-классы
        this.parent = document.querySelector(parentSelector); // Родительский элемент для карточки
        this.transfer = 27; // Курс перевода валюты
        this.changeToUAH(); // Конвертируем цену в гривны
    }

    changeToUAH() {
        this.price = this.price * this.transfer; // Перевод цены в гривны
    }

    render() {
        const element = document.createElement('div'); // Создаем контейнер для карточки

        if (this.classes.length === 0) { // Если классы не переданы
            this.classes = "menu__item"; // Используем класс по умолчанию
            element.classList.add(this.classes);
        } else {
            this.classes.forEach(className => element.classList.add(className)); // Добавляем переданные классы
        }

        element.innerHTML = ` // Заполняем HTML-контент карточки
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;
        this.parent.append(element); // Добавляем карточку в родительский элемент
    }
}

// Загружаем данные меню с помощью axios
axios.get('http://localhost:3000/menu') // Выполняем запрос на получение данных с указанного URL
    .then(data => { 
        // Перебираем массив данных и создаём карточки меню
        data.data.forEach(({ img, altimg, title, descr, price }) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // Создание и рендеринг карточек меню
        });
    });

// Работа с формами
const forms = document.querySelectorAll('form'); // Выбираем все формы на странице
const message = {
    loading: 'img/form/spinner.svg', // Сообщение о загрузке (анимация)
    success: 'Спасибо! Скоро мы с вами свяжемся', // Сообщение об успешной отправке
    failure: 'Что-то пошло не так...' // Сообщение об ошибке
};

// Для каждой формы вызываем функцию обработки
forms.forEach(item => {
    bindPostData(item); // Привязываем обработчик событий
});

// Функция для отправки данных с помощью async/await (POST)
const postData = async (url, data) => {
    const res = await fetch(url, { 
        method: 'POST', // Метод POST
        headers: {
            'Content-type': 'application/json' // Устанавливаем заголовок Content-Type
        },
        body: data // Тело запроса в формате JSON
    });

    return await res.json(); // Возвращаем результат в формате JSON
};

// Функция для получения данных с помощью async/await (GET)
const getResource = async (url) => {
    const res = await fetch(url); // Выполняем GET-запрос

    if (!res.ok) { // Проверяем статус ответа
        throw new Error(`Could not fetch ${url}, status: ${res.status}`); // Бросаем ошибку, если ответ не успешен
    }

    return await res.json(); // Возвращаем результат в формате JSON
};

// Комментируем альтернативный способ загрузки данных меню через getResource
/*
getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({ img, altimg, title, descr, price }) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });
*/

// Функция привязки отправки данных формы
function bindPostData(form) {
    form.addEventListener('submit', (e) => { 
        e.preventDefault(); // Предотвращаем стандартное поведение браузера (перезагрузку)

        let statusMessage = document.createElement('img'); // Создаём элемент для отображения статуса
        statusMessage.src = message.loading; // Указываем путь к анимации загрузки
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage); // Добавляем анимацию под формой

        const formData = new FormData(form); // Создаём объект FormData из данных формы
        const json = JSON.stringify(Object.fromEntries(formData.entries())); // Преобразуем FormData в JSON

        postData('http://localhost:3000/requests', json) // Отправляем данные на сервер
            .then(data => {
                console.log(data); // Логируем ответ сервера
                showThanksModal(message.success); // Показываем сообщение об успешной отправке
                statusMessage.remove(); // Удаляем анимацию загрузки
            }).catch(() => {
                showThanksModal(message.failure); // Показываем сообщение об ошибке
            }).finally(() => {
                form.reset(); // Сбрасываем данные формы
            });
    });
}

// Функция для показа модального окна с благодарностью
function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog'); // Получаем текущее модальное окно

    prevModalDialog.classList.add('hide'); // Скрываем старое окно
    openModal(); // Открываем модальное окно

    const thanksModal = document.createElement('div'); // Создаём новое окно
    thanksModal.classList.add('modal__dialog'); // Добавляем класс
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector('.modal').append(thanksModal); // Вставляем новое окно в DOM

    setTimeout(() => {
        thanksModal.remove(); // Удаляем новое окно через 4 секунды
        prevModalDialog.classList.add('show'); // Возвращаем старое окно
        prevModalDialog.classList.remove('hide');
        closeModal(); // Закрываем модальное окно
    }, 4000);
}

// Получаем данные меню и логируем в консоль
fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));

// Слайдер
const slides = document.querySelectorAll('.offer__slide'), // Получаем все слайды
    prev = document.querySelector('.offer__slider-prev'), // Кнопка "назад"
    next = document.querySelector('.offer__slider-next'), // Кнопка "вперед"
    total = document.querySelector('#total'), // Общее количество слайдов
    current = document.querySelector('#current'); // Текущий номер слайда
let slideIndex = 1; // Индекс текущего слайда

showSlides(slideIndex); // Инициализируем показ слайдов

if (slides.length < 10) {
    total.textContent = `0${slides.length}`; // Если меньше 10 слайдов, добавляем ведущий 0
} else {
    total.textContent = slides.length; // В противном случае отображаем число
}

// Функция для показа слайдов
function showSlides(n) {
    if (n > slides.length) { 
        slideIndex = 1; // Возврат к первому слайду, если превышен индекс
    }

    if (n < 1) {
        slideIndex = slides.length; // Возврат к последнему слайду, если индекс меньше 1
    }

    slides.forEach(item => item.style.display = 'none'); // Скрываем все слайды

    slides[slideIndex - 1].style.display = 'block'; // Показываем текущий слайд

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`; // Если меньше 10, добавляем ведущий 0
    } else {
        current.textContent = slideIndex; // В противном случае отображаем число
    }
}

// Функция для перехода между слайдами
function plusSlides(n) {
    showSlides(slideIndex += n); // Изменяем индекс и показываем новый слайд
}

// Обработчики событий для кнопок "вперед" и "назад"
prev.addEventListener('click', () => {
    plusSlides(-1); // Переход на предыдущий слайд
});
next.addEventListener('click', () => {
    plusSlides(1); // Переход на следующий слайд
    });
});
