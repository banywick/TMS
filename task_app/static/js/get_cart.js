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
            console.log(data)
            data.forEach(task => {
                let columnId;
                if (task.status === 'в процессе') {
                    columnId = 'edited-tasks';
                } else if (task.priority === 'низкий') {
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
                        <p hidden >${task.id}</p>
                        <p><strong>Описание:</strong> ${task.description}</p>
                        <p><strong>Статус:</strong> ${task.status}</p>
                        <p><strong>Приоритет:</strong> ${task.priority}</p>
                        <p><strong>Исполнитель:</strong> ${task.user}</p>
                        <p><strong>Создана:</strong> ${new Date(task.date_create).toLocaleString()}</p>
                        <div  onclick="openPopup('edit_form', ${task.id})">
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

// function openPopup(taskId) {
//     console.log(taskId, '555555555')
//     document.getElementById('edit-form-overlay').style.display = 'block';
//     document.getElementById('edit-form').style.display = 'block';

//     fetch(`/api/tasks/${taskId}/`)
//         .then(response => response.json())
//         .then(task => {
//             console.log(task, 'tyt')
//             document.getElementById('task-id').value = task.id;
//             document.getElementById('task-title').value = task.title;
//             document.getElementById('task-description').value = task.description;
//             document.getElementById('task-status').value = task.status;
//             document.getElementById('task-priority').value = task.priority;
//             document.getElementById('task-user').value = task.user;
//         })
        
//         .catch(error => console.error('Ошибка:', error));
// }

// function closePopup() {
//     document.getElementById('edit-form-overlay').style.display = 'none';
//     document.getElementById('edit-form').style.display = 'none';
// }

// function submitEditForm() {
//     const taskId = document.getElementById('task-id').value;
//     const title = document.getElementById('task-title').value;
//     const description = document.getElementById('task-description').value;
//     const status = document.getElementById('task-status').value;
//     const priority = document.getElementById('task-priority').value;
//     const user = document.getElementById('task-user').value;

//     const csrfToken = getCookie('csrftoken');

//     fetch(`/api/tasks/${taskId}/`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': csrfToken
//         },
//         body: JSON.stringify({
//             title: title,
//             description: description,
//             status: status,
//             priority: priority,
//             user: user
//         })
//     })
//     .then(response => {
//         if (response.ok) {
//             closePopup();
//             fetch('/api/tasks/')
//                 .then(response => response.json())
//                 .then(data => {
//                     window.location.reload();
//                 })
//                 .catch(error => console.error('Ошибка:', error));
//         }
//     })
//     .catch(error => console.error('Ошибка:', error));
// }