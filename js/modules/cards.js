import {getResource} from "../services/services";

function cards() {
    // Используем классы для создания карточек меню

    // Определение класса MenuCard для представления карточек
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src; // Путь к изображению
            this.alt = alt; // Альтернативный текст для изображения
            this.title = title; // Заголовок карточки
            this.descr = descr; // Описание карточки
            this.price = price; // Цена карточки
            this.classes = classes; // Дополнительные CSS-классы
            this.parent = document.querySelector(parentSelector); // Родительский контейнер
            this.transfer = 27; // Курс валюты (доллары в гривны)
            this.changeToUAH(); // Конвертация цены в гривны
        }

        // Метод для конвертации цены в гривны
        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        // Метод для отрисовки карточки в DOM
        render() {
            // Создаём новый элемент `div`
            const element = document.createElement('div');

            // Если дополнительные классы не указаны, устанавливаем класс по умолчанию
            if (this.classes.length === 0) {
                this.classes = "menu__item"; // Класс по умолчанию
                element.classList.add(this.classes);
            } else {
                // Если указаны, добавляем их к элементу
                this.classes.forEach(className => element.classList.add(className));
            }

            // Добавляем HTML-разметку для карточки
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

            // Вставляем карточку в родительский контейнер
            this.parent.append(element);
        }
    }

    // Получаем данные с сервера
    getResource('http://localhost:3000/menu')
        .then(data => {
            // Проходимся по массиву данных с сервера
            data.data.forEach(({
                img,       // Путь к изображению
                altimg,    // Альтернативный текст
                title,     // Заголовок
                descr,     // Описание
                price      // Цена
            }) => {
                // Создаём новую карточку и рендерим её
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

// Экспортируем функцию для использования в других модулях
export default cards;
