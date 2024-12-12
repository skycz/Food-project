// Основная функция для создания карточек меню
function cards() {
    // Класс для создания карточек меню
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            // Инициализация свойств объекта
            this.src = src; // Путь к изображению
            this.alt = alt; // Атрибут alt для изображения
            this.title = title; // Заголовок карточки
            this.descr = descr; // Описание карточки
            this.price = price; // Цена
            this.classes = classes; // Дополнительные классы для элемента
            this.parent = document.querySelector(parentSelector); // Родительский элемент для добавления карточки
            this.transfer = 27; // Константа для перевода цены в другую валюту (например, UAH)
            this.changeToUAH(); // Переводим цену в гривны
        }

        // Метод для перевода цены в гривны
        changeToUAH() {
            this.price = this.price * this.transfer; // Умножаем цену на коэффициент
        }

        // Метод для рендеринга карточки и добавления её на страницу
        render() {
            const element = document.createElement('div'); // Создаем новый div для карточки

            // Если классов не передано, устанавливаем дефолтное значение
            if (this.classes.length === 0) {
                this.classes = "menu__item"; // По умолчанию добавляем класс 'menu__item'
                element.classList.add(this.classes); // Добавляем класс
            } else {
                // Если классы переданы, добавляем их ко всем
                this.classes.forEach(className => element.classList.add(className));
            }

            // Вставляем разметку в элемент
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}> <!-- Добавляем изображение -->
                <h3 class="menu__item-subtitle">${this.title}</h3> <!-- Заголовок -->
                <div class="menu__item-descr">${this.descr}</div> <!-- Описание -->
                <div class="menu__item-divider"></div> <!-- Разделитель -->
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div> <!-- Метка для цены -->
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div> <!-- Отображаем цену -->
                </div>
            `;
            this.parent.append(element); // Добавляем элемент на страницу
        }
    }

    // Используем библиотеку Axios для получения данных с сервера
    axios.get('http://localhost:3000/menu') // Получаем данные с сервера
        .then(data => {
            // Перебираем полученные данные и создаем карточки меню
            data.data.forEach(({
                img,    // Изображение
                altimg, // Атрибут alt для изображения
                title,  // Заголовок
                descr,  // Описание
                price   // Цена
            }) => {
                // Для каждой записи создаем новый объект MenuCard и рендерим её на страницу
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

// Экспортируем функцию, чтобы её можно было использовать в других модулях
module.exports = cards;
