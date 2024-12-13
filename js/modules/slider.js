function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // Slider 2 - Функция для создания слайдера

    let slideIndex = 1; // Индекс текущего слайда
    let offset = 0; // Смещение для перемещения слайдов

    const slides = document.querySelectorAll(slide), // Все слайды
        slider = document.querySelector(container), // Обёртка слайдера
        prev = document.querySelector(prevArrow), // Кнопка "предыдущий слайд"
        next = document.querySelector(nextArrow), // Кнопка "следующий слайд"
        total = document.querySelector(totalCounter), // Элемент для отображения общего числа слайдов
        current = document.querySelector(currentCounter), // Элемент для отображения текущего номера слайда
        slidesWrapper = document.querySelector(wrapper), // Обёртка для слайдов
        slidesField = document.querySelector(field), // Контейнер для всех слайдов
        width = window.getComputedStyle(slidesWrapper).width; // Ширина обёртки слайдов (из CSS)

    // Инициализация счетчиков слайдов
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`; // Если слайдов меньше 10, добавляем ведущий ноль
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    // Настройка стилей для слайдов
    slidesField.style.width = 100 * slides.length + '%'; // Общая ширина всех слайдов
    slidesField.style.display = 'flex'; // Располагаем слайды в ряд
    slidesField.style.transition = '0.5s all'; // Плавный переход при изменении

    slidesWrapper.style.overflow = 'hidden'; // Прячем лишние слайды (за пределами обёртки)

    // Устанавливаем ширину для каждого слайда
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative'; // Устанавливаем относительное позиционирование для слайдера

    // Создаем индикаторы (точки для переключения слайдов)
    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    // Создаем точки для каждого слайда
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('li-dot');
        dot.setAttribute('data-slide-to', i + 1); // Каждой точке присваиваем атрибут для перехода к слайду

        if (i == 0) {
            dot.classList.add('active'); // Делаем первую точку активной
        }

        indicators.append(dot);
        dots.push(dot); // Добавляем точку в массив
    }

    // Функция для удаления всех нецифровых символов из строки
    function deleteNotDigits(str) {
        return +str.replace(/\D/g, ''); // Убираем все символы, кроме цифр
    }

    // Функция для перемещения слайда
    function moveSlide(offset, slideIndex, slidesField, dots, current) {
        slidesField.style.transform = `translateX(-${offset}px)`; // Перемещаем слайды по оси X

        if (dots) {
            dots.forEach(dot => dot.style.opacity = '0.5'); // Меняем прозрачность точек
            dots[slideIndex - 1].style.opacity = '1'; // Подсвечиваем активную точку
        }

        if (current) {
            current.textContent = slides.length < 10 ? `0${slideIndex}` : slideIndex; // Обновляем номер текущего слайда
        }
    }

    // Обработчик клика на кнопку "следующий слайд"
    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0; // Если мы на последнем слайде, возвращаемся к первому
        } else {
            offset += deleteNotDigits(width); // Увеличиваем смещение на ширину одного слайда
        }

        if (slideIndex == slides.length) {
            slideIndex = 1; // Если мы на последнем слайде, переходим на первый
        } else {
            slideIndex++; // Иначе увеличиваем индекс слайда
        }

        moveSlide(offset, slideIndex, slidesField, dots, current); // Перемещаем слайд
    });

    // Обработчик клика на кнопку "предыдущий слайд"
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1); // Если мы на первом слайде, переходим к последнему
        } else {
            offset -= deleteNotDigits(width); // Уменьшаем смещение на ширину одного слайда
        }

        if (slideIndex == 1) {
            slideIndex = slides.length; // Если мы на первом слайде, переходим на последний
        } else {
            slideIndex--; // Иначе уменьшаем индекс слайда
        }

        moveSlide(offset, slideIndex, slidesField, dots, current); // Перемещаем слайд
    });

    // Обработчик клика на точку (индикатор слайда)
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slideIndex = index + 1; // Устанавливаем индекс слайда, соответствующий точке
            offset = deleteNotDigits(width) * index; // Устанавливаем смещение для выбранного слайда
            moveSlide(offset, slideIndex, slidesField, dots, current); // Перемещаем слайд
        });
    });
}

export default slider; // Экспортируем функцию слайдера по умолчанию
