# Система управления задачами (Task Management System)

## Быстрый старт

1. Чтобы настроить проект, пожалуйста, создайте на Вашем компьютере новую директорию **TMS** и клонируйте проект из git-репозитория, используя команду:

```console
$ git clone https://github.com/banywick/TMS.git .
```

2. Далее откройте проект в Вашем IDE (PyCharm или VSCode).

3. Добавьте в корень проекта **.env** файл, который был отправлен вместе со ссылкой на проект.

4. Создайте виртуальное окружение **venv** и установите зависимости, используя команду:

```console
$ pip install -r requirements.txt
```

5. Потом запустите в консоли Вашего IDE следующую команду, чтобы инициализировать контейнеры с приложением и базой данных:

```console
$ docker compose up -d --build
```

6. Проект готов к использованию.
Для проверки эндпоинтов REST API перейдите по ссылке: http://localhost:8000/doc

7. Для работы через UI и создания нового пользователя перейдите по ссылке: http://localhost:8000/signup

8. Для доступа к администативной странице испрользуйте http://localhost:8000/admin
login:admin
password:admin 

9. Текст письма с ссылкой для сброса пароля будет отображаться в консоли. Перейдите по ссылке и измените пароль