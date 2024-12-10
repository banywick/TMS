function renderTask(columnId, taskContent) {
    const column = document.getElementById(columnId);
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.innerHTML = taskContent;
    column.appendChild(taskCard);
}

// Пример добавления задачи
renderTask('low-priority', '<p>Задача с низким приоритетом</p>');
renderTask('medium-priority', '<p>Задача со средним приоритетом</p>');
renderTask('high-priority', '<p>Задача с высоким приоритетом</p>');

