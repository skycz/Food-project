function forms() {
    // Сбор всех форм на странице
    const forms = document.querySelectorAll('form');

    // Сообщения для различных состояний формы (loading, success, failure)
    const message = {
        loading: 'img/form/spinner.svg',  // Путь к изображению для загрузки
        success: 'Спасибо! Скоро мы с вами свяжемся',  // Сообщение об успешной отправке
        failure: 'Что-то пошло не так...'  // Сообщение о неудачной отправке
    };

    // Применение обработчика к каждой форме на странице
    forms.forEach(item => {
        bindPostData(item);
    });

    // Функция для отправки данных методом POST с использованием async/await
    const postData = async (url, data) => {
        // Отправка данных на сервер с использованием fetch
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'  // Устанавливаем тип контента как JSON
            },
            body: data  // Данные, которые мы отправляем
        });

        // Получаем ответ в формате JSON
        return await res.json();
    };

    // Функция для получения данных методом GET с использованием async/await
    const getResource = async (url) => {
        // Запрос данных с сервера
        const res = await fetch(url);

        // Проверка на успешность запроса
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        // Возвращаем полученные данные в формате JSON
        return await res.json();
    };

    // Пример использования функции getResource для получения данных меню
    /* getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        }); */

    // Функция для привязки обработчика отправки данных формы
    function bindPostData(form) {
        // Обработчик на событие submit для каждой формы
        form.addEventListener('submit', (e) => {
            e.preventDefault();  // Отменяем стандартное поведение формы

            // Создаем элемент для отображения сообщения о загрузке
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;  // Источник изображения
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // Вставляем это сообщение после формы
            form.insertAdjacentElement('afterend', statusMessage);

            // Получаем данные из формы
            const formData = new FormData(form);

            // Преобразуем данные формы в JSON
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // Отправляем данные на сервер
            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);  // Логируем ответ от сервера
                    // Показать модальное окно с успехом
                    showThanksModal(message.success);
                    statusMessage.remove();  // Убираем сообщение о загрузке
                }).catch(() => {
                    // Показать модальное окно с ошибкой
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();  // Очищаем форму после отправки
                });
        });
    }

    // Функция для отображения модального окна с сообщением об успехе или ошибке
    function showThanksModal(message) {
        // Находим предыдущий модальный диалог
        const prevModalDialog = document.querySelector('.modal__dialog');

        // Скрываем старый диалог
        prevModalDialog.classList.add('hide');
        openModal();  // Открываем модальное окно

        // Создаем новый модальный диалог с сообщением
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        // Вставляем новый модальный диалог в модальное окно
        document.querySelector('.modal').append(thanksModal);

        // Убираем новое окно спустя 4 секунды и восстанавливаем старое окно
        setTimeout(() => {
            thanksModal.remove();  // Удаляем новое модальное окно
            prevModalDialog.classList.add('show');  // Восстанавливаем старое окно
            prevModalDialog.classList.remove('hide');
            closeModal();  // Закрываем модальное окно
        }, 4000);
    }

    // Получаем данные с сервера (пример использования fetch)
    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));  // Логируем полученные данные
}

// Экспортируем функцию для использования в других модулях
module.exports = forms;
