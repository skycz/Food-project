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

    // Используем классы для создание карточек меню

    class MenuCard { // Создаем класс для карточек
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src; // Источник изображения
            this.alt = alt; // Альтернативный текст
            this.title = title; // Заголовок
            this.descr = descr; // Описание
            this.price = price; // Цена
            this.classes = classes; // Дополнительные классы
            this.parent = document.querySelector(parentSelector); // Родительский элемент
            this.transfer = 27; // Курс конвертации
            this.changeToUAH(); // Конвертация цены в гривны
        }

        changeToUAH() { // Конвертация валюты
            this.price = this.price * this.transfer;
        }

        render() { // Рендеринг карточки на страницу
            const element = document.createElement('div');

            if (this.classes.length === 0) { // Если классы не переданы
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
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
            `;
            this.parent.append(element);
        }
    }

    // Создаем экземпляры карточек меню
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container"
    ).render();

    // Forms

const forms = document.querySelectorAll('form'); // Получаем все формы на странице
const message = { // Объект для хранения сообщений
    loading: 'img/form/spinner.svg', // Путь к изображению спиннера загрузки
    success: 'Спасибо! Скоро мы с вами свяжемся', // Сообщение об успешной отправке
    failure: 'Что-то пошло не так...' // Сообщение об ошибке
};

forms.forEach(item => { 
    postData(item); // Для каждой формы вызываем функцию отправки данных
});

function postData(form) {
    form.addEventListener('submit', (e) => { 
        e.preventDefault(); // Отменяем стандартное поведение формы (перезагрузку страницы)

        let statusMessage = document.createElement('img'); // Создаем элемент img для отображения статуса
        statusMessage.src = message.loading; // Устанавливаем изображение загрузки
        statusMessage.style.cssText = ` 
            display: block; 
            margin: 0 auto; 
        `; // Центрируем изображение
        form.insertAdjacentElement('afterend', statusMessage); // Добавляем спиннер после формы

        const request = new XMLHttpRequest(); // Создаем новый XMLHttpRequest
        request.open('POST', 'server.php'); // Настраиваем запрос: метод POST и адрес
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); // Устанавливаем заголовок для JSON
        const formData = new FormData(form); // Собираем данные формы

        const object = {}; // Создаем объект для хранения данных формы
        formData.forEach(function (value, key) {
            object[key] = value; // Переносим данные из FormData в объект
        });
        const json = JSON.stringify(object); // Преобразуем объект в JSON-строку

        request.send(json); // Отправляем JSON на сервер

        request.addEventListener('load', () => { 
            if (request.status === 200) { // Проверяем успешность ответа
                console.log(request.response); // Логируем ответ сервера
                showThanksModal(message.success); // Показываем сообщение об успехе
                statusMessage.remove(); // Убираем спиннер
                form.reset(); // Сбрасываем форму
            } else { 
                showThanksModal(message.failure); // Показываем сообщение об ошибке
            }
        });
    });
}

// ShowThanksModal

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog'); // Находим текущий модальный диалог

    prevModalDialog.classList.add('hide'); // Скрываем его
    openModal(); // Открываем модальное окно

    const thanksModal = document.createElement('div'); // Создаем новый div для сообщения
    thanksModal.classList.add('modal__dialog'); // Добавляем класс для оформления
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div> 
            <div class="modal__title">${message}</div> 
        </div>
    `; // Устанавливаем содержимое нового модального окна
    document.querySelector('.modal').append(thanksModal); // Добавляем новый диалог в модальное окно
    setTimeout(() => { 
        thanksModal.remove(); // Убираем сообщение через 4 секунды
        prevModalDialog.classList.add('show'); // Показываем старый диалог
        prevModalDialog.classList.remove('hide'); // Убираем класс скрытия
        closeModal(); // Закрываем модальное окно
    }, 4000);
    }
});
