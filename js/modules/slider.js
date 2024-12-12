function slider() {
    // Инициализация переменных для слайдера

    let slideIndex = 1; // Текущий индекс слайда
    let offset = 0; // Сдвиг, который будет использоваться для показа слайдов

    // Получаем все необходимые элементы слайдера
    const slides = document.querySelectorAll('.offer__slide'), // Все слайды
        slider = document.querySelector('.offer__slider'), // Обертка слайдера
        prev = document.querySelector('.offer__slider-prev'), // Кнопка для перехода к предыдущему слайду
        next = document.querySelector('.offer__slider-next'), // Кнопка для перехода к следующему слайду
        total = document.querySelector('#total'), // Элемент для отображения общего количества слайдов
        current = document.querySelector('#current'), // Элемент для отображения текущего слайда
        slidesWrapper = document.querySelector('.offer__slider-wrapper'), // Обертка для слайдов
        slidesField = document.querySelector('.offer__slider-inner'), // Внутренний контейнер для слайдов
        width = window.getComputedStyle(slidesWrapper).width; // Ширина обертки слайдов

    // Инициализируем отображение общего числа слайдов и текущего слайда
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`; // Если слайдов меньше 10, добавляем ведущий ноль
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length; // Если слайдов 10 или больше, отображаем без ведущего нуля
        current.textContent = slideIndex;
    }

    // Устанавливаем ширину контейнера слайдов и включаем плавный переход
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex'; // Слайды расположены в одну строку
    slidesField.style.transition = '0.5s all'; // Плавный переход

    slidesWrapper.style.overflow = 'hidden'; // Скрываем все, что выходит за пределы обертки

    // Устанавливаем ширину для каждого слайда
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative'; // Устанавливаем относительное позиционирование для слайдера

    // Создаем индикаторы (точки) для слайдера
    const indicators = document.createElement('ol'), // Создаем элемент <ol> для индикаторов
        dots = []; // Массив для хранения точек (индивидуальных индикаторов)

    indicators.classList.add('carousel-indicators'); // Добавляем класс для стилизации индикаторов

    slider.append(indicators); // Добавляем индикаторы в слайдер

    // Создаем точки для каждого слайда и добавляем их в индикаторы
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li'); // Создаем элемент <li> для точки
        dot.classList.add('li-dot'); // Добавляем класс для стилизации точки
        dot.setAttribute('data-slide-to', i + 1); // Устанавливаем атрибут с номером слайда

        if (i == 0) {
            dot.classList.add('active'); // Первая точка будет активной
        }

        indicators.append(dot); // Добавляем точку в контейнер индикаторов
        dots.push(dot); // Добавляем точку в массив
    }

    // Функция для удаления всех нецифровых символов из строки
    function deleteNotDigits(str) {
        return +str.replace(/\D/g, ''); // Заменяем все нецифровые символы на пустую строку
    }

    // Функция для перемещения слайда
    function moveSlide(offset, slideIndex, slidesField, dots, current) {
        slidesField.style.transform = `translateX(-${offset}px)`; // Перемещаем слайды по оси X

        if (dots) {
            dots.forEach(dot => dot.style.opacity = '0.5'); // Уменьшаем прозрачность всех точек
            dots[slideIndex - 1].style.opacity = '1'; // Устанавливаем полную прозрачность для текущей точки
        }

        if (current) {
            current.textContent = slides.length < 10 ? `0${slideIndex}` : slideIndex; // Обновляем отображение текущего слайда
        }
    }

    // Обработчик для кнопки "next" (следующий слайд)
    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0; // Если мы на последнем слайде, возвращаемся к первому
        } else {
            offset += deleteNotDigits(width); // Переходим к следующему слайду
        }

        if (slideIndex == slides.length) {
            slideIndex = 1; // Если мы на последнем слайде, переходим к первому
        } else {
            slideIndex++; // Иначе просто увеличиваем индекс слайда
        }

        moveSlide(offset, slideIndex, slidesField, dots, current); // Перемещаем слайды
    });

    // Обработчик для кнопки "prev" (предыдущий слайд)
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1); // Если мы на первом слайде, переходим к последнему
        } else {
            offset -= deleteNotDigits(width); // Иначе просто уменьшаем сдвиг
        }

        if (slideIndex == 1) {
            slideIndex = slides.length; // Если мы на первом слайде, переходим к последнему
        } else {
            slideIndex--; // Иначе просто уменьшаем индекс слайда
        }

        moveSlide(offset, slideIndex, slidesField, dots, current); // Перемещаем слайды
    });

    // Обработчики для точек, чтобы перейти к соответствующему слайду
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slideIndex = index + 1; // Устанавливаем индекс слайда
            offset = deleteNotDigits(width) * index; // Вычисляем сдвиг для выбранного слайда
            moveSlide(offset, slideIndex, slidesField, dots, current); // Перемещаем слайды
        });
    });
}

// Экспортируем функцию для использования в других модулях
module.exports = slider;
