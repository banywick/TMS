FROM python:3.12-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Установка зависимостей системы
RUN apt-get update && apt-get install -y netcat-openbsd \
    && apt-get clean

# Копирование requirements.txt и установка зависимостей
COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Копирование остальных файлов проекта
COPY . .

# Установка прав на выполнение для docker-entrypoint.sh
RUN sed -i 's/\r$//' /app/docker-entrypoint.sh \
    && chmod +x /app/docker-entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
