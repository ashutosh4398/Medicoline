# Generated by Django 3.1.2 on 2020-10-20 20:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_groups_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='groups',
            name='slug',
            field=models.SlugField(default='', max_length=100),
        ),
    ]
