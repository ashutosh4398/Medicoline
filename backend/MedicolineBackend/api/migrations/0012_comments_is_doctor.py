# Generated by Django 3.1.2 on 2020-10-24 07:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_notifications_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='comments',
            name='is_doctor',
            field=models.BooleanField(default=False),
        ),
    ]
