import {closeModal, openModal} from "./modal"; // Импортируем функции для управления модальным окном
import {postData} from "../services/services"; // Импортируем функцию для отправки данных на сервер

function forms(formSelector, modalTimerId) {
    // Forms (Обработка форм)

    // Находим все формы на странице, соответствующие переданному селектору
    const forms = document.querySelectorAll(formSelector);

    // Объект с сообщениями для различных состояний отправки формы
    const message = {
        loading: 'img/form/spinner.svg', // Индикатор загрузки
        success: 'Спасибо! Скоро мы с вами свяжемся', // Успешная отправка
        failure: 'Что-то пошло не так...' // Ошибка отправки
    };

    // Для каждой формы привязываем обработчик отправки данных
    forms.forEach(item => {
        bindPostData(item);
    });

    // Функция привязки обработчика отправки данных к форме
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Отменяем стандартное поведение формы (перезагрузку страницы)

            // Добавляем сообщение о статусе (спиннер загрузки)
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading; // Указываем путь к изображению
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage); // Размещаем сообщение под формой

            // Сбор данных из формы
            const formData = new FormData(form); // Создаём объект FormData
            const json = JSON.stringify(Object.fromEntries(formData.entries())); // Преобразуем данные в JSON

            // Отправляем данные на сервер с использованием функции `postData`
            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data); // Логируем данные, возвращённые сервером
                    showThanksModal(message.success); // Показываем сообщение об успешной отправке
                    statusMessage.remove(); // Удаляем спиннер
                }).catch(() => {
                    showThanksModal(message.failure); // Показываем сообщение об ошибке
                }).finally(() => {
                    form.reset(); // Очищаем форму в любом случае
                });
        });
    }

    // Функция для отображения модального окна с благодарностью или ошибкой
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog'); // Находим текущий диалог модального окна

        prevModalDialog.classList.add('hide'); // Скрываем текущий диалог
        openModal('.modal', modalTimerId); // Открываем модальное окно

        // Создаём новый диалог с сообщением
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div> <!-- Кнопка закрытия -->
                <div class="modal__title">${message}</div> <!-- Сообщение -->
            </div>
        `;

        // Добавляем новый диалог в модальное окно
        document.querySelector('.modal').append(thanksModal);

        // Через 4 секунды удаляем диалог благодарности и возвращаем прежний диалог
        setTimeout(() => {
            thanksModal.remove(); // Удаляем сообщение
            prevModalDialog.classList.add('show'); // Показываем предыдущий диалог
            prevModalDialog.classList.remove('hide'); // Убираем класс `hide`
            closeModal('.modal'); // Закрываем модальное окно
        }, 4000);
    }

    // Пример получения данных с сервера для проверки
    fetch('http://localhost:3000/menu')
        .then(data => data.json()) // Преобразуем данные в JSON
        .then(res => console.log(res)); // Логируем данные для проверки
}

// Экспортируем функцию для использования в других модулях
export default forms;
