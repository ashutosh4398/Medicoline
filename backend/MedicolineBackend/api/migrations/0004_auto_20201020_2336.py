# Generated by Django 3.1.2 on 2020-10-20 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20201020_2050'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='groups',
            field=models.ManyToManyField(to='api.Groups'),
        ),
    ]
