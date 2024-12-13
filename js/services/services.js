// Функция для отправки POST-запроса с использованием async/await
const postData = async (url, data) => {
    // Используем fetch API для отправки POST-запроса на указанный URL
    const res = await fetch(url, {
        method: 'POST',  // Метод HTTP-запроса (POST)
        headers: {
            'Content-type': 'application/json'  // Указываем тип содержимого, что это JSON
        },
        body: data  // Отправляем данные в теле запроса
    });

    // Ждем ответа от сервера и возвращаем результат в формате JSON
    return await res.json();
};

// Функция для отправки GET-запроса с использованием async/await
const getResource = async (url) => {
    // Используем fetch API для отправки GET-запроса на указанный URL
    const res = await fetch(url);

    // Проверяем, если ответ не успешный, выбрасываем ошибку
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    // Ждем ответа от сервера и возвращаем результат в формате JSON
    return await res.json();
}

// Экспортируем обе функции для использования в других частях приложения
export {postData};
export {getResource};
