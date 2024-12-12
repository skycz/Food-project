function modal() {
    // Модальные окна

    // Получаем все элементы с атрибутом data-modal (кнопки для открытия модального окна)
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        // Находим само модальное окно
        modal = document.querySelector('.modal');

    // Добавляем обработчик событий для каждой кнопки, которая открывает модальное окно
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // Функция для закрытия модального окна
    function closeModal() {
        modal.classList.add('hide');  // Добавляем класс hide, который скрывает модальное окно
        modal.classList.remove('show');  // Убираем класс show, который делает окно видимым
        document.body.style.overflow = '';  // Восстанавливаем прокрутку страницы
    }

    // Функция для открытия модального окна
    function openModal() {
        modal.classList.add('show');  // Добавляем класс show, который отображает окно
        modal.classList.remove('hide');  // Убираем класс hide
        document.body.style.overflow = 'hidden';  // Блокируем прокрутку страницы при открытом модальном окне
        clearInterval(modalTimerId);  // Если окно открылось вручную, отменяем автоматическое открытие через заданное время
    }

    // Обработчик событий для закрытия модального окна при клике на область за пределами окна или на кнопку закрытия
    modal.addEventListener('click', (e) => {
        // Если клик был по самому модальному окну или по кнопке закрытия (data-close), закрываем окно
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    // Обработчик события нажатия клавиши, чтобы закрыть окно при нажатии Escape
    document.addEventListener('keydown', (e) => {
        // Если нажата клавиша Escape и модальное окно открыто, закрываем его
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Таймер для автоматического открытия модального окна через 50 секунд
    const modalTimerId = setTimeout(openModal, 50000);
    // Изменил значение времени, чтобы оно не отвлекало пользователя

    // Функция для открытия модального окна при прокрутке страницы до конца
    function showModalByScroll() {
        // Проверяем, если пользователь прокрутил страницу до конца (документ полностью виден)
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();  // Открываем модальное окно
            window.removeEventListener('scroll', showModalByScroll);  // Убираем обработчик события, чтобы окно открылось только один раз
        }
    }
    // Добавляем обработчик события scroll, чтобы открыть окно при прокрутке до конца страницы
    window.addEventListener('scroll', showModalByScroll);
}

// Экспортируем функцию для использования в других модулях
module.exports = modal;
