# Generated by Django 4.2 on 2024-06-24 18:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0003_game_genre'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='game',
            name='is_available',
        ),
    ]
