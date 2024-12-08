#!/bin/bash

echo "Waiting for database to be ready..."
while ! nc -z db-postgres 5432; do
  sleep 0.1
done
echo "Database is up."

echo "Applying database migrations..."
python manage.py makemigrations
python manage.py migrate

echo "Create superuser..."
python manage.py createsuperuser --noinput



echo "Starting Django server..."
python manage.py runserver 0.0.0.0:8000
