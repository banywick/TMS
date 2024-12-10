#!/bin/bash

echo "Waiting for database to be ready..."
while ! nc -z db-postgres 5432; do
  sleep 0.1
done
echo "Database is up."

echo "Applying database migrations..."
python manage.py migrate

echo "Checking for superuser..."
python manage.py shell <<EOF
from django.contrib.auth.models import User
import os

username = os.getenv("DJANGO_SUPERUSER_USERNAME")
password = os.getenv("DJANGO_SUPERUSER_PASSWORD")
email = os.getenv("DJANGO_SUPERUSER_EMAIL")

if username and password and email:
    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username=username, password=password, email=email)
        print(f"Superuser {username} created.")
    else:
        print(f"Superuser {username} already exists.")
else:
    print("Environment variables for superuser creation are missing.")
EOF

echo "Starting Django server..."
python manage.py runserver 0.0.0.0:8000
