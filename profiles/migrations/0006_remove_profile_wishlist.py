# Generated by Django 4.2 on 2024-06-24 18:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0005_remove_profile_favorite_renters_profile_wishlist'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='wishlist',
        ),
    ]
