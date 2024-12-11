document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/tasks/')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.forEach(task => {
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
                        <p><strong>Description:</strong> ${task.description}</p>
                        <p><strong>Status:</strong> ${task.status}</p>
                        <p><strong>Priority:</strong> ${task.priority}</p>
                        <p><strong>User ID:</strong> ${task.user}</p>
                        <p><strong>Created At:</strong> ${new Date(task.date_create).toLocaleString()}</p>
                        <div  onclick="openPopup('input_data_form')">
                            <button class='task_btn'>Редактировать</button>
                        </div>
                        <button class="delete-button" onclick="deleteTask(${task.id})">Удалить</button>
                `;
                column.appendChild(card);
            });
        })
        .catch(error => console.error('Error:', error));
});

// function editTask(taskId) {
//     // Логика редактирования задачи
//     console.log('Edit task with ID:', taskId);
// }

// function deleteTask(taskId) {
//     // Логика удаления задачи
//     console.log('Delete task with ID:', taskId);
// }

function deleteTask(taskId) {
    // Логика удаления задачи
    console.log('Delete task with ID:', taskId);
    fetch(`/api/tasks/${taskId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Обновите отображение задач
            fetch('/api/tasks/')
                .then(response => response.json())
                .then(data => {
                    // Очистите все колонки перед повторным рендерингом
                    document.getElementById('low-priority').innerHTML = '<h3>Низкий приоритет</h3>';
                    document.getElementById('medium-priority').innerHTML = '<h3>Средний приоритет</h3>';
                    document.getElementById('high-priority').innerHTML = '<h3>Высокий приоритет</h3>';
                    document.getElementById('edited-tasks').innerHTML = '<h3>Отредактированные задачи</h3>';
                    renderTasks(data);
                })
                .catch(error => console.error('Error:', error));
        }
    })
    .catch(error => console.error('Error:', error));
}