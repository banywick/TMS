function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}



document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/tasks/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const tasksInProgress = data.filter(task => task.status === 'в процессе');
            const otherTasks = data.filter(task => task.status !== 'в процессе');

            // Сортируем задачи в процессе по приоритету
            tasksInProgress.sort((a, b) => {
                const priorityOrder = { 'высокий': 1, 'средний': 2, 'низкий': 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });

            // Обрабатываем задачи в процессе
            tasksInProgress.forEach(task => {
                const columnId = 'edited-tasks';
                const column = document.getElementById(columnId);

                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h4>${task.title}</h4>
                    <p hidden>${task.id}</p>
                    <p><strong>Описание:</strong> ${task.description}</p>
                    <p><strong>Статус:</strong> ${task.status}</p>
                    <p><strong>Приоритет:</strong> ${task.priority}</p>
                    <p><strong>Исполнитель:</strong> ${task.user.username}</p>
                    <p id='user_id' hidden>${task.user.id}</p>
                    <p><strong>Создана:</strong> ${new Date(task.date_create).toLocaleString()}</p>
                    <div onclick="fetchTaskDetailsAndOpenPopup(${task.id})">
                        <p class='task_btn'>Редактировать</p>
                    </div>
                    <p class="delete-button" onclick="deleteTask(${task.id})">Удалить</p>`;
                column.appendChild(card);
            });

            // Обрабатываем остальные задачи
            otherTasks.forEach(task => {
                let columnId;
                if (task.priority === 'низкий') {
                    columnId = 'low-priority';
                } else if (task.priority === 'средний') {
                    columnId = 'medium-priority';
                } else if (task.priority === 'высокий') {
                    columnId = 'high-priority';
                }

                const column = document.getElementById(columnId);

                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h4>${task.title}</h4>
                    <p hidden>${task.id}</p>
                    <p><strong>Описание:</strong> ${task.description}</p>
                    <p><strong>Статус:</strong> ${task.status}</p>
                    <p><strong>Приоритет:</strong> ${task.priority}</p>
                    <p><strong>Исполнитель:</strong> ${task.user.username}</p>
                    <p id='user_id' hidden>${task.user.id}</p>
                    <p><strong>Создана:</strong> ${new Date(task.date_create).toLocaleString()}</p>
                    <div onclick="fetchTaskDetailsAndOpenPopup(${task.id})">
                        <p class='task_btn'>Редактировать</p>
                    </div>
                    <p class="delete-button" onclick="deleteTask(${task.id})">Удалить</p>`;
                column.appendChild(card);
            });
        })
        .catch(error => console.error('Error:', error));
});




function deleteTask(taskId) {
    // Логика удаления задачи
    const csrfToken = getCookie('csrftoken');
    console.log('Delete task with ID:', taskId);
    console.log('Delete task with ID:', taskId);
    fetch(`/api/tasks/${taskId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
    })
    .then(response => {
        if (response.ok) {
            fetch('/api/tasks/')
                .then(response => response.json())
                .then(data => {
                    window.location.reload();
                })
                .catch(error => console.error('Error:', error));
        }
    })
    .catch(error => console.error('Error:', error));
}


function fetchTaskDetailsAndOpenPopup(taskId) {
    fetch(`/api/tasks/${taskId}/get_task_with_users/`)
        .then(response => response.json())
        .then(data => {
            // Проверяем, что данные соответствуют ожидаемой структуре
            if (data && data.task && data.users) {
                const task = data.task;
                const users = data.users;

                // Вставляем данные в форму редактирования
                document.getElementById('task-id').value = task.id;
                document.getElementById('task-title').value = task.title;
                document.getElementById('task-description').value = task.description;

                // Добавляем значения для статуса
                const statusSelect = document.getElementById('task-status');
                statusSelect.innerHTML = '';
                const statusOptions = ['новая', 'в процессе', 'завершена'];
                statusOptions.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option;
                    opt.text = option;
                    statusSelect.appendChild(opt);
                });
                statusSelect.value = task.status;

                // Добавляем значения для приоритета
                const prioritySelect = document.getElementById('task-priority');
                prioritySelect.innerHTML = '';
                const priorityOptions = ['низкий', 'средний', 'высокий'];
                priorityOptions.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option;
                    opt.text = option;
                    prioritySelect.appendChild(opt);
                });
                prioritySelect.value = task.priority;

                // Очищаем текущий список пользователей
                const userSelect = document.getElementById('task-user');
                userSelect.innerHTML = '';

                // Добавляем пользователей в список
                users.forEach(user => {
                    const option = document.createElement('option');
                    option.value = user.id;
                    option.text = user.username;
                    userSelect.appendChild(option);
                });

                // Устанавливаем текущего исполнителя
                userSelect.value = task.user;

                // Открываем popup окно (логика открытия popup окна уже реализована в другом месте)
                openPopup('edit_form');
            } else {
                console.error('Invalid task data structure:', data);
            }
        })
        .catch(error => console.error('Error:', error));
}

function submitEditForm() {
    const form = document.getElementById('task-form');
    const formData = new FormData(form);
    const taskId = document.getElementById('task-id').value; // Извлекаем id задачи из скрытого поля
    const userId = document.getElementById('user_id').value; // Извлекаем id пользователя из скрытого поля
    const csrfToken = getCookie('csrftoken');
    

    // Добавляем user_id в FormData
    formData.append('user', userId);

    fetch(`/api/tasks/${taskId}/`, {
        method: 'PUT',
        headers: {
            'X-CSRFToken': csrfToken
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        closePopup();
        // Обновите карточки задач, если необходимо
        fetch('/api/tasks/')
            .then(response => response.json())
            .then(data => {
                // Обновление DOM с новыми данными задач
                window.location.reload();
            })
            .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));
}


