document.getElementById('inputDataForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    // Получаем данные формы
    var formData = new FormData(this);
    var data = {};
    formData.forEach(function(value, key) {
        data[key] = value;
        console.log(data)
    });

    // Извлекаем CSRF токен из скрытого поля формы
    var csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

    // Отправляем данные на сервер
    fetch('/api/tasks/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Здесь можно добавить логику для обработки успешного ответа
    })
    .catch((error) => {
        console.error('Error:', error);
        // Здесь можно добавить логику для обработки ошибок
    });
});

