function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // Tabs - Функция для реализации вкладок (табов)

    // Получаем все вкладки, контент вкладок и родительский элемент вкладок из DOM
    let tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    // Функция для скрытия контента всех вкладок
    function hideTabContent() {

        // Скрываем все элементы контента вкладок, добавляем класс 'hide' и убираем 'show', 'fade'
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        // Убираем активный класс с всех вкладок
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    // Функция для отображения контента вкладки по индексу (по умолчанию 0)
    function showTabContent(i = 0) {
        // Показываем контент вкладки, добавляем классы 'show' и 'fade', удаляем 'hide'
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        
        // Добавляем активный класс на выбранную вкладку
        tabs[i].classList.add(activeClass);
    }

    // Сначала скрываем все вкладки и показываем первую вкладку
    hideTabContent();
    showTabContent();

    // Добавляем обработчик событий на родительский элемент вкладок
    tabsParent.addEventListener('click', function(event) {
        // Определяем, по какой вкладке был клик
        const target = event.target;
        
        // Проверяем, является ли кликнутая цель одной из вкладок
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            // Если да, то для каждой вкладки сравниваем кликнутую вкладку с текущей
            tabs.forEach((item, i) => {
                if (target == item) {
                    // Скрываем все вкладки и показываем выбранную
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs; // Экспортируем функцию для использования в других частях приложения
