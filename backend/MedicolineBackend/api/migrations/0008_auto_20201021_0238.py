# Generated by Django 3.1.2 on 2020-10-20 21:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20201021_0210'),
    ]

    operations = [
        migrations.AlterField(
            model_name='groups',
            name='slug',
            field=models.SlugField(blank=True, default='', max_length=100),
        ),
    ]
