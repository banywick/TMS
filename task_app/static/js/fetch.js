document.getElementById('inputDataForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    // Получаем данные формы
    var formData = new FormData(this);
    var data = {};
    formData.forEach(function(value, key) {
        data[key] = value;
    });

    // Извлекаем CSRF токен из скрытого поля формы
    var csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

    // Преобразуем данные в нужный формат
    var taskData = {
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        user: data.user_id, // Передаем id пользователя из скрытого поля
    };
    console.log(taskData);

    // Отправляем данные на сервер
    fetch('/api/tasks/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Сбрасываем форму после успешной отправки
        document.getElementById('inputDataForm').reset();
        document.querySelector('.input_data_form').style.display = 'none';
        document.querySelector('.overlay').style.display = 'none';
        // window.location.reload();
    })
    .catch((error) => {
        console.error('Error:', error);
        // Здесь можно добавить логику для обработки ошибок
    });
});
