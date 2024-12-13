function closeModal(modalSelector) {
    // Функция для закрытия модального окна
    const modal = document.querySelector(modalSelector); // Находим модальное окно по селектору

    modal.classList.add('hide'); // Добавляем класс `hide` для скрытия окна
    modal.classList.remove('show'); // Удаляем класс `show`, если он есть
    document.body.style.overflow = ''; // Возвращаем прокрутку страницы
}

function openModal(modalSelector, modalTimerId) {
    // Функция для открытия модального окна
    const modal = document.querySelector(modalSelector); // Находим модальное окно по селектору

    modal.classList.add('show'); // Добавляем класс `show` для отображения окна
    modal.classList.remove('hide'); // Удаляем класс `hide`, если он есть
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы

    console.log(modalTimerId); // Логируем ID таймера (для отладки)
    if (modalTimerId) {
        clearInterval(modalTimerId); // Останавливаем таймер, если он активен
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Основная функция для управления модальным окном

    const modalTrigger = document.querySelectorAll(triggerSelector), // Находим все элементы, которые открывают модальное окно
        modal = document.querySelector(modalSelector); // Находим само модальное окно

    modalTrigger.forEach(btn => {
        // Для каждой кнопки открытия модального окна добавляем обработчик события
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        // Закрываем модальное окно при клике на область вне окна или на кнопку с атрибутом `data-close`
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        // Закрываем модальное окно при нажатии клавиши "Escape", если окно открыто
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    // Функция для автоматического показа модального окна при прокрутке страницы до конца
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId); // Открываем модальное окно
            window.removeEventListener('scroll', showModalByScroll); // Удаляем обработчик, чтобы окно больше не открывалось
        }
    }

    window.addEventListener('scroll', showModalByScroll); // Добавляем обработчик события на прокрутку
}

export default modal; // Экспортируем основную функцию `modal` по умолчанию
export {closeModal, openModal}; // Экспортируем функции
