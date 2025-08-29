# crm/management/commands/createinitialsuperuser.py
from django.core.management.base import BaseCommand
from crm.models import User
from django.conf import settings

class Command(BaseCommand):
    help = 'Create initial superuser if not exists'

    def handle(self, *args, **kwargs):
        if not User.objects.filter(email=settings.DJANGO_SUPERUSER_EMAIL).exists():
            User.objects.create_superuser(
                email=settings.DJANGO_SUPERUSER_EMAIL,
                name=settings.DJANGO_SUPERUSER_NAME,
                password=settings.DJANGO_SUPERUSER_PASSWORD
            )
            self.stdout.write(self.style.SUCCESS('Superuser created'))
        else:
            self.stdout.write(self.style.WARNING('Superuser already exists'))
