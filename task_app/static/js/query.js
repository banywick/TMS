document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');

    // Пример логики для переключения кнопок входа/выхода
    loginBtn.addEventListener('click', function() {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    });

    logoutBtn.addEventListener('click', function() {
        logoutBtn.style.display = 'none';
        loginBtn.style.display = 'inline-block';
    });

    // Пример рендеринга карточек задач
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
});
